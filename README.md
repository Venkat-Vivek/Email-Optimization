# A/B Test Email Optimization

This project is a web application for conducting A/B tests to optimize email content. It includes a form where users can input two sets of email subject lines and content. The application then sends these emails to two groups of recipients and tracks their engagement to analyze which email performs better.

## Features

- **Form Submission:** Users can submit two sets of email subject lines and content through a form.
- **Email Sending:** The application sends the submitted emails to two groups of recipients using nodemailer.
- **Tracking:** Each email includes a tracking pixel that records when the recipient opens the email.
- **Analysis:** Users can view the analysis of the A/B test results in the form of a pie chart, showing the distribution of opens between the two email variants.
- **Reset:** Users can reset the experiment data to conduct a new A/B test.

## Technologies Used

- **Frontend:** Built with React.js for the user interface.
- **Backend:** Implemented using Express.js for handling HTTP requests and nodemailer for sending emails.
- **Data Visualization:** Utilizes a custom PieChart component for visualizing experiment data.
- **Deployment:** Hosted on Vercel for the frontend and a self-hosted server for the backend.

## Usage

1. Fill out the form with two sets of email subject lines and content.
2. Submit the form to send the emails to the recipients.
3. Click the "Get Analysis" button to view the A/B test results.
4. Use the "Reset" button to clear the experiment data and conduct a new test.
