import React from "react"
import Main from "../sections/index/slideshow"
import About from "../sections/index/about"
import cursorContextWrapper from "../components/contextWrapper"

const Index = props => (
  <>
    <Main {...props} />
    <About {...props} />
  </>
)
export default cursorContextWrapper(Index)
