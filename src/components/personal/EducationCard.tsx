'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { addEducation, deleteEducation, fetchEducation, selectEducation, updateSingleEducation } from '@/lib/features/educationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import EducationEntry from './EducationEntry'

interface EducationEntry {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  grade: string;
  activities: string;
  description: string;
}


export default function EducationCard() {
  const educationEntries = useSelector(selectEducation) || [];
  console.log("educationEntries", educationEntries);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEducation())
  }, [dispatch])

  const removeEntry = (id: string) => {
    dispatch(deleteEducation(id));
  }

  const addEntry = () => {
    dispatch(addEducation({school:""}))
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Education Information</CardTitle>
      </CardHeader>
      <CardContent>

        <div className='flex flex-col gap-4'>
        {educationEntries.map((entry) => (
          <EducationEntry key={entry.id} entry={entry} removeEntry={removeEntry} />
        ))}
  
        </div>
        
      <CardFooter>
        <Button onClick={addEntry}> Add Education Entry </Button>
      </CardFooter>
      </CardContent>
    </div>
  )
}