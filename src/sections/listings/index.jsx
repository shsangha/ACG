import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { TimelineLite } from "gsap"
import { throttle } from "lodash"
import { Transition } from "react-transition-group"

const Listings = props => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({
    property: "all",
    listing: "all",
    sortDesc: true,
    values: props.allMarkdownRemark.nodes,
  })

  const filtersRef = useRef(null)

  const toggleFilters = () => {
    setFiltersOpen(prev => !prev)
  }

  const handleResize = throttle(() => {
    if (window.innerWidth > 700) {
      setFiltersOpen(true)
    } else {
      setFiltersOpen(false)
    }
  }, 300)

  useEffect(() => {
    console.log(props)

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSelectChange = event => {
    const { name, value } = event.target

    setFilterValues(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleSortOrder = () => {
    setFilterValues(prev => ({ ...prev, sortDesc: !prev.sortDesc }))
  }

  return (
    <div className={`listings_page ${filtersOpen ? "filters_open" : ""}`}>
      <div className="listings_menuBar">
        <div className="listings_filters">
          <button
            className={`listings_filter_toggle  ${
              filtersOpen ? "btnopen" : ""
            }`}
            onClick={toggleFilters}
          >
            Filters{" "}
            <span
              className={`listing_filter_plus ${
                filtersOpen ? "filters_open" : ""
              }`}
            >
              {" "}
              &#x2B;
            </span>
          </button>
          <div ref={filtersRef} className="listings_filters_list">
            <Transition
              timeout={{
                enter: 0,
                exit: 500,
              }}
              in={filtersOpen}
              unmountOnExit
              mountOnEnter
            >
              {state => (
                <ul className={`list ${state}`}>
                  <li className={`listings_filter_entry ${state}`}>
                    <label
                      className="listings_filters_label"
                      htmlFor="listingType"
                    >
                      Listing Type
                    </label>
                    <select
                      onChange={handleSelectChange}
                      value={filterValues.lisitng}
                      name="listing"
                      className="listing_select"
                      id="listingType"
                    >
                      <option className="listing_option" value="all">
                        All
                      </option>
                      <option className="listing_option" value="sale">
                        Sale
                      </option>
                      <option className="listing_option" value="lease">
                        Lease
                      </option>
                    </select>
                  </li>
                  <li className={`listings_filter_entry ${state}`}>
                    <label
                      className="listings_filters_label"
                      htmlFor="propertyType"
                    >
                      Property Type
                    </label>
                    <select
                      name="property"
                      onChange={handleSelectChange}
                      value={filterValues.property}
                      className="listing_select"
                      id="propertyType"
                    >
                      <option className="listing_option" value="all">
                        All
                      </option>
                      <option className="listing_option" value="commercial">
                        Commercial
                      </option>
                      <option className="listing_option" value="retail">
                        Retail
                      </option>
                      <option className="listing_option" value="office">
                        Office
                      </option>
                      <option className="listing_option" value="industrial">
                        Industrial
                      </option>
                      <option className="listing_option" value="hotel">
                        Hotel/Motel
                      </option>
                    </select>
                  </li>
                </ul>
              )}
            </Transition>
          </div>
          <div className="listings_sort">
            <span className="listings_sort_text">Sort:</span>
            <button
              aria-label={`sort date ${
                filterValues.sortDesc ? "ascending" : "descending"
              }`}
              onClick={toggleSortOrder}
              className="listings_sort_btn"
            >
              Date{" "}
              <span
                className={`listing_arrow ${
                  filterValues.sortDesc ? "" : "asc"
                }`}
              >
                &#9660;
              </span>
            </button>
          </div>
        </div>
      </div>

      <Transition timeout={700} in={filtersOpen}>
        {status => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            onClick={() => setFiltersOpen(false)}
            className={`overlay_close_filters ${status}`}
          />
        )}
      </Transition>

      <section className="listings_cards_wrapper">
        {filterValues.values.map(
          ({
            id,
            frontmatter: {
              title,
              Description,
              Loacation,
              Images,
              PropertyType,
              ListingType,
            },
          }) => {
            return (
              <Link key={id} className="listings_card" to="/listings/fake">
                <h3 className="listings_card_listing_type">
                  For {ListingType}
                </h3>
                <Img
                  className="listing_card_img"
                  fluid={Images[0] ? Images[0].childImageSharp.fluid : null}
                />
                <div className="listings_card_content">
                  <h2 className="listings_card_title">{title}</h2>
                  {Loacation && (
                    <span className="listings_card_address">{Loacation}</span>
                  )}
                  {Description && (
                    <p className="listings_card_desc">{Description}</p>
                  )}
                  <span className="listing_card_property_type">
                    {PropertyType}
                  </span>
                </div>
              </Link>
            )
          }
        )}
      </section>
    </div>
  )
}
/* eslint-disable react/display-name */

export default props => (
  <StaticQuery
    query={graphql`
      {
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
              Loacation
              Description
              Images {
                childImageSharp {
                  fluid(maxWidth: 400) {
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
    {data => <Listings {...props} {...data} />}
  </StaticQuery>
)
