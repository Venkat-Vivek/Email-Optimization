// import express from "express";
const express = require("express");
// import  {MongoClient} from 'mongodb';

// import cors from 'cors';
const cors = require("cors");

// // Enable CORS for all routes
const app = express();
app.use(cors());

const port = 3001;


// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer")

// // Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'venkatviveksimhadri@gmail.com', // Replace with your email
    pass: 'tqztjckuykvgmvrq', // Replace with your password
  }
});

// Tracking pixel URL
const trackingPixelUrl = 'http://localhost:3001/tracking-pixel'; // Replace with your actual tracking pixel URL

// Function to send email
function sendEmail(recipientEmail, subject, content) {
  const mailOptions = {
    from: 'venkatviveksimhadri@gmail.com', // Replace with your email
    to: recipientEmail,
    subject: subject,
    html: `
      <p>${content}</p>
      <img src=${trackingPixelUrl} alt="pixel" style="width:1px;height:1px;" />
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: %s', info.response);
    }
  });
}
const recipientEmail='21131a05n8@gvpce.ac.in'
const subject='hi'
const content='hello'
sendEmail(recipientEmail, subject, content)

app.get('/tracking-pixel', (req, res) => {
  console.log("+1");
  res.sendFile('backend/assets/tracking-pixel.png'); 
  // res.sendStatus(200); // Send a successful response (transparent image)
});

// const trackingPixelUrl = 'http://localhost:3001/tracking-pixel'; // Replace with your actual tracking pixel URL
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});