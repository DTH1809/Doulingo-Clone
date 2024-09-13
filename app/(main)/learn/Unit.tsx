import { lessons, units } from '@/db/schema'
import React from 'react'
import UnitBanner from './UnitBanner'
import LessonButton from './LessonButton'

type Props = {
    id: number
    title: string
    description: string
    order: number
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean
    })[]
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
    } | undefined
    activeLessonPercentage: number
}

const Unit = ({ id, title, description, order, lessons, activeLesson, activeLessonPercentage }: Props) => {
  return (
    <>
        <UnitBanner title={title} description={description} />
        <div className='flex flex-col items-center'>
            {lessons.map((lesson, index) => {
                const isCurrent = lesson.id === activeLesson?.id 
                const isLocked = !lesson.completed && !isCurrent

                return(
                    <LessonButton 
                        key={lesson.id} 
                        id={lesson.id}
                        index={index}
                        totalCount={lessons.length - 1}
                        current={isCurrent}
                        locked={isLocked}
                        percentage={activeLessonPercentage}
                    />
                )
            })}
        </div>
    </>
  )
}

export default Unit