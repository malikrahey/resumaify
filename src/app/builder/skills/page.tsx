"use client"

import SkillEntryBox from '@/components/skills/SkillEntryBox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card'
import { apiInstance } from '@/utils/apiInstance'
import React, { useEffect } from 'react'

function Skills() {

  const [skills, setSkills] = React.useState<string[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await apiInstance('/skills');
      const data = await response.data.content;
      setSkills(data.skills);
    };

    fetchSkills();
  }, []);

  const handleSave = async () => {
    const response = await apiInstance.put('/skills', { skills });
    if (response.status !== 500) {
      console.log('Skills saved successfully');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 items-center'>
        <SkillEntryBox skills={skills} setSkills={setSkills} />
        <Button onClick={handleSave}>Save</Button> 
      </CardContent>
    </Card>
  )
}

export default Skills