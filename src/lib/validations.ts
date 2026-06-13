import { z } from 'zod'

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  message: z.string().optional(),
})

export const projectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  description: z.string().min(50, 'Please provide at least 50 characters describing your project'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(20, 'Please provide at least 20 characters'),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type ContactFormData = z.infer<typeof contactSchema>
