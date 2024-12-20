import React from 'react'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import MonthYearPicker from '../ui/MonthYearPicker'
import { DatePicker } from '../ui/DatePicker'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { fetchEducation, selectEducation, updateSingleEducation } from '@/lib/features/educationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import XButton from '../custom-ui/XButton'

type EducationEntryProps = {
  entry: any
  removeEntry: (id: string) => void
}

export default function EducationEntry({entry, removeEntry }: EducationEntryProps) {


  const form = useForm({
    defaultValues: {
      ...entry,
      startDate: entry.start_date,
      endDate: entry.end_date,
    }
  });

  const handleSubmit = async (values: Education) => {
    const body = {
      ...values,
      id: entry.id
    }
    fetch(`/api/education`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
  }

  return (
    <Card className=''>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle className='text-lg font-medium'>Education Entry</CardTitle>
        <XButton onClick={() => removeEntry(entry.id)} />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>

            <FormField
              control={form.control}
              name='school'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your school" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='degree'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your degree" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your field of study" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex flex-row gap-4'>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <MonthYearPicker {...field} onChange={(name, value) => form.setValue(name as FormDateLabel, value)}placeholder="Enter your start date" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <MonthYearPicker {...field} onChange={(name, value) => form.setValue(name as FormDateLabel, value)} placeholder="Enter your end date" />
                  </FormControl>
                </FormItem>
              )}
            />
            </div>
            
            <FormField
              control={form.control}
              name='grade'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your grade" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full'>
              Save
            </Button>
          </form>
        </Form>
    </CardContent>
    </Card>
  )
}
