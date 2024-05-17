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

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const emails = ['21131a05n8@gvpce.ac.in',
'simhadrivenkatvivek@gmail.com','ramyarani0214@gmail.com',
'venkatviveksimhadri@gmail.com']


const shuffled = shuffle(emails)

const midIndex = Math.ceil(shuffled.length / 2);
const  recipientEmail1=  shuffled.slice(0, midIndex);
const  recipientEmail2= shuffled.slice(midIndex);
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
      <img src="${trackingPixelUrl}${recipientEmail}" alt="pixel" style="width:1px;height:1px;" />
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

let ans1=0, ans2=0;
app.get('/tracking-pixel/:name', (req, res) => {
  // Create a 1x1 transparent pixel (white)
  const {name} = req.params
  if(recipientEmail1.includes(name)){
    ans1=ans1+1
  }
  else{
    ans2=ans2+1;
  }
 
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
// const subject = 'hi';
// const content = 'hello';
//     console.log("Sending email to:", recipientEmail);
console.log(recipientEmail1);
    const responses = [];
  
  // Iterate over each recipient email address
  for (const recipientEmail of recipientEmail1) {
    try {
      // Send email to the current recipient
      const response = await sendEmail(recipientEmail, subject1, content1);
      responses.push(response);
    } catch (error) {
      // Handle any errors that occur during email sending
      console.error(`Error sending email to ${recipientEmail}:`, error);
      // Optionally, you can push a placeholder value or handle the error differently
      responses.push(null);
    }
  }  
  // Iterate over each recipient email address
  for (const recipientEmail of recipientEmail2) {
    try {
      // Send email to the current recipient
      const response = await sendEmail(recipientEmail, subject2, content2);
      responses.push(response);
    } catch (error) {
      // Handle any errors that occur during email sending
      console.error(`Error sending email to ${recipientEmail}:`, error);
      // Optionally, you can push a placeholder value or handle the error differently
      responses.push(null);
    }
  }
    res.send({ responses });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.get('/call',(req,res)=>{
  res.send({exp1:ans1,exp2:ans2})
})

app.get('/call1',(req,res)=>{
  ans1 = 0;
  ans2 = 0;
  res.send({result:"success"})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

