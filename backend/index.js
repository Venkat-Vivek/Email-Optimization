// import express from "express";
const express = require("express");
// // import  {MongoClient} from 'mongodb';

// import cors from 'cors';
const cors = require("cors");
const bodyParser = require('body-parser');

// // // Enable CORS for all routes
const app = express();

app.use(cors());

// const port = 3001;
app.use(bodyParser.json());


// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");
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
const trackingPixelUrl = 'https://email-optimization.vercel.app/tracking-pixel/';

// Function to send email
const sendEmail = (recipientEmail, subject, content) => {
  console.log("Sending Email...");
  const mailOptions = {
    from: 'venkatviveksimhadri@gmail.com', // Replace with your email
    to: recipientEmail,
    subject: subject,
    html: `
      <p>${content}</p>
      <img src="${trackingPixelUrl}+${recipientEmail}" alt="pixel" style="width:1px;height:1px;" />
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

let ans=0;
app.get('/tracking-pixel/:name', (req, res) => {
  // Create a 1x1 transparent pixel (white)
  ans=ans+1;
  const pixelBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

  // Set appropriate headers
  res.set('Content-Type', 'image/gif'); // You can use 'image/png' if you prefer PNG format
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  // Send the pixel
  res.send(pixelBuffer);
});

// Endpoint to trigger email sending
app.post('/send-email', async (req, res) => {
  try {
    const { subject1, content1, subject2, content2 } = req.body;
    const  recipientEmail1= [
      '21131a05n8@gvpce.ac.in',
      'simhadrivenkatvivek@gmail.com']
      const  recipientEmail2= [
        'ramyarani0214@gmail.com',
        'venkatviveksimhadri@gmail.com']
// const subject = 'hi';
// const content = 'hello';
//     console.log("Sending email to:", recipientEmail);
    const response1 = await sendEmail(recipientEmail1, subject1, content1);
    const response2 = await sendEmail(recipientEmail2, subject2, content2);
    res.send({ response1, response2 });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.get('/call',(req,res)=>{
  console.log(ans);
  ans=ans+1;
  res.send({count:ans})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

