"use client";

import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

function Projects() {

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    }
    fetchProjects();
    setLoading(false);
  }, []);

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
    setProjects([...projects, data]);
  }

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        {projects.map((project, i) => (
          <ProjectCard handleRemove={(i) => handleRemoveProject(i)} key={project.id} index={i} project={project} />
        ))}

        <div>
          <Button onClick={handleAddProject}>Add Project</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Projects