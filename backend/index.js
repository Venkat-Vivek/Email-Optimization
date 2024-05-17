// import express from "express";
const express = require("express");
// // import  {MongoClient} from 'mongodb';

// import cors from 'cors';
const cors = require("cors");

// // // Enable CORS for all routes
const app = express();
app.use(cors());

// const port = 3001;


// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer")

// // // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com', // Replace with your SMTP server host
//   port: 587, // Replace with your SMTP server port
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'venkatviveksimhadri@gmail.com', // Replace with your email
//     pass: 'tqztjckuykvgmvrq', // Replace with your password
//   }
// });

// // Tracking pixel URL
// const trackingPixelUrl = 'https://email-optimization.vercel.app/tracking-pixel'; // Replace with your actual tracking pixel URL

// // Function to send email
//  const sendEmail = (recipientEmail, subject, content) => {
//   console.log("I am send Email Fuction")
//   // console.log(recipientEmail)
//   // console.log(subject)
//   // console.log(content)
//   const mailOptions = {
//     from: 'venkatviveksimhadri@gmail.com', // Replace with your email
//     to: recipientEmail,
//     subject: subject,
//     html: `
//       <p>${content}</p>
//       <img src=${trackingPixelUrl} alt="pixel" style="width:1px;height:1px;" />
//     `,
//   };

//    transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return error;
//     } else {
//       console.log('Email sent: %s', info.response);
//       return info.response;
//     }
//   });
// }

// app.get('/tracking-pixel', async (req, res) => {
//   console.log("+1");
//   const recipientEmail='simhadrivenkatvivek@gmail.com'
// const subject='hi'
// const content='hello'
// // sendEmail(recipientEmail, subject, content)
// sendEmail(recipientEmail, subject, content)
//   res.send({mail:recipientEmail}); 
//   // res.sendStatus(200); // Send a successful response (transparent image)
// });

// // const trackingPixelUrl = 'http://localhost:3001/tracking-pixel'; // Replace with your actual tracking pixel URL
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// const app = express();
// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(cors());

const port = 3001;

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'venkatviveksimhadri@gmail.com', // Replace with your email
    pass: 'tqztjckuykvgmvrq', // Replace with your password
  }
});

// Tracking pixel URL
const trackingPixelUrl = 'https://email-optimization.vercel.app/tracking-pixel';

// Function to send email
const sendEmail = (recipientEmail, subject, content) => {
  console.log("Sending Email...");
  const mailOptions = {
    from: 'venkatviveksimhadri@gmail.com', // Replace with your email
    to: recipientEmail,
    subject: subject,
    html: `
      <p>${content}</p>
      <img src="${trackingPixelUrl}" alt="pixel" style="width:1px;height:1px;" />
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info.response);
      }
    });
  });
};

// Example email details


// // Endpoint to serve the tracking pixel
// app.get('/tracking-pixel', (req, res) => {
//   console.log("+1");
//   res.sendStatus(200); // Send a successful response
// });

app.get('/tracking-pixel', (req, res) =>{
  console.log("+1");
  res.send({hi:"name"})
  const pixelPath = path.join(backend, 'pixel.png');
  fs.readFile(pixelPath, (err, data) => {
    if (err) {
      console.error('Error reading pixel file:', err);
      res.sendStatus(500);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': data.length
    });
    res.end(data);
  });
});

// Endpoint to trigger email sending
app.get('/send-email', async (req, res) => {
  try {
    const recipientEmail = '21131a05n8@gvpce.ac.in';
const subject = 'hi';
const content = 'hello';
    console.log("Sending email to:", recipientEmail);
    const response = await sendEmail(recipientEmail, subject, content);
    res.send({ mail: recipientEmail, response });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

