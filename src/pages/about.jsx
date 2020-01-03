import React from "react"
import About from "../sections/index/about"
import cursorContextWrapper from "../components/contextWrapper"

const AboutPage = props => <About {...props} />
export default cursorContextWrapper(AboutPage)
