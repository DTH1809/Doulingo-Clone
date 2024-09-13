import FeedWrapper from '@/components/FeedWrapper'
import StickyWrapper from '@/components/StickyWrapper'
import UserProgress from '@/components/UserProgress'
import { getUserProgress } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import Items from './Items'

type Props = {}

const ShopPage = async (props: Props) => {

    const userProgressData = getUserProgress()
    const [ userProgress ] = await Promise.all([userProgressData])

    if(!userProgress || !userProgress.activeCourse) redirect("/courses")

  return (
    <div className='flex flex-col lg:flex-row-reverse gap-[48px] px-6'>
        <StickyWrapper>
            <UserProgress 
                activeCourse={userProgress.activeCourse} 
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={false} //TODO: add user subscription
            />
        </StickyWrapper>
        <FeedWrapper>
            <div className='flex flex-col items-center w-full gap-y-2'>
                <Image src={"/shop.svg"} alt='shop' height={90} width={90} />
                <h1 className='font-bold text-2xl text-neutral-700 mb-6'>Shop</h1>
                <p className='text-muted-foreground text-lg mb-6'>Spend your points on cool stuff.</p>
                <Items hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false} />
            </div>
        </FeedWrapper>
    </div>
  )
}

export default ShopPage