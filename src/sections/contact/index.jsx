import React from "react"
import ContactForm from "./contactForm"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./style.scss"

export const PureContact = ({ fluid }) => (
  <div className="contact_page">
    <div className="contact_page_wrapper">
      <div className="contact_form_wrapper">
        <div className="contact_page_form">
          <h1 className="contact_page_header">Get In Contact</h1>
          <ContactForm tabTrab={false} subject="general contact" />
        </div>
      </div>
      <Img className="contact_page_img" fluid={fluid} />
    </div>
  </div>
)

const Contact = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          image: file(relativePath: { eq: "contactimg.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 900) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
    >
      {({
        image: {
          childImageSharp: { fluid },
        },
      }) => <PureContact fluid={fluid} />}
    </StaticQuery>
  )
}

export default Contact
