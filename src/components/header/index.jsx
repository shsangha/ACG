import React from "react"
import { Link } from "gatsby"
import "./style.scss"

const Header = () => {
  return (
    <header className="header">
      <Link className="header_home_link " to="/" state={{ internalNav: true }}>
        <svg
          className="header_logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 98.65 40.51"
        >
          <g className="header_logo_g">
            <path
              d="M24.46,32.5H12.17L9.1,39.73H1L18.16,1.45h6.93l8.73,38.28H26.11Zm-1.37-6.77L20.46,12.24,15,25.73Z"
              transform="translate(-0.61 -0.34)"
              fill="none"
              strokeMiterlimit="10"
              strokeWidth=".7"
            />
            <path
              d="M60.12,38.53a15.11,15.11,0,0,1-7.9,2.06,14.7,14.7,0,0,1-11.46-5.1c-2.1-2.47-4.39-6.6-4.39-13.26s2.15-12.11,5.17-15.67a16.75,16.75,0,0,1,13-6,15.64,15.64,0,0,1,9.22,2.76l-.93,9.35a10.3,10.3,0,0,0-8.14-3.84A9,9,0,0,0,47,12.47a14.9,14.9,0,0,0-2.92,9,12.6,12.6,0,0,0,2.53,7.87,9,9,0,0,0,6.88,3A11,11,0,0,0,61.09,29Z"
              transform="translate(-0.61 -0.34)"
              fill="none"
              strokeMiterlimit="10"
              strokeWidth=".7"
            />
            <path
              d="M83.78,18.84H99c-.25,9.65-3.41,14.41-5,16.36-3.71,4.53-8,5.39-12,5.39A14.53,14.53,0,0,1,70,35.2C66.67,31.07,65.89,26,65.89,22c0-7.24,2.24-12.17,4.88-15.44C74.86,1.45,79.49.59,84.08.59a14.71,14.71,0,0,1,9.17,2.82,20.18,20.18,0,0,1,5.26,6.88L91.59,14.6a10.74,10.74,0,0,0-3-4.37,7.68,7.68,0,0,0-5-1.6,8.06,8.06,0,0,0-6.83,3.21,16,16,0,0,0-3.17,9.76,13,13,0,0,0,2.69,8.2A8.18,8.18,0,0,0,83,32.56a7.91,7.91,0,0,0,5.17-1.72A9.05,9.05,0,0,0,90.9,25.9H83.05Z"
              transform="translate(-0.61 -0.34)"
              fill="none"
              strokeMiterlimit="10"
              strokeWidth=".7"
            />
          </g>
        </svg>
      </Link>
      <nav className="header_nav">
        <Link
          activeClassName="active"
          to="/about"
          className="header_nav_link hightlight_hover "
          state={{ internalNav: true }}
        >
          About
        </Link>
        <Link
          activeClassName="active"
          to="/listings"
          className="header_nav_link hightlight_hover "
          state={{ internalNav: true }}
        >
          Listings
        </Link>
        <Link
          activeClassName="active"
          to="/contact"
          className="header_nav_link hightlight_hover "
          state={{ internalNav: true }}
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Header
