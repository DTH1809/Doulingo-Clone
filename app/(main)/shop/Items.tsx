"use client"

import { RefillHearts } from '@/actions/user-progress'
import { Button } from '@/components/ui/button'
import { POINT_TO_REFILL } from '@/constant'
import { error } from 'console'
import Image from 'next/image'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {

    const [pending, startTransition] = useTransition()

    const onRefillHearts = () => {
        if(hearts === 5 || points < POINT_TO_REFILL || pending) return //Disabled button

        startTransition(() => {
            RefillHearts()
                .then(() => toast.success("Refill hearts successfully"))
                .catch(() => toast.error("Something went wrong when refill hearts"))
        })
    }

    const onUpgrade = () => {} //TODO: add function to upgrade user subscription

  return (
    <ul className='w-full flex flex-col border-t-2'>
        <div className='flex items-center w-full justify-between my-5'>
            <div className='flex items-center gap-x-4 lg:gap-x-10'>
                <Image src={"/heart.svg"} alt='hearts' width={60} height={60} />
                <p className='lg:text-xl font-bold'>Refill hearts</p>
            </div>
            <Button disabled={hearts === 5 || points < POINT_TO_REFILL || pending} variant={"default"} onClick={onRefillHearts}>
                {hearts === 5 ? "Full" : (
                    <div className='flex items-center gap-x-2'>
                        <Image src={"/points.svg"} alt='points' height={20} width={20} />
                        {POINT_TO_REFILL}
                    </div>
                )}
            </Button>
        </div>
        <div className='flex items-center w-full justify-between my-5'>
            <div className='flex items-center gap-x-4 lg:gap-x-10'>
                <Image src={"/unlimited.svg"} alt='unlimited' width={60} height={60} />
                <p className='lg:text-xl font-bold'>Unlimited hearts</p>
            </div>
            <Button disabled={pending || hasActiveSubscription} variant={"default"} onClick={() => {
                toast.message("Upgrade subscription feature has not been implement", { position: "top-center" })
                //TODO: replace with real function
            }} > 
                {hasActiveSubscription ? "Active" : "Upgrade"}
            </Button>
        </div>
    </ul>
  )
}

export default Items