'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {personalInfoSchema, locationSchema, paymentSchema} from "../lib/schemas"
import { validateExpiryDate, formatExpiryDate, formatCardNumber } from "../lib/formUtils"

export default function Summary({ formData, onUpdate, countries }) {
  const [editMode, setEditMode] = useState({
    personalInfo: false,
    location: false,
    payment: false,
  })

  const personalInfoForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
  })

  const locationForm = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: formData.country,
      city: formData.city,
    },
  })

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: formData.cardNumber,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv,
      billingAddress: formData.billingAddress,
    },
  })

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true })
  }

  const handleSave = (section, data) => {
    onUpdate({ ...formData, ...data })
    setEditMode({ ...editMode, [section]: false })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Personal Information
            {!editMode.personalInfo && (
              <Button onClick={() => handleEdit('personalInfo')}>Edit</Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editMode.personalInfo ? (
            <Form {...personalInfoForm}>
              <form onSubmit={personalInfoForm.handleSubmit((data) => handleSave('personalInfo', data))} className="space-y-4">
                <FormField
                  control={personalInfoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          ) : (
            <>
              <p>First Name: {formData.firstName}</p>
              <p>Last Name: {formData.lastName}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone || 'Not provided'}</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Location
            {/* {!editMode.location && (
              <Button onClick={() => handleEdit('location')}>Edit</Button>
            )} */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editMode.location ? (
            <Form {...locationForm}>
              <form onSubmit={locationForm.handleSubmit((data) => handleSave('location', data))} className="space-y-4">
                <FormField
                  control={locationForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={locationForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          ) : (
            <>
              <p>Country: {formData.country}</p>
              <p>City: {formData.city}</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Payment Details
            {!editMode.payment && (
              <Button onClick={() => handleEdit('payment')}>Edit</Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editMode.payment ? (
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit((data) => handleSave('payment', data))} className="space-y-4">
                <FormField
                  control={paymentForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="1234 5678 9012 3456"
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
                  control={paymentForm.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) => {
                            let value = formatExpiryDate(e.target.value)
                            field.onChange(value)
                            if (value.length === 5 && !validateExpiryDate(value)) {
                              paymentForm.setError('expiryDate', {
                                type: 'manual',
                                message: 'Expiry date must be in the future'
                              })
                            } else {
                              paymentForm.clearErrors('expiryDate')
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
                  control={paymentForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123"
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
                  control={paymentForm.control}
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
                <Button type="submit">Save</Button>
              </form>
            </Form>
          ) : (
            <>
              <p>Card Number: **** **** **** {formData.cardNumber.slice(-4)}</p>
              <p>Expiry Date: {formData.expiryDate}</p>
              <p>Billing Address: {formData.billingAddress}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}