import FeedWrapper from '@/components/FeedWrapper'
import StickyWrapper from '@/components/StickyWrapper'
import UserProgress from '@/components/UserProgress'
import { getTopTenUsers, getUserProgress } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import UserItem from './UserItem'
import { Separator } from '@/components/ui/separator'
import Promo from '@/components/Promo'

type Props = {}

const LeaderboardPage = async (props: Props) => {

    const userProgressData = getUserProgress()
    const leaderboardData = getTopTenUsers()
    const [ userProgress, leaderboard ] = await Promise.all([userProgressData, leaderboardData])

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
                <Image src={"/leaderboard.svg"} alt='leaderboard' height={90} width={90} />
                <h1 className='font-bold text-2xl text-neutral-700 mb-6'>Leaderboard</h1>
                <p className='text-muted-foreground text-lg mb-6 text-center'>See where you stand among other learners in the community.</p>
                <Separator className='mb-4 h-0.5 rounded-full' />
                {leaderboard.map((user, index) => (
                    <UserItem
                        key={user.userId}
                        shortcut={index + 1}
                        points={user.points}
                        image={user.userImage}
                        name={user.userName}
                    />
                ))}
            </div>
        </FeedWrapper>
    </div>
  )
}

export default LeaderboardPage