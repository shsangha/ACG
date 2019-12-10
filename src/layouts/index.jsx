import React from "react"
import "./style.scss"

const Layout = props => (
  <div id="container" className="container">
    {props.children}
  </div>
)

export default Layout
