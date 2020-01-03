import React, { useEffect } from "react"
import "./style.scss"
import cursorContextWrapper from "../contextWrapper"

const Footer = ({ focusLink }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      elements => {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i]

          if (element.isIntersecting) {
            element.target.classList.add("intersected")

            observer.unobserve(element.target)
          }
        }
      },
      { threshold: 1 }
    )

    const list = document.querySelectorAll(".footer_animate_in")

    for (let i = 0; i < list.length; i++) {
      const item = list[i]

      observer.observe(item, { threshold: 0.5 })
    }
  }, [])

  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="footer_logo_wrapper footer_animate_in footer_fade">
          <svg
            className="footer_logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 74.96 97.96"
          >
            <path
              d="M63.82,1A70.9,70.9,0,0,1,74.53,3.2a47.37,47.37,0,0,1,9.61,4.24A11.07,11.07,0,0,1,86.2,8.71c.58.56.22,1-.17,1.56C85,11.81,84,13.41,82.87,14.94c-.35.5-.61.73-1.22.49A22.39,22.39,0,0,1,79.27,14a38.68,38.68,0,0,0-4.6-2.18,39.85,39.85,0,0,0-21-2.12,40.6,40.6,0,0,0-17.53,7.81c-9.46,7.15-14.66,18.1-15.61,29.8A39.45,39.45,0,0,0,22.87,64.5a43.06,43.06,0,0,0,10,15A39.25,39.25,0,0,0,68.3,90a38.67,38.67,0,0,0,9.34-3.21,45.58,45.58,0,0,0,4.44-2.56c.56-.36,1-.7,1.53-.18a14.6,14.6,0,0,1,1.64,2.48c.5.74,1,1.47,1.52,2.2.4.56,1,1.13.48,1.77a9.21,9.21,0,0,1-2.08,1.39c-.74.45-1.48.88-2.24,1.3a47,47,0,0,1-48.65-2.18A48.72,48.72,0,0,1,14.13,62.83,43.72,43.72,0,0,1,12.5,51.91a84.31,84.31,0,0,1,.42-11.24,42.07,42.07,0,0,1,3-10.3,47.12,47.12,0,0,1,4.66-8.65A50.15,50.15,0,0,1,34.8,8C40.23,4.51,46.91,1.6,53.41,1.22,56.88,1,60.33,1,63.82,1Z"
              transform="translate(-12.5 -1)"
              className="footer_logo_path"
            />
            <path
              d="M39.2,71.14c-3.49,0-7,0-10.47,0-.28,0-.65.13-.8-.14s.18-.52.34-.74L44.34,47A15.37,15.37,0,0,0,46.07,44a4.79,4.79,0,0,0-2.53-6.49,5.26,5.26,0,0,0-6.82,2.18,4.47,4.47,0,0,0-.65,2.28c0,.58-.27.79-.83.79-2.17,0-4.35,0-6.53,0-.78,0-.88-.41-.85-1a13.42,13.42,0,0,1,26.83.87A13.78,13.78,0,0,1,52,50.24c-2.76,3.92-5.48,7.89-8.2,11.84-.18.25-.54.51-.37.82s.58.15.89.15H55c.29,0,.71-.16.86.21s-.19.52-.35.75c-1.48,2.14-3,4.26-4.42,6.4a1.51,1.51,0,0,1-1.44.73C46.18,71.13,42.69,71.14,39.2,71.14Z"
              transform="translate(-12.5 -1)"
              className="footer_logo_path"
            />
            <path
              d="M73.18,50V69.81c0,1.33,0,1.33-1.34,1.33-1.86,0-3.71,0-5.57,0-.94,0-1.19-.31-1.19-1.21q0-15.62,0-31.21a8.42,8.42,0,0,1,0-.87c.06-.7-.24-1-.95-.95-1.69,0-3.39,0-5.08,0-.25,0-.56.1-.7-.17s.13-.48.27-.68c1.52-2.21,3.07-4.41,4.58-6.63a1.36,1.36,0,0,1,1.31-.6c2.49,0,5,0,7.49,0,1,0,1.18.35,1.18,1.24C73.17,36.72,73.18,43.38,73.18,50Z"
              transform="translate(-12.5 -1)"
              className="footer_logo_path"
            />
          </svg>
          <svg
            className="footer_logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 75"
          >
            <g>
              <path
                className="footer_logo_path"
                d="M0,76a14.28,14.28,0,0,1,2.08-1.29,39,39,0,0,1,4.69-2.17,54,54,0,0,1,8.89-2.62q3.86-.75,7.74-1.13a79.84,79.84,0,0,1,10.14-.21,16.35,16.35,0,0,1,2.7.19c.31.06.43-.06.43-.44V10.59a.88.88,0,0,1,.42-.85Q43.21,5.5,49.35,1.29a1.12,1.12,0,0,1,1.51,0c3.27,2.3,6.56,4.54,9.85,6.8.78.54,1.56,1.09,2.36,1.6a.84.84,0,0,1,.44.91,3.68,3.68,0,0,0,0,.47v56.5c0,1.23-.08,1.17.93,1.1a78.21,78.21,0,0,1,8.66-.14,67.76,67.76,0,0,1,7.65.71,59.35,59.35,0,0,1,9.69,2.25,40.47,40.47,0,0,1,7.18,3A10.09,10.09,0,0,1,100,76l-1-.47A54.12,54.12,0,0,0,87,71.44a77.46,77.46,0,0,0-8.12-1.29,102.76,102.76,0,0,0-13.36-.38c-.84,0-1.67.14-2.51.22-.39,0-.45,0-.5-.48V11.62a1.45,1.45,0,0,0-.67-1.4c-3-2-6-4.11-9.05-6.18-.74-.51-1.5-1-2.23-1.55a.84.84,0,0,0-1.13,0C47,4.22,44.55,5.9,42.09,7.6c-1.29.89-2.57,1.8-3.88,2.62a1.3,1.3,0,0,0-.57,1.28V69.55c0,.37-.15.48-.45.45a59.07,59.07,0,0,0-6.91-.3,62,62,0,0,0-6.71.23A71,71,0,0,0,9.79,72.25q-3.25,1-6.44,2.25c-1,.39-1.88.87-2.82,1.31A.7.7,0,0,1,0,76Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
              <path
                className="footer_logo_path"
                d="M27.86,14.22l-1,.67-8,5.46c-.15.11-.29.23-.44.33a.58.58,0,0,0-.27.55c0,.27,0,.51,0,.75V66.34c0,.41-.15.55-.46.58s-.47,0-.45-.43V21.06A1.4,1.4,0,0,1,18,19.69c2.78-1.87,5.53-3.75,8.3-5.68.67-.46,1.35-.9,2-1.37a.41.41,0,0,1,.58,0l5.83,4.15c.32.23.29.28.06.82-.15.36-.31.33-.55.16l-4.39-3.14a.91.91,0,0,0-.64-.3c0,.83-.12,1.64-.13,2.45-.08,3.12-.11,6.24-.19,9.36-.06,2.49-.17,5-.25,7.5a1.56,1.56,0,0,1-.21.75V32.14c0-2.84-.07-5.67-.16-8.51-.09-3-.2-6-.24-9A.37.37,0,0,0,27.86,14.22Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
              <path
                className="footer_logo_path"
                d="M72.29,14.24a.53.53,0,0,0-.09.39Q72.13,18.3,72,22c-.08,3.2-.16,6.39-.27,9.59,0,1-.08,1.95-.15,2.93-.09-1.5-.17-3-.19-4.55,0-2.52-.05-5.06-.16-7.58-.07-1.65,0-3.3-.12-4.94-.05-1-.07-2.05-.11-3a.47.47,0,0,0-.51.15L66.1,17.71c-.14.09-.28.35-.45.16a1.26,1.26,0,0,1-.35-.8c0-.2.19-.26.31-.35l4.22-3c.51-.35,1-.69,1.51-1.06a.53.53,0,0,1,.71,0q5.15,3.56,10.31,7.08A1.3,1.3,0,0,1,83,21V66.29c0,.29.08.65-.36.62s-.5-.13-.54-.64V22c0-1.34.11-1.08-.84-1.74l-8.51-5.85A.8.8,0,0,0,72.29,14.24Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
              <path
                className="footer_logo_path"
                d="M49.51,59.57a2.68,2.68,0,0,1,0-.75V5.18c0-.49.19-.69.6-.75s.59.22.64.68h0q0,.46,0,.93V56.55a5.07,5.07,0,0,1-1,3,.41.41,0,0,1-.11.07Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
              <path
                className="footer_logo_path"
                d="M88.49,31,86.1,32.69c-.35.26-.71.49-1,.75-.16.19-.39.14-.51-.1a.31.31,0,0,1-.05-.1c-.2-.42-.21-.55.08-.75s.78-.56,1.17-.83c1-.72,2-1.42,3-2.15a.68.68,0,0,1,.89,0q3.81,2.64,7.63,5.25A1.26,1.26,0,0,1,97.86,36V70.88c0,.28,0,.59-.34.57s-.55-.13-.56-.61V37a1,1,0,0,1,0-.24,1.29,1.29,0,0,0-.7-1.44c-2-1.32-3.92-2.69-5.89-4a.62.62,0,0,0-.53-.19c0,.53-.1,1.08-.12,1.64-.07,2.08-.08,4.18-.19,6.25s0,4-.22,6c0,.41-.1.81-.16,1.29a1.7,1.7,0,0,1-.07-.75c0-2.43-.1-4.85-.17-7.27-.07-2.25-.21-4.5-.24-6.75A.54.54,0,0,0,88.49,31Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
              <path
                className="footer_logo_path"
                d="M11.59,31.09c-.24,5-.25,9.94-.62,14.9-.08-.83-.12-1.66-.13-2.5,0-2.14-.15-4.27-.19-6.41,0-1.91-.15-3.81-.23-5.72a1.91,1.91,0,0,0-.06-.33,5.75,5.75,0,0,0-1.21.75C7.41,33,5.68,34.18,3.93,35.34a1.44,1.44,0,0,0-.67,1.39V70.78c0,.51-.11.62-.53.65-.24,0-.38-.05-.37-.37V36A1.37,1.37,0,0,1,3,34.7q3.76-2.54,7.54-5.14a.72.72,0,0,1,.95,0c1.34,1,2.69,1.93,4,2.9.38.28.4.36.2.75s-.24.48-.64.2c-1-.75-2.08-1.5-3.12-2.2A.39.39,0,0,0,11.59,31.09Z"
                transform="translate(0 -1)"
                fill="#2e3192"
              />
            </g>
          </svg>
        </div>
        <div className="footer_contacts_wrapper">
          <div className="footer_contacts">
            <div className="footer_field phone footer_animate_in footer_fade ">
              <h4 className="footer_label main_label">Phone</h4>
              <div className="footer_field_content">
                <div className="footer_contact">
                  <h5 className="footer_label">Gurjant Gill</h5>
                  <a
                    {...focusLink()}
                    href="tel:14036083406"
                    className="footer_link hightlight_hover"
                  >
                    403 680 3406
                  </a>
                </div>
                <div className="footer_contact">
                  <h5 className="footer_label">Paul Gill</h5>
                  <a
                    {...focusLink()}
                    href="tel:14036083406"
                    className="footer_link hightlight_hover"
                  >
                    403 681 3406
                  </a>
                </div>
                <div className="footer_contact">
                  <h5 className="footer_label">Jim Lee</h5>
                  <a
                    {...focusLink()}
                    href="tel:14036083406"
                    className="footer_link hightlight_hover"
                  >
                    403 617 0438
                  </a>
                </div>
              </div>
            </div>
            <div className="footer_field footer_animate_in footer_fade">
              <h4 className="footer_label main_label">Email</h4>
              <a
                {...focusLink()}
                className="footer_link hightlight_hover"
                href="mailto:info@albertacommercialgroup.com"
              >
                info@albertacommercialgroup.com
              </a>
            </div>
            <div className="footer_field footer_animate_in footer_fade">
              <h4 className="footer_label main_label">Facebook</h4>
              <a
                {...focusLink()}
                className="footer_link hightlight_hover"
                href="https://facebook.com/albertacommercialgroup"
              >
                @albertacommercialgroup
              </a>
            </div>
            <div className="footer_field footer_animate_in footer_fade">
              <h4 className="footer_label main_label">Address</h4>
              <a
                {...focusLink()}
                className="footer_link hightlight_hover"
                href="https://www.google.ca/maps/place/3009+23+St+NE,+Calgary,+AB+T2E+8Z5/@51.0792407,-114.0075074,17z/data=!3m1!4b1!4m5!3m4!1s0x537164e0a0f29c39:0xf77883216d6e5750!8m2!3d51.0792374!4d-114.0053187"
              >
                3009 - 23 st N.E. Calgary, AB T2E 7A4
              </a>
            </div>
          </div>
        </div>{" "}
      </div>
    </footer>
  )
}

export default cursorContextWrapper(Footer)
