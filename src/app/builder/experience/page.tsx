"use client"

import ExperienceCard from '@/components/experience/ExperienceCard'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { fetchExperiences, postExperience, removeExperience, selectExperiences, selectIsExperienceLoading } from '@/lib/features/experienceSlice';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

function ExperiencePage() {
  
  const experiences = useSelector(selectExperiences);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsExperienceLoading);


  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const handleAddExperience = async () => {
    dispatch(postExperience());
  }

  const handleRemoveExperience = async (id: string) => {
    // const response = await fetch(`/api/experience/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await response.json();
    // setExperiences(experiences.filter(experience => experience.id !== id));
    // return data;

    dispatch(removeExperience(id));
  }

  return (
      <Card className='flex flex-col gap-4 p-6'>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
          <CardDescription>Add your experiences here</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex m-auto justify-center'>
              <ThreeDots width={50} height={50} color='#00B87C' />
            </div>
            
          ) : (
          <div className='flex flex-col gap-4'>
            {experiences?.map((experience, i) => (
              <ExperienceCard experience={experience} key={i} index={i} handleRemove={() => handleRemoveExperience(experience.id)} />
            ))}
            <div className='flex justify-end w-full'>
              <Button onClick={handleAddExperience}>Add New Experience</Button>
            </div>
          </div>
        )}
        </CardContent>
      
      </Card>
  )
}

export default ExperiencePage