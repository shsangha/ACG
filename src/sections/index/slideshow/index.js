/* eslint-disable import/extensions */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react"
import "./style.scss"
import { TimelineMax, Power2, TweenLite } from "gsap"
import ScrollMagic from "scrollmagic"
import { Transition } from "react-transition-group"
import { Link } from "gatsby"
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addindicators"
import img from "../../../../static/img/bg.jpg"
import { throttle } from "lodash"

import Slide from "./slide"

import house from "../../../../static/img/house.jpg"

const Slider = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4])

  useEffect(() => {
    const tl = new TimelineMax({
      onUpdate: () => {
        tl.progress()
      },
    })
      .to(".slider_text", 0.8, { opacity: 0 })
      .to(
        `.img`,
        10,
        {
          x: "15%",
          scale: "-=0.2",
          rotationX: "-2deg",
          opacity: 0,
          ease: Power2.easeOut,
        },
        "-=0.8"
      )

    const controller = new ScrollMagic.Controller({
      container: ".container",
    })

    new ScrollMagic.Scene({
      triggerElement: ".header",
      triggerHook: "onLeave",
      offset: 30,
      duration: "60%",
    })
      .setClassToggle(`.paralax_content`, `scrolling`)
      .setTween(tl)
      // .addIndicators()
      .addTo(controller)
  }, [])

  useEffect(() => {
    new TimelineMax()
      .set(".container", { overflowY: "hidden" })
      .to(".slider_cover", 1.5, {
        x: "-100%",
        ease: Power2.easeIn,
      })
      .set(".container", { overflowY: "scroll" })
  }, [])

  const nextSlide = throttle(() => {
    setOrder(prevState => {
      const copy = [...prevState]

      const firstElement = copy.shift()

      return [...copy, firstElement]
    })
  }, 500)

  const prevSlide = throttle(() => {
    setOrder(prevState => {
      const copy = [...prevState]

      const firstElement = copy.pop()

      return [firstElement, ...copy]
    })
  }, 500)

  return (
    <div className="slider_wrapper">
      <div id="slider" className="slider">
        {order.map((current, idx) => {
          return (
            <Slide
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              index={idx}
              current={current}
              key={current}
            >
              <div className="slide">
                <div className="paralax_content">
                  <div className="img">
                    <img
                      src={house}
                      className={`img_content ${idx === 2 ? "selected" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </Slide>
          )
        })}
      </div>
      <div className="slider_text">
        <Link className="more slider_link" key={order[2]} to="">
          More
        </Link>

        <Link className="slider_link" to="/listings">
          View All Listings
        </Link>
      </div>
      <div className="slider_cover" />
    </div>
  )
}

export default Slider
