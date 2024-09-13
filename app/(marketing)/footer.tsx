import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='hidden lg:block h-fit w-full border-t-2 border-slate-200 p-2'>
        <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
            <Button className='w-fit' variant={"ghost"}>
                <Image src={"/jp.svg"} alt='jp flag' width={30} height={30} className='mr-2 lg:mr-5' />
                Japanese
            </Button>
            <Button className='w-fit' variant={"ghost"}>
                <Image src={"/es.svg"} alt='es flag' width={30} height={30} className='mr-2 lg:mr-5' />
                Spanish
            </Button>
            <Button className='w-fit' variant={"ghost"}>
                <Image src={"/fr.svg"} alt='fr flag' width={30} height={30} className='mr-2 lg:mr-5' />
                France
            </Button>
            <Button className='w-fit' variant={"ghost"}>
                <Image src={"/it.svg"} alt='it flag' width={30} height={30} className='mr-2 lg:mr-5' />
                Italian
            </Button>
        </div>
    </footer>
  )
}

export default Footer