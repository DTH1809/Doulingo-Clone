import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: string
    description: string
}

const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className='flex bg-green-500 w-full rounded-lg items-center justify-between p-4 lg:px-6'>
        <div className='text-white space-y-2'>
            <h1 className='text-2xl lg:text-3xl font-bold'>{title}</h1>
            <h3 className='text-base lg:text-lg'>{description}</h3>
        </div>
        <Link href={"/lesson"}>
            <Button size={"default"} variant={"default"} className='border-black'>
                <NotebookText className='lg:mr-2' /> 
                <p className='hidden lg:block'>Learn</p>
            </Button>
        </Link>
    </div>
  )
}

export default UnitBanner