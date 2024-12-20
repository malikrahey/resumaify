"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
}

function SignIn() {

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: FormValues = form.getValues()
    const resposne = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (resposne.ok) {
      router.push('/builder/personal')
    }
  }

  return (
    <main className='flex flex-row col-span-2 h-screen'>
      <div className='bg-gray-500 h-full w-full'>

      </div>
      <div className='w-full h-full flex items-center justify-center'>
      <Card className='h-[26rem] w-[26rem] justify-center'>
        <CardHeader>
          <CardTitle className='w-full text-center'>
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 items-center justify-center'>
          <Form {...form}>
            <form className='flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit}>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardContent className='justify-center w-full flex'>
          <Link className='text-xs' href='/register'>Or Create Account</Link>
        </CardContent>
      </Card>
    </div>
    </main>
    
  )
}

export default SignIn