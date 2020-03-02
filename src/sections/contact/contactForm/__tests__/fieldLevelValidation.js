/* eslint-disable jest/valid-expect-in-promise */
import Form from "../form"
import React from "react"
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react"

const setup = label => {
  const Tree = render(<Form tabTrap={false} subject="irrelevant" />)
  const input = Tree.getByLabelText(label)
  return {
    input,
    Tree,
  }
}

describe("field validtion works as expected", () => {
  describe("form level validations work as expectd", () => {
    it("name field", async () => {
      const { Tree, input } = setup("Name:")
      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: "na" } })
      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.blur(input)
      const err = await waitForElement(() => Tree.queryByRole("alert"))
      expect(err).toHaveTextContent("Enter atleast 3 characters")

      fireEvent.change(input, { target: { value: "Shawn Sangha" } })

      waitForElementToBeRemoved(() => err)
    })

    it("mail field", async () => {
      const { Tree, input } = setup("Mail:")
      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: "na" } })
      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.blur(input)
      const err = await waitForElement(() => Tree.queryByRole("alert"))
      expect(err).toHaveTextContent("Enter a valid email address")

      fireEvent.change(input, { target: { value: "shawnsangha@gmail.com" } })

      waitForElementToBeRemoved(() => err)
    })
    it("phone field", async () => {
      const { Tree, input } = setup("Phone:")
      const CallbackBtn = Tree.getByText("Request Callback")
      fireEvent.click(CallbackBtn)

      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.focus(input)
      fireEvent.change(input, { target: { value: "na" } })
      expect(Tree.queryByRole("alert")).toBe(null)
      fireEvent.blur(input)
      const err = await waitForElement(() => Tree.queryByRole("alert"))
      expect(err).toHaveTextContent("Enter a 10 digit phone number")

      fireEvent.change(input, { target: { value: "4037784457" } })
      waitForElementToBeRemoved(() => err)
    })
  })
})
