import React from "react"
import { CursorContext } from "../../layouts"

const CursorWrapper = Component => props => (
  <CursorContext.Consumer>
    {values => <Component {...props} {...values} />}
  </CursorContext.Consumer>
)


export default CursorWrapper;