import React, { useEffect, createContext } from "react"
import "./style.scss"
import { TransitionGroup, Transition } from "react-transition-group"
import { TimelineLite, Power2 } from "gsap"
import Seo from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

let exitTimeline, enterTimeline

// add the cursor context

const Layout = props => {
  useEffect(() => {
    new TimelineLite()
      .to(".transition_slide", 1, {
        x: "-100vw",
        ease: Power2.easeIn,
      })
      .to(".container", 1, { opacity: 1, ease: Power2.easeIn }, "-=.75")
      .set(".transition_slide", { display: "none" })
  }, [])

  return (
    <>
      <TransitionGroup>
        <Transition
          key={props.location.pathname}
          timeout={{
            enter: 2000,
            exit: 600,
          }}
          appear={false}
          onEntering={node => {
            if (enterTimeline) {
              enterTimeline.progress(100)
              enterTimeline.clear()
            }

            enterTimeline = new TimelineLite()
              .set(node, { overflowY: "hidden" })
              .set(".transition_slide", { x: "100vw", display: "block" })
              .to(".transition_slide", 0.5, { x: 0 })
              .to(".transition_slide", 0.5, { x: "-100vw" })
              .to(node, 1, { opacity: 1, ease: Power2.easeIn }, "-=0.35")
              .set(".transition_slide", { display: "none" })
              .set(node, { overflowY: "auto" })
          }}
          onExiting={node => {
            if (exitTimeline) {
              exitTimeline.progress(100)
              exitTimeline.clear()
            }

            exitTimeline = new TimelineLite()
              .set(node, { overflowY: "hidden" })
              .to(node, 0.6, {
                opacity: 0,
                ease: Power2.easeOut,
              })
          }}
        >
          <div id="container" className="container">
            <Seo />
            <Header />
            {props.children}
            <Footer />
          </div>
        </Transition>
      </TransitionGroup>
      <div className="transition_slide" />
    </>
  )
}

export default Layout
