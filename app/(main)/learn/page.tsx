import FeedWrapper from '@/components/FeedWrapper'
import StickyWrapper from '@/components/StickyWrapper'
import React from 'react'
import Header from './header'
import UserProgress from '@/components/UserProgress'
import { getCourseById, getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import Unit from './Unit'
import { lessons, units as unitsSchema } from '@/db/schema'
import Promo from '@/components/Promo'

type Props = {}

const LearnPage = async (props: Props) => {

  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()
  const [userProgress, units, courseProgress, lessonPercentage] = 
    await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData])

  if(!userProgress || !userProgress.activeCourse) redirect("/courses")
  if(!courseProgress) redirect("/courses")

  return (
    // can try flex-row-reverse and put feedwrapper at second
    <div className='flex gap-[48px] px-6'>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title} />
            {units.map(unit => (
              <div key={unit.id} className='mb-10'>
                <Unit
                  id={unit.id}
                  title={unit.title}
                  description={unit.description}
                  order={unit.order}
                  lessons={unit.lessons}
                  activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                    unit: typeof unitsSchema.$inferSelect
                  } | undefined}
                  activeLessonPercentage={lessonPercentage}
                />
              </div>
            ))}
        </FeedWrapper>
        <StickyWrapper>
            <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={false}
            />
            <Promo />
        </StickyWrapper>
    </div>
  )
}

export default LearnPage