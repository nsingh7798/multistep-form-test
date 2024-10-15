'use client'

import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { personalInfoSchema } from '../lib/schemas'

export default function Step1({ onNext, initialData }) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
    },
  })

  useEffect(() => {
    if (initialData?.firstName) {
      form.reset({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
      })
    }
  }, [initialData])

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const submitButtonRef = useRef(null)

  const onSubmit = (data) => {
    onNext(data)
  }

  const handleKeyDown = (event, nextRef) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const currentValue = event.target.value
      const currentId = event.target.id

      if (currentValue.trim() === '' && nextRef) {
        return // Don't move to next field if current field is empty
      }

      if (nextRef) {
        nextRef.current.focus()
      } else {
        // All fields are filled, submit the form
        const allFieldsFilled = ['firstName', 'lastName', 'email'].every(
          field => form.getValues(field).trim() !== ''
        )
        console.log("allFieldsFilled", allFieldsFilled)
        if (allFieldsFilled) {
          submitButtonRef.current.click()
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={firstNameRef}
                  onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={lastNameRef}
                  onKeyDown={(e) => handleKeyDown(e, emailRef)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  ref={emailRef}
                  onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={phoneRef}
                  onKeyDown={(e) => handleKeyDown(e, null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" ref={submitButtonRef}>Next</Button>
      </form>
    </Form>
  )
}