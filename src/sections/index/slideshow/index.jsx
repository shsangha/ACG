/* eslint-disable import/extensions */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import "./style.scss"
import { TimelineMax, Power2 } from "gsap"
import ScrollMagic from "scrollmagic"
import "animation.gsap"
import "debug.addIndicators"
import { throttle } from "lodash"

import Slide from "./slide"

const Slider = ({ allMarkdownRemark }) => {
  const [order, setOrder] = useState(
    (() => {
      const filteredProps = allMarkdownRemark.nodes
        .filter(node => node.frontmatter.Images !== null)
        .filter((_, index) => index < 2)

      if (filteredProps.length < 5) {
        const appendedProps = filteredProps

        for (let i = 0; i <= 5 - filteredProps.length + 1; i++) {
          appendedProps.push(
            {
              ...filteredProps[i],
              id: `${filteredProps[i].id}${i}infiniteWrapper`,
              wrapping: filteredProps[i].id,
            } || {
              ...filteredProps[0],
              id: `${filteredProps[0].id}${i}infiniteWrapper`,
              wrapping: filteredProps[0].id,
            }
          )
        }
        return appendedProps
      }

      return filteredProps
    })()
  )

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
            z: 0,
          },
          "-=0.8"
        )

      const controller = new ScrollMagic.Controller({
        container: ".container",
      })

      new ScrollMagic.Scene({
        triggerHook: "onLeave",
        offset: 30,
        duration: "100%",
      })
        .setClassToggle(`.paralax_content`, `scrolling`)
        .setTween(tl)
        .addTo(controller)
    }
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
        {[0, 1, 2, 3, 4].map((_, idx) => {
          return (
            <Slide
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              index={idx}
              key={order[idx].id}
            >
              <div
                to={`listings/${
                  order[idx].wrapping ? order[idx].wrapping : order[idx].id
                }`}
                className="slide"
              >
                <div className="paralax_content">
                  <div className="img">
                    {(() => {
                      const SliderImg = () => (
                        <Img
                          style={{
                            width: "100%",
                            position: "relative",
                          }}
                          fluid={
                            order[idx].frontmatter.Images[0].childImageSharp
                              .fluid
                          }
                          className={`img_content ${
                            idx === 2 ? "selected" : ""
                          }`}
                        />
                      )

                      return idx === 2 ? (
                        <Link
                          to={`/listings/${
                            order[idx].wrapping
                              ? order[idx].wrapping
                              : order[idx].id
                          }`}
                        >
                          <SliderImg />
                        </Link>
                      ) : (
                        <SliderImg />
                      )
                    })()}
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
        <Link
          className="more slider_link hightlight_hover"
          key={order[2]}
          to={`/listings/${
            order[2].wrapping ? order[2].wrapping : order[2].id
          }`}
        >
          {order[2].frontmatter.title}
        </Link>

        <Link className="slider_link hightlight_hover" to="/listings">
          View All Listings
        </Link>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { Type: { eq: "listing" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          nodes {
            id
            frontmatter {
              date
              title
              PropertyType
              ListingType
              Brochure {
                relativePath
              }
              Loacation
              Map
              Size
              Price
              Header
              Description
              Highlights {
                Description
              }
              Specs {
                Key
                Value
              }
              Areas {
                Area
                Size
              }
              Images {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
  >
    {data => <Slider {...props} {...data} />}
  </StaticQuery>
)
