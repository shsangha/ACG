import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { TimelineLite } from "gsap"
import { throttle } from "lodash"
import { Transition } from "react-transition-group"

const Listings = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({})
  const [sortValues, setSortValues] = useState({})

  const filtersRef = useRef(null)

  const toggleFilters = () => {
    setFiltersOpen(prev => !prev)
  }

  const handleResize = throttle(() => {
    if (window.innerWidth > 700) {
      setFiltersOpen(true)
    }
  }, 300)

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="listings_page">
      <div className="listings_menuBar">
        <div className="listings_filters">
          <button
            className={`listings_filter_toggle  ${
              filtersOpen ? "btnopen" : ""
            }`}
            onClick={toggleFilters}
          >
            Filters
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
                    <label htmlFor="listingType">Listing Type</label>
                    <select id="listingType">
                      <option value="volvo">Sale</option>
                      <option value="saab">Lease</option>
                    </select>
                  </li>
                  <li className={`listings_filter_entry ${state}`}>
                    <label htmlFor="propertyType">Property Type</label>
                    <select id="propertyType">
                      <option value="commercial">Commercial</option>
                      <option value="retail">Retail</option>
                      <option value="office">Office</option>
                      <option value="industrial">Industrial</option>
                      <option value="hotel">Hotel/Motel</option>
                      {/*make these dynamic based on whats in the cms*/}
                    </select>
                  </li>
                </ul>
              )}
            </Transition>
          </div>
          <div className="listings_sort">
            <span>Sort:</span>
            <button className="listings_sort_btn">Date &#9650;</button>
          </div>
        </div>
      </div>
      {filtersOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={() => setFiltersOpen(false)}
          className="overlay_close_filters"
        />
      )}

      <section className="listings_cards_wrapper">
        {[1, 2, 3, 4].map(() => (
          <div className="listings_card">
            <h3 className="listings_card_listing_type">Type</h3>
            <img
              className="listing_card_img"
              src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            />
            <div className="listings_card_content">
              <h2 className="listings_card_title">Title</h2>
              <span className="listings_card_address">location</span>
              <p className="listings_card_desc">desc</p>
              <span className="listings_card_price">price</span>
              <span className="listing_card_property_type">Category</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Listings
