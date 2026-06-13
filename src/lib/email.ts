import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null
const ADMIN_EMAIL = 'Arushhh.work@gmail.com'
const FROM_EMAIL = 'notifications@marutisolutions.in'

export async function sendAppointmentEmail(data: {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
}) {
  if (!resend) return
  // Notify admin
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Appointment: ${data.service} — ${data.name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #030712; color: #fff; padding: 40px; border-radius: 12px;">
        <div style="border-bottom: 2px solid #FF7A00; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #FF7A00; font-size: 24px; margin: 0;">New Appointment Request</h1>
          <p style="color: #9CA3AF; margin: 4px 0 0;">Maruti Solutions</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #9CA3AF; width: 120px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Email</td><td style="padding: 8px 0; color: #fff;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Phone</td><td style="padding: 8px 0; color: #fff;">${data.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Service</td><td style="padding: 8px 0; color: #FF7A00; font-weight: 600;">${data.service}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Date</td><td style="padding: 8px 0; color: #fff;">${data.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Time</td><td style="padding: 8px 0; color: #fff;">${data.time}</td></tr>
          ${data.message ? `<tr><td style="padding: 8px 0; color: #9CA3AF; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #fff;">${data.message}</td></tr>` : ''}
        </table>
      </div>
    `,
  })
}

export async function sendProjectEmail(data: {
  name: string
  email: string
  service: string
  description: string
}) {
  if (!resend) return
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Project Submission: ${data.service} — ${data.name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #030712; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #FF7A00; font-size: 24px; margin: 0 0 24px;">New Project Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Description:</strong></p>
        <p style="color: #9CA3AF;">${data.description}</p>
      </div>
    `,
  })

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `Project Received — Maruti Solutions`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #030712; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #fff; font-size: 24px; margin: 0 0 16px;">We've received your project brief.</h1>
        <p style="color: #9CA3AF; line-height: 1.7;">Hi ${data.name},</p>
        <p style="color: #9CA3AF; line-height: 1.7;">Your project submission for <strong style="color: #FF7A00;">${data.service}</strong> has been received. Our team will review your brief and reach out within 48 hours to discuss next steps.</p>
        <p style="color: #9CA3AF; margin-top: 32px;">— Arush Prakash<br><span style="color: #666;">Founder, Maruti Solutions</span></p>
      </div>
    `,
  })
}

export async function sendLeadEmail(data: {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}) {
  if (!resend) return
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${data.name}${data.company ? ` — ${data.company}` : ''}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #030712; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #FF7A00; font-size: 24px; margin: 0 0 24px;">New Contact Enquiry</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="color: #9CA3AF; background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px;">${data.message}</p>
      </div>
    `,
  })
}
