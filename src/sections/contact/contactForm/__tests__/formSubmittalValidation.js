import React from "react"
import ContactForm from "../form"
import { render, fireEvent, waitForElement, wait } from "@testing-library/react"

const setup = () => {
  const Tree = render(<ContactForm tabTrap={false} subject="irrelevant" />)

  const nameField = Tree.getByLabelText("Name:")
  const mailField = Tree.getByLabelText("Mail:")
  const phoneField = Tree.getByLabelText("Phone:")
  const msgField = Tree.getByLabelText("Message:")

  fireEvent.change(nameField, { target: { value: "Valid Name" } })
  fireEvent.change(mailField, { target: { value: "validemail@shaw.ca" } })
  fireEvent.change(phoneField, { target: { value: "4039987454" } })
  fireEvent.change(msgField, { target: { value: "some message" } })

  const sendBtn = Tree.getByText("Send")

  return {
    Tree,
    sendBtn,
  }
}

describe("tests form does what expected on succssful submission and submission errors", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("handles an error coming from the server", async () => {
    const { Tree, sendBtn } = setup()

    const fakeServerError = "error that comes from server"

    jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve({
          json: () => ({
            error: fakeServerError,
          }),
        })
      })
    })

    fireEvent.click(sendBtn)

    const err = await waitForElement(() => Tree.queryByRole("alert"))

    expect(err).toHaveTextContent(fakeServerError)
  })

  it("handles when server isnt connected/unknown errors", async () => {
    const { Tree, sendBtn } = setup()

    jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        reject("faking not being able to connect to server")
      })
    })

    fireEvent.click(sendBtn)
    const err = await waitForElement(() => Tree.queryByRole("alert"))

    expect(err).toHaveTextContent(
      "Error connecting to mail service try again later"
    )
  })

  it("handles the happy path", async () => {
    const { Tree, sendBtn } = setup()

    jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return new Promise(resolve => {
        resolve({
          json: () => ({}),
        })
      })
    })

    fireEvent.click(sendBtn)

    await wait(() => expect(Tree.queryByRole("altert")).toBe(null))
  })
})
