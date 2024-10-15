'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { paymentSchema } from '../lib/schemas'
import { validateExpiryDate, formatExpiryDate, formatCardNumber } from "../lib/formUtils"

export default function Step3({ onNext, initialData }) {
  const form = useForm({
    resolver: zodResolver(paymentSchema),
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
                    let value = formatExpiryDate(e.target.value)
                    field.onChange(value)
                    if (value.length === 5 && !validateExpiryDate(value)) {
                      form.setError('expiryDate', {
                        type: 'manual',
                        message: 'Expiry date must be in the future'
                      })
                    } else {
                      form.clearErrors('expiryDate')
                    }
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