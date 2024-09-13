import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
  return (
    <div className='sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-center border-b-2 mb-5 text-neutral-400 lg:z-50'>
        <Link href="/courses" className='absolute left-1'>
            <Button variant={"default"} size={"sm"}>
                <ArrowLeft className='h-5 w-5 stroke-2 text-neutral-400' />
            </Button>
        </Link>
        <h1 className='font-bold text-lg lg:text-2xl text-neutral-700'>{title}</h1>
    </div>
  )
}

export default Header