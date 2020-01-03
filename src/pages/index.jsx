import React from "react"
import Main from "../sections/index/slideshow"
import About from "../sections/index/about"

const Index = props => (
  <>
    <Main />
    <About {...props} />
  </>
)
export default Index
