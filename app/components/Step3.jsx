'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

const schema = z.object({
  cardNumber: z.string().regex(/^(\d{4}\s?){4}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^[0-9]{3,4}$/, 'Invalid CVV'),
  billingAddress: z.string().min(5, 'Billing address is required'),
})

export default function Step3({ onNext, initialData }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
    },
  })

  useEffect(() => {
    if (initialData) {
        form.setValue('billingAddress', initialData.billingAddress || '');
    }
  }, [initialData, form]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const onSubmit = (data) => {
    onNext(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value)
                    field.onChange(formatted)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input {...field} 
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, '')
                    if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2)
                    }
                    field.onChange(value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.target.value.endsWith('/')) {
                      e.preventDefault()
                      field.onChange(e.target.value.slice(0, -1))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123"
                  maxLength={4}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  )
}