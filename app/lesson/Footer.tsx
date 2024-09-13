"use client"

import React, { useState } from 'react'
import { useKey, useMedia } from "react-use"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Props = {
    disabled?: boolean
    status: "correct" | "wrong" | "none" | "completed"
    onCheck: () => void
    lessonId?: number
}

const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {

    const isMobile = useMedia("(max-width : 1024px)")

    useKey("enter", onCheck, {}, [onCheck])

  return (
    <footer 
        className={cn(
            "lg:h-[140px] h-[100px] border-t-2 ",
            status === "correct" && "border-transparent bg-green-100",
            status === "wrong" && "border-transparent bg-red-100",
        )}
    >
        <div className='lg:max-w-screen-lg h-full mx-auto flex items-center justify-between px-6 lg:px-10  '>
            {status === "correct" && (
                <div className='text-green-500 font-bold text-base lg:text-3xl flex items-center'>
                    <CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
                    Nicely done!
                </div>
            )}
            {status === "wrong" && (
                <div className='text-red-500 font-bold text-base lg:text-3xl flex items-center'>
                    <XCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
                    Let try again
                </div>
            )}
            {status === "completed" && (
                <Button variant={"primary"} size={isMobile ? "sm" : "lg"} onClick={() => window.location.href = `/lesson/${lessonId}`} >
                    Practice again
                </Button>
            )}
            <Button disabled={disabled} className='ml-auto' onClick={onCheck} size={isMobile ? "sm" : "lg"} variant={status === "wrong" ? "danger" : "secondary"}>
                {status === "none" && "Check"}
                {status === "correct" && "Next"}
                {status === "wrong" && "Retry"}
                {status === "completed" && "Continue"}
            </Button>
        </div>
    </footer>
  )
}

export default Footer