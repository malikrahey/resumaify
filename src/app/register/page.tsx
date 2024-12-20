"use client";

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const data: FormValues = form.getValues()
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log(data)
  }
  return (
    <main className='flex flex-row col-span-2 h-screen'>
      <div className='bg-gray-500 h-full w-full'>

      </div>
      <div className='w-full h-full flex items-center justify-center'>
      <Card className='h-[26rem] w-[26rem] justify-center'>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardContent className='justify-center w-full flex'>
          <Link className='text-xs' href='/sign-in'>Or Sign In</Link>
        </CardContent>
      </Card>
    </div>
    </main>
    
  )
}

export default Register