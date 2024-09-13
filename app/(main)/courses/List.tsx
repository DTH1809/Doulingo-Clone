"use client"

import { courses, userProgress } from '@/db/schema'
import React, { useTransition } from 'react'
import Card from './Card'
import { useRouter } from 'next/navigation'
import { updateUserProgress } from '@/actions/user-progress'
import { error } from 'console'
import { toast } from 'sonner'

type Props = {
    courses: typeof courses.$inferSelect[]
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

const List = ({ courses, activeCourseId }: Props) => {

    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const handleClick = (id: number) => {
        if(pending) return

        if(id === activeCourseId) {
            return router.push("/learn")
        }

        startTransition(() => {
            updateUserProgress(id)
                .catch(() => toast.error("Something when update user progress went wrong", { position: "top-center" }))
        })
    }

  return (
    <div className='pt-6 grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
        {courses.map((course) => (
            <Card
                key={course.id}
                id={course.id}
                title={course.title}
                image={course.imageSrc}
                onClick={handleClick}
                disabled={pending}
                active={course.id === activeCourseId}
            />
        ))}
    </div>
  )
}

export default List