import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

export async function sendEmail({ to, userName }) {
  try {
    const info = await transporter.sendMail({
        from: '"Srijan2k25" <no-reply@srijan2k25.com>',
        to: to, // Send to the recipient's email
        subject: "You're Invited to Srijan Fest!",
        text: `Dear ${userName},

We are thrilled to invite you to **Srijan**, an exciting fest that celebrates creativity, innovation, and fun! Join us for a series of engaging events, workshops, and performances that will spark your imagination and inspire you to unleash your potential.

**Event Details**:
- **Date**: [29/01/2025]
- **Location**: [Amber Ground]
- **Time**: [20:00]

Come together with like-minded individuals, participate in exciting competitions, and enjoy the atmosphere of camaraderie. Don’t miss out on this opportunity to be a part of something amazing!

Please RSVP by [29/01/2025]. We look forward to seeing you at Srijan and making unforgettable memories!

Best regards,
The Srijan Fest Team
`,
        html: `<p>Dear ${userName},</p>
        <p>We are thrilled to invite you to <strong>Srijan</strong>, an exciting fest that celebrates creativity, innovation, and fun! Join us for a series of engaging events, workshops, and performances that will spark your imagination and inspire you to unleash your potential.</p>
        <h3>Event Details:</h3>
        <ul>
          <li><strong>Date:</strong> 29/01/2025</li>
          <li><strong>Location:</strong> Amber Ground</li>
          <li><strong>Time:</strong> 20:00</li>
        </ul>
        
        <div style="border: 2px solid #007BFF; padding: 20px; width: 70%; margin: 20px auto; background-color: #f8f9fa; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4 style="text-align: center; color: #007BFF;">You're Invited!</h4>
          <p style="text-align: center;">Come together with like-minded individuals, participate in exciting competitions, and enjoy the atmosphere of camaraderie. Don’t miss out on this opportunity to be a part of something amazing!</p>
          <p style="text-align: center;">Please RSVP by <strong>29/01/2025</strong>. We look forward to seeing you at Srijan and making unforgettable memories!</p>
        </div>
        
        <p>Best regards,<br>The Srijan Fest Team</p>`,
      });
      console.log("Invitation Sent!");
      console.log(info);
  } catch (error) {
    console.log(error);
  }
}

