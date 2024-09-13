import React from 'react'

type Props = {
    children: React.ReactNode
}

const StickyWrapper = ({ children }: Props) => {
  return (
    // original w-368px
    <div className='hidden lg:block w-[268px] sticky self-end bottom-6'> 
        <div className='min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4'>
            {children}
        </div>
    </div>
  )
}

export default StickyWrapper