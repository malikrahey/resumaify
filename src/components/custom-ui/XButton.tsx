import React from 'react'
import { Button } from '../ui/button';

interface XButtonProps {
  onClick?: () => any,
}

function XButton({onClick}: XButtonProps) {

  return (
    <Button variant="destructive" className='w-8 text-xs h-8 bg-transparent outline shadow-sm outline-1 border-2 rounded-md hover:bg-neutral-200 text-primary' onClick={onClick}>
      X
    </Button>
  )
}

export default XButton