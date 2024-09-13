import { challenges } from '@/db/schema'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useAudio, useKey } from "react-use"

type Props = {
    key: number
    id: number
    text: string
    image: string | null
    shortcut: string
    selected?: boolean
    onClick: () => void
    status?: "correct" | "wrong" |"none"
    audioSrc: string | null
    disabled?: boolean 
    type: typeof challenges.$inferSelect.type
}

const Card = ({ id, text, image, shortcut, selected, onClick, status, audioSrc, disabled, type }: Props) => {

  const [audio, _, controls] = useAudio({ src: audioSrc || "" })

  const handleClick = useCallback(() => {
    if(disabled) return

    controls.play()
    onClick()
  }, [disabled, onClick, controls])

  useKey(shortcut, handleClick, {}, [handleClick])

  return (
    <div 
      onClick={handleClick} 
      className={cn(
        "h-full border-2 rounded-xl border-b-4 border-l-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-0 active:border-l-0",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
        selected && status === "wrong" && "border-red-300 bg-red-100 hover:bg-red-100",
        disabled && "pointer-events-none hover:bg-white", 
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {image && (
        <div className='relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full'>
          <Image src={image} alt={text} fill/>
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p 
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-red-500",
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-sm font-semibold",
            selected && "text-sky-500 border-sky-300",
            selected && status === "correct" && "text-green-500 border-green-300",
            selected && status === "wrong" && "text-red-500 border-red-300",
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  )
}

export default Card