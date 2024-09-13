import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SidebarItem from './SidebarItem'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

type Props = {
    className?: string
}

const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn('h-full lg:w-[256px] lg:fixed top-0 left-0 px-4 border-r-2 flex-col flex', className)}>
        <Link href={"/"} className='flex items-center justify-center'>
            <div className='pt-8 pb-7 flex items-center gap-x-3'>
                <Image src="https://img.icons8.com/fluency/100/duolingo-logo.png" alt='logo' width={40} height={40} />
                <h1 className='text-2xl font-extrabold text-green-600 tracking-wider lg:text-3xl'>Doulingo</h1>
            </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
            <SidebarItem label='learn' href='/learn' icon='/learn.svg' />
            <SidebarItem label='quests' href='/quests' icon='/quests.svg' />
            <SidebarItem label='leaderboard' href='/leaderboard' icon='/leaderboard.svg' />
            <SidebarItem label='shop' href='/shop' icon='/shop.svg' />
        </div>
        <div className='p-4'>
            <ClerkLoading>
                <Loader />
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSwitchSessionUrl='/'/>
            </ClerkLoaded>
        </div>
    </div>
  )
}

export default Sidebar