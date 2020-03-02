import React, { useRef, useState, useEffect } from "react"
import { Power1, TimelineLite } from "gsap"
import { Transition } from "react-transition-group"
import { Formik, Field } from "formik"

let loaderTimeline

const ContactForm = props => {
  const firstRef = useRef(null)
  const lastRef = useRef(null)
  const [method, setMethod] = useState("mail")
  const [visited, setVisited] = useState({})
  const [submitError, setSubmitError] = useState("")

  const defaultStyle = {
    transition: `opacity 800ms ease-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  const focusTrap = event => {
    if (event.keyCode === 9) {
      if (document.activeElement === lastRef.current && !event.shiftKey) {
        event.preventDefault()
        firstRef.current.focus()
      }
      if (document.activeElement === firstRef.current && event.shiftKey) {
        event.preventDefault()
        lastRef.current.focus()
      }
    }
  }

  useEffect(() => {
    loaderTimeline = new TimelineLite({ paused: true })
      .to(".contact_submit_text", 0.5, { opacity: 0 })
      .to(".contact_submit_loader", 0.5, { opacity: 1 }, "-=0.3")
      .staggerTo(
        ".loader_circ",
        0.5,
        { y: -40, repeat: -1, yoyo: true, ease: Power1.easeOut },
        0.2,
        "-=0.4"
      )
  }, [])

  useEffect(() => {
    firstRef.current.focus()

    if (props.tabTrab) {
      window.addEventListener("keydown", focusTrap)

      return () => {
        window.removeEventListener("keydown", focusTrap)
      }
    }
  }, [props.tabTrab])

  const validatePhone = value => {
    let err

    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!value.match(phoneno) && method === "phone") {
      err = "Enter a 10 digit phone number"
    }
    return err
  }

  const validateEmail = value => {
    let err

    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!value.match(email) && method === "mail") {
      err = "Enter a valid email address"
    }

    return err
  }

  const validateName = value => {
    let err

    if (value.length < 3) {
      err = "Enter atleast 3 characters"
    }
    return err
  }

  const submitFn = values => {
    const url = "/.netlify/functions/sendMail"

    loaderTimeline.play()

    return fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-refererer",
      body: JSON.stringify({ ...values, method, subject: props.subject }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          setSubmitError(res.error)
        } else {
          props.setConfirmed(true)
        }
        loaderTimeline.reverse()
      })
      .catch(() => {
        setSubmitError("Error connecting to mail service try again later")

        loaderTimeline.reverse()
      })
  }

  return (
    <Formik
      initialValues={{ name: "", mail: "", phone: "", msg: "" }}
      onSubmit={submitFn}
    >
      {({ resetForm, handleSubmit, errors }) => (
        <Transition
          in={!!!props.confirmed}
          onExited={() => {
            resetForm()
          }}
          timeout={{
            enter: 0,
            exit: 1000,
          }}
        >
          <>
            <div className="contact_form_toggles">
              <button
                type="button"
                ref={firstRef}
                onClick={() => setMethod("mail")}
                className={`contact_form_button hightlight_hover ${
                  method === "mail" ? "selected" : ""
                }`}
              >
                Send Mail
              </button>
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`contact_form_button hightlight_hover ${
                  method === "mail" ? "" : "selected"
                }`}
              >
                Request Callback
              </button>
            </div>
            <form
              autoComplete="new-password"
              onSubmit={handleSubmit}
              className="contact_form"
            >
              <div className="contact_field">
                <div
                  className={`contact_field_content ${
                    visited.name ? "selected" : ""
                  }`}
                >
                  <label className="contact_label" htmlFor="name">
                    Name:
                  </label>
                  <Field validate={validateName} name="name">
                    {({ field }) => (
                      <input
                        id="name"
                        className="contact_input"
                        onFocus={() => {
                          setVisited(prev => ({ ...prev, name: true }))
                        }}
                        autoComplete="new-password"
                        {...field}
                      />
                    )}
                  </Field>
                </div>

                <Transition timeout={800} in={!!(errors.name && visited.name)}>
                  {state => (
                    <div
                      style={{ ...defaultStyle, ...transitionStyles[state] }}
                      className="contact_error_wrapper"
                    >
                      {errors.name && visited.name && (
                        <p
                          className="contact_error"
                          aria-atomic="true"
                          role="alert"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}
                </Transition>
              </div>
              <div
                className={`contact_dynamic_wrapper ${
                  method === "mail" ? "mail" : "phone"
                }`}
              >
                <div className="contact_field">
                  <div
                    className={`contact_field_content ${
                      visited.mail || visited.phone ? "selected" : ""
                    }`}
                  >
                    <label className="contact_label" htmlFor="mail">
                      Mail:
                    </label>
                    <Field validate={validateEmail} name="mail">
                      {({ field }) => (
                        <input
                          id="mail"
                          className="contact_input"
                          onFocus={() => {
                            setVisited(prev => ({ ...prev, mail: true }))
                          }}
                          autoComplete="new-password"
                          type="email"
                          disabled={method !== "mail"}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>

                  <Transition
                    timeout={800}
                    in={!!(errors.mail && visited.mail)}
                  >
                    {state => (
                      <div
                        style={{ ...defaultStyle, ...transitionStyles[state] }}
                        className="contact_error_wrapper"
                      >
                        {errors.mail && visited.mail && (
                          <p
                            className="contact_error"
                            aria-atomic="true"
                            role="alert"
                          >
                            {errors.mail}
                          </p>
                        )}
                      </div>
                    )}
                  </Transition>
                </div>
                <div className="contact_field">
                  <div
                    className={`contact_field_content ${
                      visited.phone || visited.mail ? "selected" : ""
                    }`}
                  >
                    <label className="contact_label" htmlFor="phone">
                      Phone:
                    </label>
                    <Field validate={validatePhone} name="phone">
                      {({ field }) => (
                        <input
                          id="phone"
                          className="contact_input"
                          onFocus={() => {
                            setVisited(prev => ({ ...prev, phone: true }))
                          }}
                          autoComplete="new-password"
                          disabled={method !== "phone"}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>

                  <Transition
                    timeout={800}
                    in={!!(errors.phone && visited.phone)}
                  >
                    {state => (
                      <div
                        style={{ ...defaultStyle, ...transitionStyles[state] }}
                        className="contact_error_wrapper"
                      >
                        {errors.phone && visited.phone && (
                          <p
                            className="contact_error"
                            aria-atomic="true"
                            role="alert"
                          >
                            {errors.phone}
                          </p>
                        )}{" "}
                      </div>
                    )}
                  </Transition>
                </div>
              </div>
              <div className="contact_field">
                <div
                  className={`contact_field_content ${
                    visited.msg ? "selected" : ""
                  }`}
                >
                  <label className="contact_label" htmlFor="msg">
                    Message:
                  </label>
                  <Field name="msg">
                    {({ field }) => (
                      <textarea
                        id="msg"
                        className="contact_input"
                        onFocus={() => {
                          setVisited(prev => ({ ...prev, msg: true }))
                        }}
                        rows={3}
                        columns={60}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                ref={lastRef}
                className="contact_submit_wrapper"
              >
                <p type="submit" className="contact_submit_text">
                  Send
                </p>
                <svg
                  className="contact_submit_loader"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.16 16.64"
                >
                  <circle
                    className="loader_circ"
                    cx="8.32"
                    cy="8.32"
                    r="7.5"
                    fill="#231f20"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="1.64"
                  />
                  <circle
                    className="loader_circ"
                    cx="63.58"
                    cy="8.32"
                    r="7.5"
                    fill="#231f20"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="1.64"
                  />
                  <circle
                    className="loader_circ"
                    cx="118.84"
                    cy="8.32"
                    r="7.5"
                    fill="#231f20"
                    stroke="#231f20"
                    strokeMiterlimit="10"
                    strokeWidth="1.64"
                  />
                </svg>
              </button>

              <Transition timeout={800} in={!!submitError}>
                {state => (
                  <div
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className="contact_error_wrapper"
                  >
                    {submitError && (
                      <p
                        className="contact_error form_error"
                        aria-atomic="true"
                        role="alert"
                      >
                        {submitError}
                      </p>
                    )}{" "}
                  </div>
                )}
              </Transition>
            </form>
          </>
        </Transition>
      )}
    </Formik>
  )
}

export default ContactForm
