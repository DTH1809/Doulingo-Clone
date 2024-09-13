import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Trophy } from 'lucide-react'
import React from 'react'

type Props = {
    shortcut: number
    points: number
    image: string
    name: string
}

const UserItem = ({ shortcut, points, image, name }: Props) => {
  return (
    <div className={cn(
        "flex w-full items-center px-2 py-4 rounded-xl",
        shortcut === 1 && "bg-red-100",
        shortcut === 2 && "bg-yellow-100",
        shortcut === 3 && "bg-blue-100",

    )}>
        <p className='font-bold text-lg lg:text-xl'>{shortcut}</p>  
        {shortcut === 1 && <Trophy className='ml-4 lg:h-12 lg:w-12 lg:ml-8' />}
        <Avatar className='ml-4 lg:ml-8 h-8 w-8 lg:h-12 lg:w-12'>
            <AvatarImage src={image} alt={name} className='object-cover' />    
        </Avatar>    
        <p className='ml-4 lg:ml-8 font-bold text-lg lg:text-2xl flex-1'>{name}</p>
        <p className='font-semibold text-lg lg:text-xl tracking-wider '>{`${points} Points`}</p>
    </div>
  )
}

export default UserItem