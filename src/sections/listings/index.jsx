import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { TimelineLite } from "gsap"
import { Transition } from "react-transition-group"

const Listings = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({})
  const [sortValues, setSortValues] = useState({})

  const filtersRef = useRef(null)

  const closeFilters = event => {
    setFiltersOpen(open => {
      if (open) {
        if (filtersRef.current.contains(event.target)) {
          return true
        }
      }
      return false
    })
  }

  useEffect(() => {
    window.addEventListener("mousedown", closeFilters)
  }, [])

  const toggleFilters = () => {
    setFiltersOpen(prev => !prev)
  }

  return (
    <div className="listings_page">
      <div className="listings_menuBar">
        <div className="listings_filters">
          <button
            className={`${filtersOpen ? "btnopen" : ""}`}
            onClick={toggleFilters}
          >
            Filters
          </button>
          <div className="listing_filters_wrapper">
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
                    <li className={`listings_filter_entry ${state}`}>
                      <label htmlFor="price">Price</label>
                      <input
                        id="price"
                        type="range"
                        min={0}
                        max={100}
                        value={10}
                      />
                    </li>
                    <li className={`listings_filter_entry ${state}`}>
                      <label htmlFor="SquareFootage">Square Footage</label>
                      <input
                        id="SquareFootage"
                        type="range"
                        min={0}
                        max={100}
                        value={10}
                      />{" "}
                    </li>
                  </ul>
                )}
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listings
