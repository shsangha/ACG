import React, { useEffect } from "react"
import { Transition } from "react-transition-group"
import TimelineLite from "TimelineLite"
import { Power1 } from "gsap"
import DrawSVG from "../../../utils/DrawSVGPlugin"
const pluigns = [DrawSVG] // just to avoid plugin being treeshaken

// just for a11y sake to help manage tab-trapping/focus when confirmation card pops up
const ConfirmationCardTransitionHelper = props => {
  const focusTrap = event => {
    //for now need to add condition on if exit button is supplied

    if (event.keyCode === 9) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (props.tabTrap) {
      window.addEventListener("keydown", focusTrap)

      return () => window.removeEventListener("keydown", focusTrap)
    }
  }, [props.tabTrap])

  return props.children
}

const ConfirmationCard = props => {
  const resetForm = () => {
    props.setConfirmed(false)
  }

  return (
    <div className="contact_form_confirmation_wrapper">
      <Transition
        mountOnEnter
        unmountOnExit
        in={props.confirmed}
        onEntering={() => {
          new TimelineLite()
            .set(".contact_confirm_path", {
              drawSVG: false,
            })
            .to(".contact_confirm_content", 1, {
              y: 0,
              ease: Power1.easeOut,
            })
            .staggerFromTo(
              ".contact_confirm_path",
              0.6,
              {
                cycle: {
                  drawSVG: ["100% 100%", "0% 0%"],
                },
              },
              {
                cycle: {
                  drawSVG: ["100% 0%", "0% 100%"],
                  ease: Power1.easeIn,
                },
              },
              0.2,
              "-=0.4"
            )
            .to(
              ".contact_confirm_text",
              0.6,
              {
                opacity: 1,
                ease: Power1.easeOut,
              },
              "-=0.2"
            )
            .to(
              ".contact_confirm_back_btn",
              0.6,
              {
                opacity: 1,
                ease: Power1.easeOut,
              },
              "-=0.3"
            )
        }}
        onEntered={() => {
          document.querySelector(".contact_confirm_back_btn").focus()
        }}
        onExiting={node => {
          new TimelineLite()
            .to(node, 1, {
              y: "100%",
              ease: Power1.easeIn,
            })
            .to(
              ".contact_confirm_wrapper",
              0.7,
              { opacity: 0, ease: Power1.easeIn },
              "-=1"
            )
        }}
        timeout={{
          enter: 1200,
          exit: 1000,
        }}
      >
        <ConfirmationCardTransitionHelper {...props}>
          <div className="contact_confirm_content">
            <div className="contact_confirm_wrapper">
              <div className="contact_confirm_text">
                <h3 className="contact_confirm_header">Message Recieved</h3>
                <p className="contact_confirm_desc">
                  Expect to hear from us shortly
                </p>
              </div>
              <svg
                className="contact_confirm_checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 97.68 97.68"
              >
                <circle
                  className="contact_confirm_path circle"
                  cx="48.84"
                  cy="48.84"
                  r="48"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="1.68"
                />
                <polygon
                  className="contact_confirm_path"
                  points="17.38 49.9 25.24 42.15 40.26 56.93 72.44 25.26 80.31 33.01 40.26 72.42 17.38 49.9"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="1.68"
                />
              </svg>
              <button onClick={resetForm} className="contact_confirm_back_btn">
                Go back
              </button>
            </div>
          </div>
        </ConfirmationCardTransitionHelper>
      </Transition>
    </div>
  )
}

ConfirmationCard.defaultProps = {
  tabTrap: true,
}

export default ConfirmationCard
