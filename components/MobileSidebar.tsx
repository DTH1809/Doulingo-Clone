import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

type Props = {}

const MobileSidebar = (props: Props) => {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-white' />
        </SheetTrigger>
        <SheetContent side={"left"} className='p-0 z-[50]'>
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar