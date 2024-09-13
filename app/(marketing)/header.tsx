import { Button } from '@/components/ui/button'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
        <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
            <Link href={"/"} className='py-5 flex items-center lg:gap-x-3 gap-x-1 cursor-pointer'>
                <div className='size-12 relative lg:size-16'>
                    <Image src="https://img.icons8.com/fluency/100/duolingo-logo.png" alt='logo' fill />
                </div>
                <h1 className='lg:text-3xl text-xl font-extrabold text-green-600 lg:tracking-wider '>Doulingo</h1>
            </Link>
            <ClerkLoading>
                <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton afterSignOutUrl='/'/>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode='modal' fallbackRedirectUrl={"/learn"} signUpFallbackRedirectUrl={"/learn"} >
                        <Button variant="ghost" size="lg" className='w-fit'>
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
            </ClerkLoaded>
        </div>
    </header>
  )
}

export default Header