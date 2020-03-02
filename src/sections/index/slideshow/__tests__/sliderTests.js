import React from "react"
import { render, getByTestId } from "@testing-library/react"
import { Slider } from "../index"

const nodes = ["one", "two", "three", "four", "five", "six"].map(
  (title, idx) => ({
    id: idx,
    frontmatter: {
      title,
      Images: [
        {
          childImageSharp: {
            fluid: {
              src: "",
              srcSet: "",
              sizes: "",
              aspectRatio: 1,
              base64: "",
            },
          },
        },
      ],
    },
  })
)

jest.mock("gatsby-image", () => props => <img {...props} />)

describe("tests the infinite slider", () => {
  it("doesnt blow up", () => {
    const Tree = render(
      <div className="container">
        <Slider
          allMarkdownRemark={{
            nodes,
          }}
        />
      </div>
    )

    expect(Tree).toMatchSnapshot()
  })

  it("replicates items when dealing with less that 5 listings", () => {
    const threeNodes = nodes.slice(0, 3)

    const Tree = render(
      <div className="container">
        <Slider
          allMarkdownRemark={{
            nodes: threeNodes,
          }}
        />
      </div>
    )

    expect(Tree.getAllByAltText("one")).toHaveLength(2)
    expect(Tree.getAllByAltText("two")).toHaveLength(2)
    expect(Tree.getAllByAltText("three")).toHaveLength(1)
  })

  it("infinite slider functionality works as expected", async () => {
    const Tree = render(
      <div className="container">
        <Slider
          allMarkdownRemark={{
            nodes,
          }}
        />
      </div>
    )

    expect(getByTestId(document.body, "0")).toHaveAttribute("alt", "one")
    expect(getByTestId(document.body, "1")).toHaveAttribute("alt", "two")
    expect(getByTestId(document.body, "2")).toHaveAttribute("alt", "three")
    expect(getByTestId(document.body, "3")).toHaveAttribute("alt", "four")
    expect(getByTestId(document.body, "4")).toHaveAttribute("alt", "five")
  })
})
