'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Summary from './Summary'
import { setFormData, getFormData } from '../lib/localStorageUtil'
import { useNavigate } from '@remix-run/react'

const steps = ['Personal Information', 'Location', 'Payment Details', 'Summary']

export default function MultiStepForm({ countries }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormDataState] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const storedData = getFormData();
    if (storedData) {
      setFormDataState(storedData);
    }
  }, []);

  const handleNext = (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormDataState(updatedFormData)
    setFormData(updatedFormData);
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleStartOver = () => {
    setFormDataState({});
    setCurrentStep(0);
    navigate('/');
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 onNext={handleNext} initialData={formData} />
      case 1:
        return <Step2 onNext={handleNext} initialData={formData} countries={countries} />
      case 2:
        return <Step3 onNext={handleNext} initialData={formData} />
      case 3:
        return <Summary formData={formData} 
          onUpdate={(newData) => setFormDataState(newData)}
          countries={countries} 
        />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep]}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 0 && currentStep < 3 && (
          <Button onClick={handlePrevious}>Previous</Button>
        )}
        {currentStep === 3 && (
          <Button onClick={handleStartOver}>Start Over</Button>
        )}
      </CardFooter>
    </Card>
  )
}