import React, { useRef, useState, useEffect } from "react"
import TimelineLite from "TimelineLite"
import { Power1 } from "gsap"
import { Transition } from "react-transition-group"
import { useFormik } from "formik"

let loaderTimeline

const Form = props => {
  const firstRef = useRef(null)
  const lastRef = useRef(null)
  const [method, setMethod] = useState("mail")
  const [touched, setTouched] = useState({})
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

  const validate = values => {
    const errors = {}

    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!values.phone.match(phoneno) && method === "phone") {
      errors.phone = "Enter a 10 digit phone number"
    }

    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!values.mail.match(email) && method === "mail") {
      errors.mail = "Enter a valid email address"
    }

    if (values.name.length < 3) {
      errors.name = "Enter atleast 3 characters"
    }

    return errors
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

  const formik = useFormik({
    initialValues: {
      name: "",
      mail: "",
      phone: "",
      msg: "",
    },
    validate,
    onSubmit: submitFn,
  })

  return (
    <Transition
      in={!!!props.confirmed}
      onExited={() => {
        formik.resetForm()
      }}
      timeout={{
        enter: 0,
        exit: 1000,
      }}
    >
      <>
        <div className="contact_form_toggles">
          <button
            ref={firstRef}
            onClick={() => setMethod("mail")}
            className={`contact_form_button ${
              method === "mail" ? "selected" : ""
            }`}
          >
            Send Mail
          </button>
          <button
            onClick={() => setMethod("phone")}
            className={`contact_form_button ${
              method === "mail" ? "" : "selected"
            }`}
          >
            Request Callback
          </button>
        </div>
        <form
          autoComplete="new-password"
          onSubmit={formik.handleSubmit}
          className="contact_form"
        >
          <div className="contact_field">
            <div
              className={`contact_field_content ${
                touched.name ? "selected" : ""
              }`}
            >
              <label className="contact_label" htmlFor="#name">
                Name:
              </label>
              <input
                onFocus={() => {
                  setTouched(prev => ({ ...prev, name: true }))
                }}
                autoComplete="new-password"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                className="contact_input"
                id="name"
                type="text"
              />
            </div>

            <Transition
              timeout={800}
              in={!!(formik.errors.name && formik.touched.name)}
            >
              {state => (
                <div
                  style={{ ...defaultStyle, ...transitionStyles[state] }}
                  className="contact_error_wrapper"
                >
                  {formik.errors.name && (
                    <p
                      className="contact_error"
                      aria-atomic="true"
                      role="alert"
                    >
                      {formik.errors.name}
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
                  touched.mail || touched.phone ? "selected" : ""
                }`}
              >
                <label className="contact_label" htmlFor="#mail">
                  Mail:
                </label>
                <input
                  onFocus={() => {
                    setTouched(prev => ({ ...prev, mail: true }))
                  }}
                  autoComplete="new-password"
                  name="mail"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={method !== "mail"}
                  value={formik.values.mail}
                  className="contact_input"
                  id="mail"
                  type="email"
                />
              </div>

              <Transition
                timeout={800}
                in={!!(formik.errors.mail && formik.touched.mail)}
              >
                {state => (
                  <div
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className="contact_error_wrapper"
                  >
                    {formik.errors.mail && (
                      <p
                        className="contact_error"
                        aria-atomic="true"
                        role="alert"
                      >
                        {formik.errors.mail}
                      </p>
                    )}
                  </div>
                )}
              </Transition>
            </div>
            <div className="contact_field">
              <div
                className={`contact_field_content ${
                  touched.phone || touched.mail ? "selected" : ""
                }`}
              >
                <label className="contact_label" htmlFor="#phone">
                  Phone:
                </label>
                <input
                  onFocus={() => {
                    setTouched(prev => ({ ...prev, phone: true }))
                  }}
                  autoComplete="new-password"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className="contact_input"
                  disabled={method !== "phone"}
                  id="phone"
                  type="tel"
                />
              </div>

              <Transition
                timeout={800}
                in={!!(formik.errors.phone && formik.touched.phone)}
              >
                {state => (
                  <div
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    className="contact_error_wrapper"
                  >
                    {formik.errors.phone && (
                      <p
                        className="contact_error"
                        aria-atomic="true"
                        role="alert"
                      >
                        {formik.errors.phone}
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
                touched.msg ? "selected" : ""
              }`}
            >
              <label className="contact_label" htmlFor="#msg">
                Message:
              </label>
              <textarea
                onFocus={() => {
                  setTouched(prev => ({ ...prev, msg: true }))
                }}
                autoComplete="new-password"
                name="msg"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.msg}
                className="contact_input"
                id="msg"
                rows={3}
                colums={60}
              />
            </div>
          </div>

          <button ref={lastRef} className="contact_submit_wrapper">
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
  )
}

export default Form
