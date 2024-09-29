'use client';

import React, { memo } from 'react'
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
    text: string;
    className?: string;
}

function SybmitButton({ text, className }: SubmitButtonProps) {

  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending} className={className}>
        {pending ? 'Loading...' : text}
    </button>
  )
}

export default memo(SybmitButton)