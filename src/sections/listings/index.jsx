import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { StaticQuery, graphql } from "gatsby"
import Card from "./Card"
import { throttle } from "lodash"
import { Transition } from "react-transition-group"

const Listings = ({ allMarkdownRemark, fallbackImg }) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({
    property: "all",
    listing: "all",
    sortDesc: true,
    values: allMarkdownRemark.nodes,
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
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filter = (value, name) => {
    const propertyFilter =
      name && name === "property" ? value : filterValues.property
    const listingFilter =
      name && name === "listing" ? value : filterValues.listing

    const sortOrder = name ? filterValues.sortDesc : value

    const list = allMarkdownRemark.nodes
      .filter(({ frontmatter }) => {
        if (propertyFilter === "all") {
          return true
        }

        return frontmatter.PropertyType === propertyFilter
      })
      .filter(({ frontmatter }) => {
        if (listingFilter === "all") {
          return true
        }

        return frontmatter.ListingType === listingFilter
      })

    if (!sortOrder) {
      list.reverse()
    }

    return list
  }

  const handleSelectChange = event => {
    const { name, value } = event.target

    const values = filter(value, name)

    setFilterValues(prev => {
      return {
        ...prev,
        [name]: value,
        values,
      }
    })
  }

  const toggleSortOrder = () => {
    setFilterValues(prev => ({
      ...prev,
      sortDesc: !prev.sortDesc,
      values: filter(!prev.sortDesc),
    }))
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
            >
              {state => (
                <ul
                  className={`list ${state}  ${
                    filtersOpen ? "filters_open" : ""
                  }`}
                >
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
                      <option className="listing_option" value="retail">
                        Retail
                      </option>
                      <option className="listing_option" value="office">
                        Office
                      </option>
                      <option className="listing_option" value="industrial">
                        Industrial
                      </option>
                      <option className="listing_option" value="land">
                        Land
                      </option>
                      <option className="listing_option" value="business">
                        Business
                      </option>

                      {filterValues.listing === "sale" ||
                        (filterValues.listing === "all" && (
                          <>
                            <option
                              className="listing_option"
                              value="commercial"
                            >
                              Commercial
                            </option>
                            <option className="listing_option" value="hotel">
                              Hotel/Motel
                            </option>
                          </>
                        ))}
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
              Date
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
      <Transition unmountOnExit timeout={700} in={filtersOpen}>
        {status => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            onClick={() => setFiltersOpen(false)}
            className={`overlay_close_filters ${status}`}
          />
        )}
      </Transition>
      <div className="listings_cards_wrapper">
        {filterValues.values.length > 0 ? (
          filterValues.values.map(({ id, frontmatter }, index) => {
            return (
              <Card
                key={id}
                index={index}
                id={id}
                fallback={fallbackImg.childImageSharp.fluid}
                {...frontmatter}
              />
            )
          })
        ) : (
          <h3 className="no_results">No results. Try another query</h3>
        )}
      </div>
    </div>
  )
}
/* eslint-disable react/display-name */

export default props => (
  <StaticQuery
    query={graphql`
      {
        fallbackImg: file(relativePath: { eq: "logo.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 450) {
              ...GatsbyImageSharpFluid
            }
          }
        }

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
              Price
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
