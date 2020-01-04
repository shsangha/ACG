import React, { useState } from "react"
import { Transition } from "react-transition-group"
import { TimelineLite, Power1 } from "gsap"
import ContactForm from "../../sections/contact/contactForm"
import "./style.scss"

const MobileChat = ({ subject }) => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          new TimelineLite()
            .to(".container", 0.5, {
              scrollTop: 0,
            })
            .add(() => setFormOpen(true))
        }}
        className="listing_hero_chat_link black"
      >
        Contact an Agent
      </button>
      <Transition
        unmountOnExit
        in={formOpen}
        timeout={1200}
        onEntering={() => {
          new TimelineLite()
            .set(".container", { overflowY: "hidden" })
            .to(".listing_hero_chat_container", 0.7, {
              scaleY: 1,
              ease: Power1.easeOut,
            })
            .to(".listing_hero_chat_wrapper", 0.5, {
              opacity: 1,
              ease: Power1.easeOut,
            })
        }}
        onExiting={() => {
          new TimelineLite()
            .set(".container", { overflowY: "scroll" })

            .to(".listing_hero_chat_wrapper", 0.5, {
              opacity: 0,
              ease: Power1.easeIn,
            })
            .to(".listing_hero_chat_container", 0.7, {
              scaleY: 0,
              ease: Power1.easeIn,
            })
        }}
      >
        <div className="listing_hero_chat_container">
          <div className="listing_hero_chat_wrapper">
            <div className="listing_hero_mobile_header">
              <h2 className="listing_hero_mobile_header_text">Get In Touch</h2>
              <button
                onClick={() => {
                  setFormOpen(false)
                }}
                className="listing_hero_mobile_close_btn"
              >
                X
              </button>
            </div>
            <ContactForm
              subject={subject}
              tabTrab={true}
              callback={() => setFormOpen(false)}
            />
          </div>
        </div>
      </Transition>
    </>
  )
}

export default MobileChat
