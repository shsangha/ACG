import React from "react"
import Listings from "../sections/listings"
import cursorContextWrapper from "../components/contextWrapper"

const ListingsPage = props => <Listings {...props} />

export default cursorContextWrapper(ListingsPage)
