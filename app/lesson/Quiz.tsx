"use client"

import { challengeOptions, challengeProgress, challenges } from '@/db/schema'
import React, { useState, useTransition } from 'react'
import Confetti from "react-confetti"
import Header from './Header'
import QuestionBubble from './QuestionBubble'
import Challenge from './Challenge'
import Footer from './Footer'
import { updateChallengeProgress } from '@/actions/challenge-progress'
import { toast } from 'sonner'
import { reduceHearts } from '@/actions/user-progress'
import { useAudio, useWindowSize, useMount } from 'react-use'
import Image from 'next/image'
import ResultCard from './ResultCard'
import { useRouter } from 'next/navigation'
import { useHeartModal } from '@/store/useHeartModal'
import { usePracticeModal } from '@/store/usePracticeModal'

type Props = {
    initialPercentage: number
    initialLessonId: number
    initialHearts: number
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any //TODO: replace with subscription DB type
}

const Quiz = ({ initialHearts, initialLessonChallenges, initialLessonId, initialPercentage, userSubscription}: Props) => {

  const { open: openHeartsModal } = useHeartModal()
  const { open: openPracticeModal } = usePracticeModal()

  useMount(() => {
    if(initialPercentage === 100) openPracticeModal()
  })

  const { width, height } = useWindowSize()
  const[correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
  const[incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" })
  const[finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true })
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
  const [challenges] = useState(initialLessonChallenges)
  const [lessonId, setLessonId] = useState(initialLessonId)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(challenge => challenge.completed === false)
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

  const onNext = () => {
    setActiveIndex(current => current + 1)
  }

  const onSelect = (id: number) => {
    if(status !== "none") return
    setSelectedOption(id)
  }

  // function to check the option is selected is correct or wrong(execute when the check button is clicked)
  const onContinue = () => {
    if(!selectedOption) return

    if(status === "wrong") {
      setStatus("none")
      setSelectedOption(undefined)
      return
    }

    if(status === "correct") {
      onNext()
      setStatus("none")
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find(option => option.correct)

    if(!correctOption) return

    if(selectedOption === correctOption.id) {
      startTransition(() => {
        updateChallengeProgress(challenge.id)
          .then(response => {
            if(response?.error === "hearts") {
              openHeartsModal()
              return
            }

            correctControls.play()
            setStatus("correct")
            setPercentage(prev => prev + 100 /challenges.length)

            if(initialPercentage === 100) { //this is a practice
              setHearts(prev => Math.min(prev + 1, 5))
            }
          })
          .catch(() => {
            toast.error("Something went wrong when update the challenge progress. Please try again")
          })
      })
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then(response => {
            if(response?.error === "hearts") {
              openHeartsModal()
              return
            }

            incorrectControls.play()
            setStatus("wrong")

            if(!response?.error) {
              setHearts(prev => Math.max(prev - 1, 0))
            }
          })
          .catch(() => {
            toast.error("Something went wrong when reduce the hearts. Please try again", { position: "top-center" })
          })
      })
    }

  }

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions || []

  if(!challenge) {
    return(
      <>
        <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={width} height={height} />
        {finishAudio}
        <div className='flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full'>
          <Image src={"/finish.svg"} alt='Finish' className='hidden lg:block' height={100} width={100} />
          <Image src={"/finish.svg"} alt='Finish' className='block lg:hidden' height={50} width={50} />
          <h1 className='text-xl lg:text-3xl font-bold text-neutral-600'>
            Great job! <br /> You&apos;re completed the lesson.
          </h1>
          <div className='flex items-center w-full gap-x-4'>
            <ResultCard
              variant="points"
              value={challenges.length * 10}
            />
            <ResultCard
              variant="hearts"
              value={hearts}
            />
          </div>
        </div>  
        <Footer
          lessonId={lessonId}
          status='completed'
          onCheck={() => router.push("/learn")}
        />
      </>
    )
  }

  const title = challenge.type === "ASSIST" 
    ? "Select the correct meaning"
    : challenge.question

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive}/>
      <div className='flex-1'>
        <div className='h-full flex items-center justify-center'>
          <div className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'>
            <h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}

export default Quiz