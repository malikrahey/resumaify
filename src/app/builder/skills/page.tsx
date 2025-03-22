"use client"

import SkillEntryBox from '@/components/skills/SkillEntryBox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader,CardTitle } from '@/components/ui/card'
import { apiInstance } from '@/utils/apiInstance'
import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Skills() {

  const [skills, setSkills] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);


  useEffect(() => {
    setIsLoading(true);
    const fetchSkills = async () => {

      const response = await apiInstance('/skills');
      const data = await response.data.content;
      setSkills(data.skills);
      setIsLoading(false);
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
        {isLoading ? (
          <div className='flex m-auto justify-center'>
            <ThreeDots width={50} height={50} color='#00B87C' />
          </div>
        ) : (
          <SkillEntryBox skills={skills} setSkills={setSkills} />
        )}
        <Button onClick={handleSave}>Save</Button> 
      </CardContent>
    </Card>
  )
}

export default Skills