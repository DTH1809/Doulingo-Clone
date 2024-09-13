"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useExitModal } from '@/store/useExitModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {}

const ExitModal = (props: Props) => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useExitModal()

    useEffect(() => {
      setIsClient(true)
    }, [])

    if(!isClient) return null
    

  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className='max-w-md'>
            <DialogHeader>
                <div className='flex items-center w-full justify-center mb-5'>
                    <Image src={"/mascot_sad.svg"} alt='mascot' height={80} width={80} />
                </div>
                <DialogTitle className='text-center font-bold text-2xl'>
                  Wait, don&apos;t go!
                </DialogTitle>
                <DialogDescription className='text-center text-base'>
                  You&apos;re about to leave the lesson. Are you sure?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4' autoFocus>
              <div className='flex flex-col gap-y-4 w-full items-center'>
                <Button variant={"primary"} size="lg" className='w-full' onClick={close}>
                  Keep learning
                </Button>
                <Button 
                  variant={"dangerOutline"} 
                  size="lg" 
                  className='w-full' 
                  onClick={() => {
                    close();
                    router.push("/learn");
                  }}
                >
                  End session
                </Button>
              </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ExitModal