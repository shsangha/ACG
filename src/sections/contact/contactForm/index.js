import React, { useState } from "react"
import ConfirmCard from "./confirm"
import Form from "./form"
import "./style.scss"
import PropTypes from "prop-types"

const ContactForm = props => {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="contact_form_container">
      <Form setConfirmed={setConfirmed} confirmed={confirmed} {...props} />
      <ConfirmCard
        setConfirmed={setConfirmed}
        confirmed={confirmed}
        {...props}
      />
    </div>
  )
}

ContactForm.defaultProps = {
  tabTrab: true,
}

ContactForm.propTypes = {
  tabTrab: PropTypes.bool,
  callback: PropTypes.func,
  subject: PropTypes.string,
}

export default ContactForm
