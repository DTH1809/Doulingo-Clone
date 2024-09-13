import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { InfinityIcon } from 'lucide-react'
import { courses } from '@/db/schema'

type Props = {
    activeCourse: typeof courses.$inferSelect // replaces with database types
    hearts: number
    points: number
    hasActiveSubscription: boolean
}

const UserProgress = ({ activeCourse, hearts, points, hasActiveSubscription }: Props) => {
  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
        <Link href={"courses"}>
            <Button variant={"ghost"} >
                <Image src={activeCourse.imageSrc} alt={activeCourse.title} width={50} height={50} className='border' />
            </Button>
        </Link>
        <Link href={"shop"}>
            <Button variant={"ghost"} className='text-orange-500'>
                <Image src="/points.svg" alt='poinst' width={40} height={40} className='mr-2' />
                {points}
            </Button>
        </Link>
        <Link href={"shop"}>
            <Button variant={"ghost"} className='text-rose-500'>
                <Image src="/heart.svg" alt='hearts' width={40} height={40} className='mr-2' />
                {hasActiveSubscription 
                    ? <InfinityIcon className='h-4 w-4 stroke-[3]' /> 
                    : hearts
                }
            </Button>
        </Link>
    </div>
  )
}

export default UserProgress