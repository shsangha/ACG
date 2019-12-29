import React from "react"
import { graphql } from "gatsby"
import Header from "../../components/header"
import "./style.scss"
import Carousel from "@brainhubeu/react-carousel"
import Img from "gatsby-image/withIEPolyfill"
import "@brainhubeu/react-carousel/lib/style.css"

const Listing = props => {
  const { frontmatter } = props.data.listings.edges[0].node

  return (
    <>
      <Header />
      <div className="listing_page">
        <div className="listing_page_listing">
          <div className="listing_hero_element">
            <h3 className="listing_page_type">For Lease</h3>

            <div className="listing_carousel_wrapper">
              <Carousel
                centered
                arrowLeft={
                  <svg
                    className="listing_page_arrow"
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
                }
                arrowRight={
                  <svg
                    className="listing_page_arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30.22 30.28"
                  >
                    <polyline
                      className="arrow_path "
                      points="0.07 0.14 30.07 14.74 30.07 15.54 0.07 30.14"
                      fill="none"
                      stroke="#231f20"
                      strokeMiterlimit="10"
                      strokeWidth="1"
                    />
                  </svg>
                }
                addArrowClickHandler
                draggable={false}
                className="listing_page_slider"
              >
                {frontmatter.Images.map(image => (
                  <div
                    key={image.childImageSharp.fluid.src}
                    style={{ width: "95%" }}
                  >
                    <Img
                      style={{}}
                      className="listing_page_slide"
                      fluid={image.childImageSharp.fluid}
                      objectFit="contain"
                      objectPosition="50% 50%"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listing

export const query = graphql`
  query Pages($id: String!) {
    listings: allMarkdownRemark(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          frontmatter {
            title
            Description
            PropertyType
            ListingType
            Price
            Loacation
            Map
            Size
            Header
            Brochure {
              relativePath
            }
            Images {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            Specs {
              Key
              Value
            }
            Areas {
              Area
              Size
            }
            Highlights {
              Description
            }
          }
        }
      }
    }
  }
`

/*
 {frontmatter.Images && frontmatter.Images.length > 0
                ? frontmatter.Images.map(image => (
                    <div
                      key={image.childImageSharp.fluid.src}
                      style={{
                        width: "100%",
                        maxHeight: "70vw",
                        height: "70rem",
                      }}
                    >
                      <Img
                        className="listing_page_slide"
                        fluid={image.childImageSharp.fluid}
                        objectFit="contain"
                        objectPosition="50% 50%"
                      />
                    </div>
                  ))
                : null}
*/
