const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'venkatviveksimhadri@gmail.com',
    pass: process.env.emailPassword,
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const trackingPixelUrl = 'https://email-optimization.vercel.app/tracking-pixel/';

let ans1 = 0, ans2 = 0;
let recipientEmail1 = [];
let recipientEmail2 = [];

app.get('/tracking-pixel/:name', (req, res) => {
  const { name } = req.params;
  if (recipientEmail1.includes(name)) {
    ans1++;
  } else if (recipientEmail2.includes(name)) {
    ans2++;
  }

  const pixelBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.set('Content-Type', 'image/gif');
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.send(pixelBuffer);
});

const sendEmail = (recipientEmail, subject, content) => {
  const mailOptions = {
    from: 'venkatviveksimhadri@gmail.com',
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

app.post('/send-email', async (req, res) => {
  try {
    const { subject1, content1, subject2, content2, emails } = req.body;
    const shuffled = shuffle(emails);

    const midIndex = Math.ceil(shuffled.length / 2);
    recipientEmail1 = shuffled.slice(0, midIndex);
    recipientEmail2 = shuffled.slice(midIndex);

    const responses = [];

    for (const recipientEmail of recipientEmail1) {
      try {
        const response = await sendEmail(recipientEmail, subject1, content1);
        responses.push(response);
      } catch (error) {
        console.error(`Error sending email to ${recipientEmail}:`, error);
        responses.push(null);
      }
    }

    for (const recipientEmail of recipientEmail2) {
      try {
        const response = await sendEmail(recipientEmail, subject2, content2);
        responses.push(response);
      } catch (error) {
        console.error(`Error sending email to ${recipientEmail}:`, error);
        responses.push(null);
      }
    }

    res.send({ responses });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send email' });
  }
});

app.get('/call', (req, res) => {
  res.send({ exp1: ans1, exp2: ans2 });
});

app.get('/call1', (req, res) => {
  ans1 = 0;
  ans2 = 0;
  res.send({ result: "success" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
