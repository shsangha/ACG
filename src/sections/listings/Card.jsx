import React, { Component, createRef } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { TimelineLite, TweenLite, Power1 } from "gsap"

class Card extends Component {
  cardRef = createRef(null)
  tl = null

  componentDidMount() {
    TweenLite.to(this.cardRef.current, 1, { opacity: 1, ease: Power1.easeIn })
  }

  getSnapshotBeforeUpdate() {
    return this.cardRef.current.getBoundingClientRect()
  }

  componentDidUpdate(prevProps, _state, snapshot) {
    const currentRect = this.cardRef.current.getBoundingClientRect()

    const translateX = snapshot.left - currentRect.left
    const translateY = snapshot.top - currentRect.top

    if (this.tl) {
      this.tl.progress(100)
    }

    this.tl = new TimelineLite().fromTo(
      this.cardRef.current,
      0.5,
      {
        x: translateX,
        y: translateY,
      },
      { x: 0, y: 0 }
    )
  }

  render() {
    const {
      ListingType,
      PropertyType,
      Description,
      Loacation,
      Images,
      title,
      status,
      id,
      fallback,
    } = this.props

    return (
      <Link ref={this.cardRef} className="listings_card" to={`/listings/${id}`}>
        <h3 className="listings_card_listing_type">For {ListingType}</h3>
        <Img
          className="listing_card_img"
          fluid={Images[0] ? Images[0].childImageSharp.fluid : fallback}
        />
        <div className="listings_card_content">
          <h2 className="listings_card_title">{title}</h2>
          {Loacation && (
            <span className="listings_card_address">{Loacation}</span>
          )}
          {Description && <p className="listings_card_desc">{Description}</p>}
          <span className="listing_card_property_type">{PropertyType}</span>
        </div>
      </Link>
    )
  }
}

export default Card
