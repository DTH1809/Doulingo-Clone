"use client"

import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    label: string
    icon: string
    href: string
}

const SidebarItem = ({ label, icon, href }: Props) => {

    const pathName = usePathname()
    const variant = pathName === href ? "sidebarOutline" : "sidebar"

  return (
    <Button variant={variant} className='justify-start h-[52px]' asChild>
        <Link href={href}>
            <Image src={icon} alt='label' className='mr-5' width={32} height={32} />
            {label}
        </Link>
    </Button>
  )
}

export default SidebarItem