import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

// Configure AWS SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to send email
async function sendEmail() {
  const params = {
    Source: "noreply@circulodeprogramadores.site", // Replace with verified SES email
    Destination: {
      ToAddresses: ["noreply@circulodeprogramadores.site"], // Replace with recipient email
    },
    Message: {
      Subject: { Data: "Test Email from AWS SES" },
      Body: {
        Text: { Data: "Hello, this is a test email from AWS SES using Node.js." },
      },
    },
  };

  try {
    const response = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Execute function
sendEmail();
