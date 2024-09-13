import FeedWrapper from '@/components/FeedWrapper'
import Promo from '@/components/Promo'
import StickyWrapper from '@/components/StickyWrapper'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import UserProgress from '@/components/UserProgress'
import { quests } from '@/constant'
import { getUserProgress } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const QuestsPage = async (props: Props) => {

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
            <Promo />
        </StickyWrapper>
        <FeedWrapper>
            <div className='flex flex-col items-center w-full gap-y-2'>
                <Image src={"/quests.svg"} alt='quests' height={90} width={90} />
                <h1 className='font-bold text-2xl text-neutral-700 mb-6 text-center'>Quests</h1>
                <p className='text-muted-foreground text-lg mb-6 text-center'>Completed quests by earning points</p>
                <ul className='w-full'>
                    {quests.map((quest) => {
                        const progress = Math.min((userProgress.points / quest.value) * 100, 100)

                        return (
                            <div className='flex p-4 border-t-2 w-full items-center gap-x-4' key={quest.title}>
                                <Image src={"/points.svg"} alt='point' width={40} height={40} />
                                <div className='flex flex-col gap-y-2 w-full'>
                                    <p className='font-bold text-lg lg:text-xl'>{quest.title}</p>
                                    <Progress value={progress} className='h-3' />
                                </div>

                            </div>
                        )
                    })}
                </ul>
            </div>
        </FeedWrapper>
    </div>
  )
}

export default QuestsPage