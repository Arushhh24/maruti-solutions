import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export const services = [
  { value: 'financial-consulting', label: 'Financial Consulting' },
  { value: 'marketing-solutions', label: 'Marketing Solutions' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'vfx-services', label: 'VFX Services' },
]

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

export const budgetRanges = [
  { value: 'under-25k', label: 'Under ₹25,000' },
  { value: '25k-50k', label: '₹25,000 – ₹50,000' },
  { value: '50k-1l', label: '₹50,000 – ₹1,00,000' },
  { value: '1l-3l', label: '₹1,00,000 – ₹3,00,000' },
  { value: 'above-3l', label: 'Above ₹3,00,000' },
  { value: 'discuss', label: 'Prefer to Discuss' },
]

export const timelines = [
  { value: '1-week', label: '1 Week' },
  { value: '2-weeks', label: '2 Weeks' },
  { value: '1-month', label: '1 Month' },
  { value: '2-months', label: '2 Months' },
  { value: '3-months', label: '3+ Months' },
  { value: 'flexible', label: 'Flexible' },
]
