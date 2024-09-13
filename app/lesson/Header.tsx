import { Progress } from '@/components/ui/progress'
import { useExitModal } from '@/store/useExitModal'
import { InfinityIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
    hearts: number
    percentage: number
    hasActiveSubscription: boolean
}

const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {

  const { open } = useExitModal()

  return (
    <header className='pt-[20px] lg:pt-[50px] px-10 flex gap-x-7 items-center justify-between max-w-screen-lg mx-auto w-full'>
        <X
            onClick={open}
            className='text-slate-500 hover:opacity-75 transition cursor-pointer hover:scale-110'
        />
        <Progress value={percentage} />
        <p className='text-green-500 font-bold lg:text-xl'>{Math.round(percentage) + "%"}</p>
        <div className='text-rose-500 flex items-center font-bold'>
            <Image src={"/heart.svg"} alt='heart' height={28} width={28} className='mr-2' />
            {hasActiveSubscription ? <InfinityIcon className='h-6 w-6 stroke-[3]' /> : <p>{hearts}</p>}
        </div>
    </header>
  )
}

export default Header