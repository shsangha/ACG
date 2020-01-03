import React from "react"
import Contact from "../sections/contact"
import cursorContextWrapper from "../components/contextWrapper"

const ContactPage = props => <Contact {...props} />

export default cursorContextWrapper(ContactPage)
