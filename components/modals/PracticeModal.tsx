"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { usePracticeModal } from '@/store/usePracticeModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {}

const PracticeModal = (props: Props) => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = usePracticeModal()

    useEffect(() => {
      setIsClient(true)
    }, [])

    if(!isClient) return null
    
  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className='max-w-md'>
            <DialogHeader>
                <div className='flex items-center w-full justify-center mb-5'>
                    <Image src={"/heart.svg"} alt='heart' height={100} width={100} />
                </div>
                <DialogTitle className='text-center font-bold text-2xl'>
                    Practice lesson
                </DialogTitle>
                <DialogDescription className='text-center text-base'>
                  Use practice lesson to regain hearts and points. You can not lose points and hearts in practice lesson.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4' autoFocus>
              <div className='flex flex-col gap-y-4 w-full items-center'>
                <Button 
                  variant={"primary"} 
                  size="lg" 
                  className='w-full' 
                  onClick={() => {
                    close();
                  }}
                >
                  I understand
                </Button>
              </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default PracticeModal