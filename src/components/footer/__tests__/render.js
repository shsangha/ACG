import { render } from "@testing-library/react"
import Footer from "../index"
import React from "react"

describe("renders without errors", () => {
  it("matches snapshot", () => {
    const Foot = render(<Footer />)
    expect(Foot).toMatchSnapshot()
  })
})
