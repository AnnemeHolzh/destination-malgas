"use server"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    const subject = formData.get('subject')
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anneme.holzh@gmail.com',
      subject: `New Contact Form: ${subject}`,
      text: `
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Phone: ${formData.get('phone')}
        Subject: ${subject}
        Message: ${formData.get('message')}
      `,
    });

    return { success: true, message: "Email sent successfully!" };
} catch (err) {
    console.error('Email send error:', err);
    return { success: false, message: "Failed to send email. Please try again." };
  }
}