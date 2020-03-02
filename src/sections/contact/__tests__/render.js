import React from "react"
import { PureContact } from "../index"
import { render } from "@testing-library/react"

const fluid = {
  base64: "",
  aspectRatio: "",
  src: "",
  srcSet: "",
  sizes: "",
}

describe("redners the image from the query, and the form without error", () => {
  it("renders without errors", () => {
    const tree = render(<PureContact fluid={fluid} />)

    expect(tree).toMatchSnapshot()
  })
})
