import React, { useEffect } from "react"
import { TimelineMax, TweenLite, Power1 } from "gsap"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import DrawSVG from "../../../utils/DrawSVGPlugin"

import "./style.scss"

const About = ({ location }) => {
  useEffect(() => {
    TweenLite.set(".reveal_svg_path", {
      drawSVG: false,
    })

    const options = {
      threshold: 0.8,
    }

    const observer = new IntersectionObserver((element) => {
      if (element[0].isIntersecting) {
        if (DrawSVG && typeof window !== undefined) {
          const tl = new TimelineMax()

          const aboutPage = location.pathname && location.pathname === "/about"
          const internalNav = location.state && location.state.internalNav

          const delay = aboutPage ? (internalNav ? 0.95 : 1.3) : 0

          tl.staggerFromTo(
            `.reveal_svg_path`,
            1,
            {
              cycle: {
                drawSVG: ["100% 100%", "0% 0%"],
              },
            },
            {
              cycle: {
                drawSVG: ["100% 0%", "0% 100%"],
                ease: Power1.easeIn,
              },
            },
            0.2,
            `+=${delay}`
          )
        }
        observer.unobserve(element[0].target)
      }
    }, options)

    observer.observe(document.querySelector(".reveal_svg"))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          if (element.isIntersecting) {
            element.target.classList.add("intersected")

            observer.unobserve(element.target)
          }
        })
      },
      { threshold: 0.8 }
    )

    document.querySelectorAll(".about_animate_in").forEach((item) => {
      observer.observe(item)
    })
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query {
          about: allMarkdownRemark(
            filter: { frontmatter: { Type: { eq: "about" } } }
          ) {
            nodes {
              frontmatter {
                title
                Description
              }
            }
          }

          paul: allMarkdownRemark(
            filter: { frontmatter: { title: { eq: "Paul Gill" } } }
          ) {
            nodes {
              frontmatter {
                title
                Description
                Image {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                Email
                Phone
              }
            }
          }

          gurjant: allMarkdownRemark(
            filter: { frontmatter: { title: { eq: "Gurjant Gill" } } }
          ) {
            nodes {
              frontmatter {
                title
                Description
                Image {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                Email
                Phone
              }
            }
          }
        }
      `}
    >
      {(data) => {
        const { title, Description } = data.about.nodes[0].frontmatter

        const { paul, gurjant } = data

        const team = [gurjant.nodes[0], paul.nodes[0]]

        return (
          <div className="about_page">
            <div className="about_header_container space-md">
              <div className="about_header_text ">
                <h1 className="about_header_main about_fade about_animate_in">
                  {title}
                </h1>
                <p className="about_desc about_fade about_animate_in">
                  {Description}
                </p>
              </div>
              <svg
                className="reveal_svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 201.24 100.9"
              >
                <path
                  className="reveal_svg_path"
                  d="M1,101a33.46,33.46,0,0,1,4.14-1.71c3-1.1,6.14-2.09,9.33-2.9a152.83,152.83,0,0,1,17.69-3.49q7.67-1,15.41-1.51c6.72-.43,13.44-.43,20.17-.28a51,51,0,0,1,5.38.25c.62.09.86-.07.85-.58,0-1.44,0-2.89,0-4.33V17.79c0-1.35,0-2.69,0-4,0-.56.25-.86.84-1.13Q87,7,99.21,1.39a3.1,3.1,0,0,1,3,0c6.5,3.07,13.06,6.05,19.6,9.06,1.56.72,3.1,1.46,4.69,2.14.66.28,1,.63.88,1.22a3.22,3.22,0,0,0,0,.62V89.77c0,1.64-.15,1.55,1.86,1.46q8.61-.41,17.23-.19c5.09.12,10.16.45,15.22.95a172.1,172.1,0,0,1,19.28,3,106.79,106.79,0,0,1,14.3,4,23.6,23.6,0,0,1,4.73,2l-2-.62a146.21,146.21,0,0,0-23.79-5.44c-5.35-.79-10.74-1.32-16.15-1.72-8.86-.65-17.72-.65-26.59-.51-1.67,0-3.33.19-5,.29-.78,0-.9,0-1-.64,0-.31,0-.62,0-.93q0-38.13,0-76.26a1.82,1.82,0,0,0-1.33-1.86c-6-2.72-12-5.49-18-8.24-1.49-.69-3-1.34-4.45-2.07a2.34,2.34,0,0,0-2.24,0c-4.88,2.3-9.79,4.55-14.69,6.81-2.56,1.19-5.11,2.4-7.72,3.5A1.61,1.61,0,0,0,75.9,15q0,38.24,0,76.47c0,.31,0,.62,0,.93,0,.5-.3.65-.9.6-4.57-.35-9.15-.39-13.74-.4s-8.92,0-13.36.31A207.16,207.16,0,0,0,20.48,96Q14,97.28,7.66,99c-1.89.53-3.74,1.17-5.61,1.75A1.71,1.71,0,0,1,1,101Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
                <path
                  className="reveal_svg_path"
                  d="M56.45,18.63l-2,.9L38.57,26.81c-.3.14-.58.3-.88.43s-.57.38-.54.74,0,.68,0,1V87.2c0,.31,0,.62,0,.93.05.54-.3.73-.91.77s-.94,0-.89-.58c0-.31,0-.62,0-.93q0-29.82,0-59.64c0-.92.38-1.39,1.37-1.83,5.53-2.49,11-5,16.52-7.57,1.33-.61,2.69-1.2,4-1.83a1.17,1.17,0,0,1,1.16,0c3.86,1.86,7.73,3.69,11.59,5.54.64.31.59.37.13,1.09-.31.48-.63.44-1.11.21l-8.72-4.18A2.29,2.29,0,0,0,59,18.78c-.09,1.1-.23,2.18-.26,3.27-.14,4.15-.21,8.31-.37,12.47-.12,3.33-.34,6.66-.5,10a1.6,1.6,0,0,1-.41,1c0-1,0-2,0-3-.09-3.78-.15-7.56-.32-11.34-.19-4-.41-8-.48-12A.42.42,0,0,0,56.45,18.63Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
                <path
                  className="reveal_svg_path"
                  d="M144.85,18.66c-.22.18-.17.35-.17.52-.11,3.26-.2,6.53-.32,9.79-.16,4.26-.31,8.52-.54,12.78-.07,1.3-.16,2.6-.29,3.91-.18-2-.34-4-.38-6.07-.05-3.36-.1-6.74-.32-10.1-.14-2.2-.08-4.4-.24-6.59-.11-1.36-.14-2.73-.23-4.06a1.21,1.21,0,0,0-1,.21l-8.83,4.23c-.27.12-.55.47-.89.22a1.55,1.55,0,0,1-.7-1.07c0-.27.38-.34.63-.46l8.4-4c1-.47,2-.92,3-1.42a1.47,1.47,0,0,1,1.41,0q10.24,4.74,20.51,9.44a1.67,1.67,0,0,1,1.21,1.7q0,30,0,60.06v.31c0,.39.14.87-.72.82s-1-.17-1.08-.85c0-.42,0-.83,0-1.24V29c0-1.78.22-1.44-1.67-2.31q-8.44-3.91-16.94-7.8A2.07,2.07,0,0,0,144.85,18.66Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
                <path
                  className="reveal_svg_path"
                  d="M99.52,79.1a2.25,2.25,0,0,1-.07-1q0-22.18,0-44.38,0-13.26,0-26.53c0-.2,0-.41,0-.62,0-.65.38-.92,1.18-1a1.11,1.11,0,0,1,1.28.91,10.26,10.26,0,0,1,0,1.24V71.07q0,2,0,4A5.4,5.4,0,0,1,100,79a.68.68,0,0,1-.21.1A1.32,1.32,0,0,1,99.52,79.1Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
                <path
                  className="reveal_svg_path"
                  d="M177.09,41l-4.75,2.26c-.7.34-1.42.65-2.09,1a.73.73,0,0,1-1.11-.27c-.4-.56-.42-.73.16-1,.76-.39,1.55-.74,2.32-1.11,2-.95,4-1.89,6-2.86a1.85,1.85,0,0,1,1.77,0q7.56,3.52,15.17,7a1.6,1.6,0,0,1,1.18,1.61c0,15.38,0,30.76,0,46.14,0,.13,0,.27,0,.41,0,.37.1.79-.67.76s-1.09-.18-1.12-.82c0-.27,0-.55,0-.82V49a1.06,1.06,0,0,1,0-.31c.21-1-.37-1.48-1.39-1.93-3.93-1.76-7.81-3.58-11.72-5.38a1.62,1.62,0,0,0-1.06-.26c-.08.71-.2,1.45-.24,2.19-.13,2.78-.16,5.57-.38,8.34s-.08,5.3-.44,7.93c-.07.54-.2,1.08-.32,1.72a1.75,1.75,0,0,1-.14-1c.1-3.24-.18-6.47-.33-9.7-.13-3-.41-6-.47-9A.65.65,0,0,0,177.09,41Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
                <path
                  className="reveal_svg_path"
                  d="M24.06,41.13c-.48,6.62-.5,13.25-1.22,19.86a25,25,0,0,1-.27-3.33c-.06-2.85-.3-5.7-.38-8.55-.08-2.54-.29-5.08-.45-7.62a2.35,2.35,0,0,0-.12-.45,14.62,14.62,0,0,0-2.41,1c-3.47,1.57-6.9,3.2-10.38,4.75a1.83,1.83,0,0,0-1.34,1.86c0,14.86,0,29.71,0,44.57,0,.27,0,.55,0,.82,0,.68-.23.83-1.06.87-.47,0-.75-.07-.73-.49,0-.24,0-.48,0-.72q0-23,0-46c0-.88.36-1.34,1.29-1.76,5-2.25,10-4.55,15-6.86a2,2,0,0,1,1.89,0c2.67,1.3,5.36,2.58,8,3.87.77.37.8.48.4,1s-.48.64-1.28.27c-2.07-1-4.13-2-6.19-2.94A1,1,0,0,0,24.06,41.13Z"
                  transform="translate(-0.33 -0.77)"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="0.26"
                />
              </svg>
            </div>

            <h2 className="about_page_team_header space-md about_animate_in about_fade">
              Our Team
            </h2>

            {team.map(
              ({
                frontmatter: {
                  title: name,
                  Phone,
                  Email,
                  Description: about,
                  Image: {
                    childImageSharp: { fluid },
                  },
                },
              }) => (
                <div key={name} className="about_team_item space-md ">
                  <h3 className="about_team_item_header about_animate_in about_header_fade">
                    {name}
                  </h3>
                  <div className="about_team_item_img_wrapper  about_animate_in about_img_fade">
                    <Img className="about_team_item_img " fluid={fluid} />
                  </div>

                  <div className="about_desc_item_wrapper about_animate_in about_side_fade">
                    <p className="about_desc_item_text  ">{about}</p>
                    <a
                      className="about_desc_item_link hightlight_hover"
                      href={`mailto:${Email}`}
                    >
                      {Email}
                    </a>
                    <a
                      className="about_desc_item_link hightlight_hover"
                      href={`tel:${Phone}`}
                    >
                      {Phone}
                    </a>
                  </div>
                </div>
              )
            )}

            <h2 className="about_page_team_header about_lead about_animate_in about_header_fade">
              Get In Touch
            </h2>
          </div>
        )
      }}
    </StaticQuery>
  )
}

export default About
