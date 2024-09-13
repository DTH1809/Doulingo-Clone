import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {}

const Promo = (props: Props) => {
  return (
    <div className='border-2 border-neutral-300 rounded-lg p-4 space-y-4 mt-4'>
        <div className='flex items-center gap-x-4'>
            <Image src={"/unlimited.svg"} alt='pro' height={26} width={26} />
            <h3 className='text-lg font-bold'>Upgrade to Pro</h3>
        </div>
        <p className='text-neutral-700'>Get unlimited hearts and more!</p>
        <Button variant={"super"} size={"lg"} className='w-full'>
            <Link href={"/shop"}>
                upgrade today
            </Link>
        </Button>
    </div>
  )
}

export default Promo