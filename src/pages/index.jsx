import React from "react"
import Main from "../sections/index/slideshow"
import loadable from "react-loadable"

const About = loadable({
  loader: () => import("../sections/index/about"),
  loading: () => null,
})

const Index = props => (
  <>
    <Main {...props} />
    <About {...props} />
  </>
)
export default Index
