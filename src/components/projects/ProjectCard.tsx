"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import XButton from '../custom-ui/XButton'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'

interface ProjectCardProps {
  index: number,
  project?: Project,
  handleRemove?: (index: number) => void,
}

type ProjectFormValues = {
  title: string | undefined,
  description: string | undefined,
  url: string | undefined,
}

function ProjectCard({index, project, handleRemove}: ProjectCardProps) {

  const form = useForm({
    defaultValues: {
      title: project?.title,
      description: project?.description,
      url: project?.url,
    }
  });

  const handleSubmit = (values: ProjectFormValues) => {
    const projectToSave = {
      ...project,
      ...values
    }
    fetch('/api/projects', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectToSave),
    });
  }

  return (
    <Card>
      <CardHeader className='flex justify-between w-full flex-row'>
        <CardTitle>Project {index + 1}</CardTitle>
        <XButton onClick={() => handleRemove?.(index)} />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='gap-4 flex flex-col'>
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
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='URL' />
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

export default ProjectCard