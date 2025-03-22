"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner';

type FormValues = {
  email: string
  password: string
}

function SignIn() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
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
      <Card className='h-[26rem] w-[26rem] justify-center shadow-md'>
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
                {isLoading ? (
                  <div className='flex m-auto justify-center'>
                    <ThreeDots width={50} height={50} color='#00B87C' />
                  </div>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
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