import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import MobileChat from "../MobileChat"
import "./style.scss"
import Carousel from "@brainhubeu/react-carousel"
import Img from "gatsby-image/withIEPolyfill"
import "@brainhubeu/react-carousel/lib/style.css"
import Seo from "../../components/seo"

const Listing = ({ data }) => {
  const { frontmatter } = data.listings.edges[0].node

  const [carouselValue, setCarouselValue] = useState(0)

  const handleArrowLeft = () => {
    setCarouselValue(prev => {
      if (prev > 0) {
        return prev - 1
      }
      return 0
    })
  }

  const handleArrowRight = () => {
    setCarouselValue(prev => {
      if (prev < frontmatter.Images.length - 1) {
        return prev + 1
      }
      return frontmatter.Images.length - 1
    })
  }

  return (
    <>
      <Seo
        title={frontmatter.title}
        desc={frontmatter.Description}
        banner={
          frontmatter.Images && frontmatter.Images[0]
            ? frontmatter.Images[0].childImageSharp.fluid.src
            : null
        }
      />
      <div className="listing_page">
        <Link
          className="listing_page_back_link hightlight_hover"
          to="/listings"
        >
          Back to Listings
        </Link>

        <div className="listing_page_listing">
          <h3 className="listing_page_type">For Lease</h3>

          <div className="listing_hero_element">
            <div className="listing_carousel_wrapper">
              <Carousel
                value={carouselValue}
                centered
                draggable={false}
                className="listing_page_slider"
              >
                {frontmatter.Images ? (
                  frontmatter.Images.map(image => (
                    <div
                      key={image.childImageSharp.fluid.src}
                      style={{ width: "100%" }}
                    >
                      <Img
                        style={{}}
                        className="listing_page_slide"
                        fluid={image.childImageSharp.fluid}
                        objectFit="contain"
                        objectPosition="50% 50%"
                      />
                    </div>
                  ))
                ) : (
                  <div style={{ width: "100%" }}>
                    <Img
                      style={{}}
                      className="listing_page_slide"
                      fluid={data.fallbackImg.childImageSharp.fluid}
                      objectFit="contain"
                      objectPosition="50% 50%"
                    />
                  </div>
                )}
              </Carousel>
              {frontmatter.Images && (
                <>
                  <div className="carousel_dots_wrapper">
                    {frontmatter.Images.map((_, index) => (
                      <button
                        className={`carousel_dot ${
                          index === carouselValue ? "selected" : ""
                        }`}
                        key={index}
                        onClick={() => {
                          setCarouselValue(index)
                        }}
                      />
                    ))}
                  </div>
                  <button
                    className="carousel_button left"
                    onClick={handleArrowLeft}
                  >
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
                  </button>{" "}
                  <button
                    className="carousel_button right"
                    onClick={handleArrowRight}
                  >
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
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="listing_hero_header">
            <div className="listing_hero_content">
              <div className="listing_hero_description">
                {frontmatter.Loacation && (
                  <h5 className="listing_hero_address black">
                    {frontmatter.Loacation}
                  </h5>
                )}

                <h1 className="listing_hero_title black">
                  {frontmatter.title}
                </h1>
                <div className="listing_hero_summary">
                  <p className="listing_hero_summary_item black">
                    {frontmatter.PropertyType}
                  </p>
                  <p className="listing_hero_summary_item black">
                    {frontmatter.ListingType}
                  </p>
                  {frontmatter.Size && (
                    <p className="listing_hero_summary_item black">
                      {frontmatter.Size}
                    </p>
                  )}
                </div>
              </div>
              <div className="listing_hero_links">
                {frontmatter.Brochure && frontmatter.Brochure.relativePath && (
                  <a
                    download
                    href={`/img/${frontmatter.Brochure.relativePath}`}
                    className="listing_hero_download_link black"
                  >
                    Download PDF
                  </a>
                )}
                <MobileChat subject={frontmatter.title} />
              </div>
            </div>
          </div>
          <div className="listing_page_details">
            <div className="listing_page_details_lhs">
              <div className="listing_page_details_desc">
                {frontmatter.Description && (
                  <>
                    <h3 className="listing_page_details_desc_header">
                      {frontmatter.Header}
                    </h3>
                    <p className="listing_page_details_desc_text">
                      {frontmatter.Description}
                    </p>
                  </>
                )}
              </div>
              {frontmatter.Highlights && (
                <div className="listing_page_details_features_wrapper">
                  <h3 className="listing_page_details_features_header">
                    Features
                  </h3>
                  <ul className="listing_page_details_features_list">
                    {frontmatter.Highlights.map(({ Description }) => (
                      <li
                        key={Description}
                        className="listing_page_details_feature_list_item"
                      >
                        {Description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {frontmatter.Specs && (
                <div className="listing_page_details_specs_container">
                  <h3 className="listing_page_details_specs_header">Specs</h3>
                  <table className="listing_page_table table_full">
                    <tbody>
                      {frontmatter.Specs.map(({ Key, Value }) => {
                        return (
                          <tr key={Key} className="listing_page_table_row">
                            <th className="listing_page_table_head">{Key}</th>
                            <td className="listing_page_table_data">{Value}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {frontmatter.Areas && (
                <div className="listing_page_details_lease_container">
                  <h3 className="listing_page_details_lease_header">Areas</h3>

                  <table className="listing_page_table">
                    <tbody>
                      {frontmatter.Areas.map(({ Area, Size }) => (
                        <tr key={Area} className="listing_page_table_row">
                          <th className="listing_page_table_head">{Area}</th>
                          <td className="listing_page_table_data">{Size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {frontmatter.Map && (
                <div className="listing_page_details_map_container">
                  <h3 className="listing_page_details_map_header">Map</h3>

                  <div className="iframe_container">
                    <iframe
                      width="400"
                      height="450"
                      frameBorder="0"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      title="map"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE}&q=place_id:${frontmatter.Map}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listing

export const query = graphql`
  query Pages($id: String!, $target: String!) {
    fallbackImg: file(relativePath: { eq: "logo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    agent: allMarkdownRemark(
      filter: { frontmatter: { title: { eq: $target } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            Phone
            Email
            Image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

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
