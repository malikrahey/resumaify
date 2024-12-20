import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { DatePicker } from '../ui/DatePicker'
import { Textarea } from '../ui/textarea'
import XButton from '../custom-ui/XButton'
import MonthYearPicker from '../ui/MonthYearPicker'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'

interface ExperienceCardProps {
  experience: Experience,
  index: number,
  handleRemove: () => void,
}

type ExperienceForm = {
  company: string | undefined,
  title: string | undefined,
  location: string | undefined,
  start_date: string | undefined,
  end_date: string | undefined,
  description: string | undefined,
}

function ExperienceCard({experience, index, handleRemove}: ExperienceCardProps) {

  const form = useForm({
    defaultValues: {
      company: experience?.company,
      title: experience?.title,
      location: experience?.location,
      start_date: experience?.start_date,
      end_date: experience?.end_date,
      description: experience?.description,
    }
  });

  const handleSave = (values: ExperienceForm) => {
    
    const experienceToSave = {
      ...experience,
      ...values
    }
    console.log(experience)
    console.log(experienceToSave)
     fetch('/api/experience', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceToSave),
    });
  }

  return (
    <Card className='shadow-md'>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>
          Experience {index + 1}
        </CardTitle>
        <XButton onClick={handleRemove} />
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className='gap-4 flex flex-col'>
          
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Company' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Title' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Location' />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex flex-row justify-evenly'>
          <FormField
            control={form.control}
            name='start_date'
            render={({ field }) => (
              <FormItem className='space-x-2'>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <MonthYearPicker {...field} onChange={(name, value) => form.setValue(name as FormDateLabel, value)} placeholder='Start Date' />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name='end_date'
            render={({ field }) => (
              <FormItem className='space-x-2'>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <MonthYearPicker {...field} onChange={(name, value) => form.setValue(name as FormDateLabel, value)} placeholder='End Date' />
                </FormControl>
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder='Description' />
                </FormControl>
              </FormItem>
            )}
            />
            
          <Button type='submit' className='w-full'>Save</Button>
        </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ExperienceCard