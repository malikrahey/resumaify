"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import jsPDF from 'jspdf';



function Create() {

  const [jobDescription, setJobDescription] = useState('');

  const [resume, setResume] = useState('');
  const [buffer, setBuffer] = useState<Buffer | null>(null);
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    console.log("Creating resume...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobDescription
      }),
    })

    const data = await response.json();

    console.log(data);
    if (resumeRef.current) {
      resumeRef.current.innerHTML = data.content.text;
    }
    setBuffer(data.content.buffer.data);
  }

  const handleDownload = () => {
    
  };

  const downloadBuffer = () => {
    if (buffer) {
      console.log(buffer);
      const blob = new Blob([new Uint8Array(buffer)]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
    }
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}>

            </Textarea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex justify-between'>
            <CardTitle>
              Resume
            </CardTitle>
            <Button onClick={downloadBuffer}>Download</Button>
          </CardHeader>

          <CardContent>
            <div className='border' ref={resumeRef}>
              
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='w-full flex justify-center p-4'>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>

    </div>
    
  )
}

export default Create