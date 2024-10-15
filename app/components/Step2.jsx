'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useFetcher } from '@remix-run/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const schema = z.object({
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(1, 'Please select a city'),
})

export async function loader() {
    console.log(process.env.GEODB_KEY);
}

export default function Step2({ onNext, initialData, countries }) {
    const fetcher = useFetcher();
  //const [cities, setCities] = useState([])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: initialData?.country || '',
      city: initialData?.city || '',
    },
  })

  useEffect(() => {
    if (initialData?.country) {
      handleCountryChange(initialData.country, false);
    }
  }, [initialData])

  const onSubmit = (data) => {
    onNext(data)
  }

  const handleCountryChange = (value, resetCity = true) => {
    form.setValue('country', value)
    if(resetCity){
      form.setValue('city', '')
    }
    const selectedCountry = countries.find(country => country.name === value);
    if (selectedCountry) {
      fetcher.load(`/api/cities?countryCode=${selectedCountry.code}`);
    }
  }

  const cities = fetcher.data?.cities || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={handleCountryChange} defaultValue={field.value}>
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
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.code} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  )
}