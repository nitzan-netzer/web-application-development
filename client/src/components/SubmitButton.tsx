'use client';

import React, { memo } from 'react'
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
    text: string;
    className?: string;
    onClick?: () => void;
}

function SybmitButton({ text, className, onClick }: SubmitButtonProps) {

  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending} className={className} onClick={onClick}>
        {pending ? 'Loading...' : text}
    </button>
  )
}

export default memo(SybmitButton)