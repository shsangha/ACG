import { render } from "@testing-library/react"
import Layout from "../index"
import React from "react"

describe("renders without errors", () => {
  it("matches snapshot", () => {
    const Main = render(<Layout />)
    expect(Main).toMatchSnapshot()
  })
})
