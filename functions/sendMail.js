require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const mailgun = require("mailgun-js")

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const handler = (event, _, callback) => {
  const data = JSON.parse(event.body)

  const { name, mail, phone, msg, method, subject } = data

  const mailOptions = {
    from: `${name} <${mail}>`,
    to: "shawnsangha9@gmail.com",
    replyTo: mail,
    subject: `${subject} inquiry from contact form`,
    text: `${msg || " "}`,
  }

  const phoneOptions = {
    from: "cbrequest@albertacommercialgroup.com",
    to: "shawnsangha9@gmail.com",
    replyTo: "cbrequest@albertacommercialgroup.com",
    subject: `Callback request from ${name} - ${phone} -- ${subject}`,
    text: `${msg || " "}`,
  }

  if (!name) {
    callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: "Name is a required field" }),
    })
    return
  }
  if (method === "mail" && mail) {
    mg.messages().send(mailOptions, (error, body) => {
      if (error) {
        callback(null, {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Invalid email address check and try again",
          }),
        })
      } else {
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify(body),
        })
      }
    })
  } else if (method === "phone" && phone) {
    mg.messages().send(phoneOptions, (error, body) => {
      if (error) {
        callback(null, {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Check form inputs and try again",
          }),
        })
      } else {
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify(body),
        })
      }
    })
  } else {
    callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: "Check form inputs and try again" }),
    })
  }
}

exports.handler = handler
