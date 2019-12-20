import React from "react"
import ContactForm from "./contactForm"
import Footer from "../../components/footer"
import "./style.scss"

const Contact = () => {
  return (
    <div className="contact_page">
      <div className="contact_page_wrapper">
        <div className="contact_form_wrapper">
          <div className="contact_page_form">
            <h1 className="contact_page_header">Get In Contact</h1>
            <ContactForm />
          </div>
        </div>
        <img
          className="contact_page_img"
          src="https://images.unsplash.com/photo-1556665490-9375cc0c29dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
        />
        <Footer />
      </div>
    </div>
  )
}

export default Contact
