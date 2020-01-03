/* eslint-disable complexity */
import React, { Component, createRef } from "react"
import "./style.scss"
import { TweenLite } from "gsap"
import paper from "paper"
import SimplexNoise from "simplex-noise"

const lerp = (a, b, n) => {
  return (1 - n) * a + n * b
}

const map = (value, in_min, in_max, out_min, out_max) => {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

let cursorSpeed = 1
let prevX = 0
let prevY = 0
let overLink = false
let cursorVisble = false
let clientX = -10
let clientY = -10
const strokeColor = "rgba(186, 173, 137, 0.9)"

class Cursor extends Component {
  cursorRef = createRef()
  canvasRef = createRef()

  initCursor() {
    const innerCursor = this.cursorRef.current

    const unveilCursor = e => {
      this.group.position = new paper.Point(e.clientX, e.clientY)
      setTimeout(() => {
        cursorSpeed = 0.2
      }, 100)
      cursorVisble = true
    }

    document.addEventListener("mousemove", unveilCursor)

    document.addEventListener("mousemove", e => {
      clientX = e.clientX
      clientY = e.clientY
    })

    const render = () => {
      TweenLite.set(innerCursor, {
        x: clientX,
        y: clientY,
        opacity: overLink ? 0 : 1,
      })
      if (cursorVisble) {
        document.removeEventListener("mousemove", unveilCursor)
      }
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  initCanvas() {
    const canvas = this.canvasRef.current

    const shapeBounds = {
      width: 60,
      height: 60,
    }
    paper.setup(canvas)

    const noiseScale = 150
    const noiseRange = 4
    let isNoisy = false

    const polygon = new paper.Path.RegularPolygon({
      center: [0, 0],
      sides: 10,
      radius: 15,
      strokeWidth: 1,
      strokeColor,
    })

    this.group = new paper.Group([polygon])

    const noiseObjects = polygon.segments.map(() => new SimplexNoise())
    let bigCoordinates = []

    paper.view.onFrame = event => {
      if (!overLink) {
        prevX = lerp(prevX, clientX, cursorSpeed)
        prevY = lerp(prevY, clientY, cursorSpeed)
        this.group.position = new paper.Point(prevX, prevY)
      } else if (overLink) {
        prevX = lerp(prevX, this.stuckX, cursorSpeed)
        prevY = lerp(prevY, this.stuckY, cursorSpeed)
        this.group.position = new paper.Point(prevX, prevY)
      }

      if (overLink && polygon.bounds.width < shapeBounds.width) {
        polygon.scale(1.08)
      } else if (!overLink && polygon.bounds.width > 30) {
        if (isNoisy) {
          polygon.segments.forEach((segment, i) => {
            segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1])
          })
          isNoisy = false
          bigCoordinates = []
        }

        const scaleDown = 0.92
        polygon.scale(scaleDown)
      }

      if (overLink && polygon.bounds.width >= shapeBounds.width) {
        isNoisy = true

        if (bigCoordinates.length === 0) {
          polygon.segments.forEach((segment, i) => {
            bigCoordinates[i] = [segment.point.x, segment.point.y]
          })
        }

        polygon.segments.forEach((segment, i) => {
          const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0)
          const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1)

          const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange)
          const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange)

          const newX = bigCoordinates[i][0] + distortionX
          const newY = bigCoordinates[i][1] + distortionY

          segment.point.set(newX, newY)
        })
      }
      polygon.smooth()

      if (this.fillOuterCursor && polygon.fillColor !== strokeColor) {
        polygon.fillColor = strokeColor
        polygon.strokeColor = "transparent"
        TweenLite.set(this.cursorRef.current, { opacity: 0 })
      } else if (!this.fillOuterCursor && polygon.fillColor !== "transparent") {
        polygon.strokeColor = strokeColor
        polygon.fillColor = "transparent"
      }
    }
  }

  enterWrapLink = e => {
    const navItem = e.currentTarget
    const navItemBox = navItem.getBoundingClientRect()
    this.stuckX = Math.round(navItemBox.left + navItemBox.width / 2)
    this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2)
    overLink = true
  }

  leaveWrapLink = () => {
    overLink = false
  }

  enterFocusLink = () => {
    cursorSpeed = 0.8
    TweenLite.set(".cursor_outer", { opacity: 0 })
    TweenLite.set(".cursor_inner", { background: "#baad89" })
  }

  leaveFocusLink = () => {
    cursorSpeed = 0.2
    TweenLite.set(".cursor_outer", { opacity: 0.7 })
    TweenLite.set(".cursor_inner", { background: "white" })
  }

  componentDidMount() {
    this.initCursor()
    this.initCanvas()
  }
  componentWillUnmount() {}

  wrapLink = () => ({
    onMouseEnter: this.enterWrapLink,
    onMouseLeave: this.leaveWrapLink,
  })

  focusLink = () => ({
    onMouseEnter: this.enterFocusLink,
    onMouseLeave: this.leaveFocusLink,
  })

  render() {
    return (
      <>
        <div ref={this.cursorRef} className="cursor cursor_inner" />
        <canvas
          ref={this.canvasRef}
          resize="true"
          className="cursor cursor_outer"
        />
        {this.props.children({
          wrapLink: this.wrapLink,
          focusLink: this.focusLink,
        })}
      </>
    )
  }
}

export default Cursor
