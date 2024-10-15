import { z } from 'zod'

export const locationSchema = z.object({
    country: z.string().min(1, 'Please select a country'),
    city: z.string().min(1, 'Please select a city'),
})

const phoneNumberSchema = z.string().refine(
    (value) => value === '' || /^\d{10}$/.test(value),
    {
        message: 'Phone number must be empty or contain exactly 10 digits',
    }
);

const currentDate = new Date()
const currentYear = currentDate.getFullYear() % 100
const currentMonth = currentDate.getMonth() + 1
  
export const personalInfoSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: phoneNumberSchema.optional(),
})

export const paymentSchema = z.object({
    cardNumber: z.string().regex(/^(\d{4}\s?){4}$/, 'Invalid card number'),
    expiryDate: z.string()
        .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)')
        .refine((value) => {
            const [month, year] = value.split('/').map(Number)
            const expYear = year + 2000
            if (expYear < currentDate.getFullYear()) return false
            if (expYear === currentDate.getFullYear() && month < currentMonth) return false
            return true
        }, 'Expiry date must be in the future'),
    cvv: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
    billingAddress: z.string().min(5, 'Billing address is required'),
})