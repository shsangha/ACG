import { render } from "@testing-library/react"
import Header from "../index"
import React from "react"

describe("renders without errors", () => {
  it("matches snapshot", () => {
    const Head = render(<Header />)
    expect(Head).toMatchSnapshot()
  })
})
