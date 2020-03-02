import React from "react"
import { render } from "@testing-library/react"
import Form from "../form"

it("renders wihtout error", () => {
  const Tree = render(<Form tabTrap={false} subject="" />)
  expect(Tree).toMatchSnapshot()
})
