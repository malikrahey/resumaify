import { Label } from '@radix-ui/react-label'
import { Trash2, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PersonalLinksProps = {
  value: string[],
  defaultValue: string[],
  handleChange: (links: string[]) => void
}

export default function PersonalLinks({value, defaultValue, handleChange}: PersonalLinksProps) {

  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    setLinks(defaultValue);
  }, [defaultValue]);

  const addLink = () => {
    const newLinks = [...links, ""]
    setLinks(newLinks)
    handleChange(newLinks)
  }

  const removeLink = (index: number) => {
    const newLinks = links.filter((_: any, i: number) => i !== index)
    setLinks(newLinks);
    handleChange(newLinks);
  }

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks);
    handleChange(newLinks);
  }

  return (
    <div className="space-y-4">
          <Label>Personal Links</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                  placeholder="Enter a personal link"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLink(index)}
                  aria-label="Remove link"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={addLink} variant="outline" className="w-full mt-2">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>
  )
}
