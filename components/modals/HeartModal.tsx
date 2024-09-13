"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useHeartModal } from '@/store/useHeartModal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {}

const HeartModal = (props: Props) => {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = useHeartModal()

    const onClick = () => {
        close();
        router.push("/store")
    }

    useEffect(() => {
      setIsClient(true)
    }, [])

    if(!isClient) return null
    

  return (
    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className='max-w-md'>
            <DialogHeader>
                <div className='flex items-center w-full justify-center mb-5'>
                    <Image src={"/mascot_bad.svg"} alt='mascot bad' height={80} width={80} />
                </div>
                <DialogTitle className='text-center font-bold text-2xl'>
                  You ran out of hearts!
                </DialogTitle>
                <DialogDescription className='text-center text-base'>
                  Get Pro for unlimited hearts, or purchase them in the store
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4' autoFocus>
              <div className='flex flex-col gap-y-4 w-full items-center'>
                <Button variant={"primary"} size="lg" className='w-full' onClick={onClick}>
                  Get unlimited hearts
                </Button>
                <Button 
                  variant={"primaryOutline"} 
                  size="lg" 
                  className='w-full' 
                  onClick={close}
                >
                  No thanks
                </Button>
              </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default HeartModal