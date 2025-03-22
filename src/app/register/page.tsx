"use client";

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner';

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

function Register() {

  const form = useForm  ({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data: FormValues = form.getValues()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    setIsLoading(false);
  }
  return (
    <main className='flex flex-row col-span-2 h-screen'>
      <div className='bg-gray-500 h-full w-full relative'>
        <div className=' w-full h-full blur-sm ' style={{backgroundImage: 'url(/resumes.png)'}}></div>
        <div className='flex flex-col items-center justify-center z-10 absolute top-0 left-0 w-full h-full'>
          <div className='bg-white rounded-lg p-4'>
            <h1 className='text-center text-4xl font-bold'>Resum<span className='text-red-500'>ai</span>fy</h1>
            <h2>AI tailored resumes for each posting made easy</h2>
          </div>
          
        </div>

      </div>
      <div className='w-full h-full flex items-center justify-center bg-neutral-200'>
      <Card className='w-[26rem] justify-center items-center'>
        <CardHeader>
          <CardTitle className='w-full text-center'>
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 items-center justify-center'>
          <Form {...form}>
            <form className='flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type='text' placeholder="name" {...field} />
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
                        <Input type='email' placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="confirm password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <div className='flex m-auto justify-center'>
                    <ThreeDots width={50} height={50} color='#00B87C' />
                  </div>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
            </form>
          </Form>
          <div className='w-full flex justify-center'>
            <Link className='text-xs text-center w-full' href='/sign-in'>Or Sign In</Link>
          </div> 
        </CardContent>
      </Card>
    </div>
    </main>
    
  )
}

export default Register