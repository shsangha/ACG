import React, { Component, createRef, cloneElement } from "react"
import { TweenLite, TimelineLite, Power0 } from "gsap"

class Slide extends Component {
  slideRef = createRef()

  getSnapshotBeforeUpdate() {
    return this.slideRef.current.getBoundingClientRect()
  }

  componentDidUpdate(prevProps, _, snapshot) {
    if (prevProps.index !== this.props.index) {
      if (prevProps.index === 0 && this.props.index === 4) return
      if (prevProps.index === 4 && this.props.index === 0) return

      const newPos = this.slideRef.current.getBoundingClientRect()

      const x = snapshot.left - newPos.left
      const y = snapshot.top - newPos.top

      TweenLite.killTweensOf(this.slideRef.current)

      new TimelineLite()
        .fromTo(
          this.slideRef.current.firstChild,
          0.4,
          {
            x,
            y,
          },
          {
            x: 0,
            y: 0,

            ease: Power0.easeOut,
          }
        )
        .set(this.slideRef.current.firstChild, { clearProps: "transform" })
    }
  }

  handleClick = () => {
    const container = document.getElementById("container")

    if (container && container.scrollTop === 0) {
      const { index } = this.props

      if (index === 1) {
        this.props.prevSlide()
      }
      if (index === 3) {
        this.props.nextSlide()
      }
    }
  }

  handleKeyDown = e => {
    const container = document.getElementById("container")

    if (container && container.scrollTop === 0) {
      const { key } = e

      if (key === "ArrowRight") {
        this.props.nextSlide()
      }
      if (key === "ArrowLeft") {
        this.props.prevSlide()
      }
    }
  }

  render() {
    return React.Children.map(this.props.children, child =>
      cloneElement(child, {
        ref: this.slideRef,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        tabIndex: 0,
        // eslint-disable-next-line no-useless-computed-key
        ["aria-label"]: "use arrows to navigate slides",
      })
    )
  }
}

export default Slide
