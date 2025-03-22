"use client";

import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchProjects, selectIsProjectLoading, selectProjects } from '@/lib/features/projectSlice';
import { useAppDispatch } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

function Projects() {

  const projects = useSelector(selectProjects);
  const isLoading = useSelector(selectIsProjectLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAddProject = async () => {
    const project = {
      title: '',
      description: '',
      url: '',
    };
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    const data = await response.json();
  }

  const handleRemoveProject = (index: number) => {
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {isLoading ? (
          <div className='flex m-auto justify-center'>
            <ThreeDots width={50} height={50} color='#00B87C' />
          </div>
          
        ) : (
          <>
            {projects.map((project, i) => (
              <ProjectCard handleRemove={(i) => handleRemoveProject(i)} key={project.id} index={i} project={project} />
            ))}
        </>
      )}
        <div>
          <Button onClick={handleAddProject}>Add Project</Button>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default Projects