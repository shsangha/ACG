/* eslint-disable import/extensions */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react"
import "./style.scss"
import { TimelineMax, Power2 } from "gsap"
import ScrollMagic from "scrollmagic"
import { Link } from "gatsby"
import "animation.gsap"
import "debug.addIndicators"
import { throttle } from "lodash"

import Slide from "./slide"

import house from "../../../../static/img/house.jpg"

const Slider = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4])

  useEffect(() => {
    if (typeof window !== undefined) {
      const tl = new TimelineMax({
        onUpdate: () => {
          tl.progress()
        },
      })
        .to([".slider_text", ".prev_slide_btn", ".next_slide_btn"], 0.8, {
          opacity: 0,
        })
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
        duration: "100%",
      })
        .setClassToggle(`.paralax_content`, `scrolling`)
        .setTween(tl)
        //  .addIndicators()
        .addTo(controller)
    }
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
      <button onClick={prevSlide} className="prev_slide_btn">
        <svg
          className="slide_btn_svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30.22 30.28"
        >
          <polyline
            className="arrow_path left"
            points="0.07 0.14 30.07 14.74 30.07 15.54 0.07 30.14"
            fill="none"
            stroke="#231f20"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </svg>
      </button>
      <button onClick={nextSlide} className="next_slide_btn">
        <svg
          className="slide_btn_svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30.22 30.28"
        >
          <polyline
            className="arrow_path right"
            points="0.07 0.14 30.07 14.74 30.07 15.54 0.07 30.14"
            fill="none"
            stroke="#231f20"
            strokeMiterlimit="10"
            strokeWidth="1"
          />
        </svg>
      </button>

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
