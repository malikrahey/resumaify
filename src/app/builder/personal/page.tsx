"use client";

import EducationCard from '@/components/personal/EducationCard';
import PersonalLinks from '@/components/personal/PersonalLinks';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import InputWithIcon from '@/components/ui/InputWithIcon';
import { fetchPersonalInfo, selectIsPersonalLoading, selectPersonalInfo } from '@/lib/features/personalSlice';
import { AppDispatch } from '@/lib/store';
import { Label } from '@radix-ui/react-label';
import { Building2Icon, MailIcon, PersonStandingIcon, PhoneIcon, PlusCircle, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

type PersonalInfoForm = {
  name: string;
  phone: string;
  location: string;
  email: string;
  links: string[];
}

function Personal() {

  const personalInfo = useSelector(selectPersonalInfo);
  const isLoading = useSelector(selectIsPersonalLoading);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    defaultValues: {
      name: personalInfo.name,
      phone: personalInfo.phone,
      location: personalInfo.location,
      email: personalInfo.email,
      links: personalInfo.links
    }
  });

  useEffect(() => {
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  useEffect(() => {
    form.reset(personalInfo);
  }, [form, personalInfo]);
  

  const savePersonalInfo = async (values: PersonalInfoForm) => {
    const response = await fetch('/api/personal', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const data = await response.json()
  }

  return (
    <div className="flex flex-col gap-4">
    {isLoading ? (
      <div className='flex m-auto justify-center'>
        <ThreeDots width={50} height={50} color='#00B87C' />
      </div>
      
    ) : (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(savePersonalInfo)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <InputWithIcon
                    icon={<PersonStandingIcon className="h-5 w-5" />}
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <InputWithIcon
                    icon={<PhoneIcon className="h-5 w-5" />}
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <InputWithIcon
                    icon={<Building2Icon className="h-5 w-5" />}
                    placeholder="Enter your city"
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <InputWithIcon
                    icon={<MailIcon className="h-5 w-5" />}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="links"
              render={({ field }) => (
                <PersonalLinks
                  value={field.value}
                  defaultValue={field.value}
                  handleChange={field.onChange}
                />
              )}
            />
            <Button type="submit" className="w-full mt-4">Save</Button>
          </form>
        </Form>
        
      </CardContent>
    </Card>
    )}
    <EducationCard />
    </div>
  )
}

export default Personal