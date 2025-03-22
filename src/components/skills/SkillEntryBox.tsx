'use client'

import React, { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SkillEntryBoxProps = {
  skills: string[]
  setSkills: (skills: string[]) => void
}

export default function SkillEntryBox({ skills, setSkills }: SkillEntryBoxProps) {
  
  const [inputValue, setInputValue] = useState('')

  const addSkills = (input: string) => {
    const newSkills = input.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
    const uniqueNewSkills = newSkills.filter(skill => !skills.includes(skill))
    if (uniqueNewSkills.length > 0) {
      setSkills([...skills, ...uniqueNewSkills])
      setInputValue('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkills(inputValue)
    }
    if (e.key === 'Backspace' && inputValue === '' && skills.length > 0) {
      removeSkill(skills[skills.length - 1])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.endsWith(',')) {
      addSkills(value)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="skill-input" className="block text-sm font-medium text-gray-700 mb-2">
        Enter your skills (press Enter or use commas to add)
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
          >
            {skill}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-1 p-0 h-auto"
              onClick={() => removeSkill(skill)}
              aria-label={`Remove ${skill}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Input
        id="skill-input"
        type="text"
        placeholder="Type a skill and press Enter or use commas"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
    </div>
  )
}