"use server"
import { POINT_TO_REFILL } from "@/constant"
// Update user progress

import db from "@/db/drizzle"
import { getCourseById, getUserProgress } from "@/db/queries"
import { challengeProgress, challenges, userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { error } from "console"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const updateUserProgress = async (courseId: number) => {
    const { userId } = auth() 
    const user = await currentUser()
    const course = await getCourseById(courseId)

    const existingUserProgess = await getUserProgress()

    if(existingUserProgess) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user?.firstName || "User",
            userImage: user?.imageUrl || "/hero.svg",
        })
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }

    await db.insert(userProgress).values({
        userId: userId!,
        activeCourseId: courseId,
        userName: user?.firstName || "User",
        userImage: user?.imageUrl || "/hero.svg",
    })
    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")
}

export const reduceHearts = async(challengeId : number) => {
    const { userId } = auth()
    if(!userId) throw new Error("Unauthorized")

    const currentUserProgress = await getUserProgress()
    // TODO: get user subscription

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    })

    if(!challenge) throw new Error("Challenge not found")

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        )
    })

    const isPractice = !!existingChallengeProgress

    if(isPractice) {
        return { error: "practice" }
    }

    if(!currentUserProgress) throw new Error("User progress not found")
    
    //TODO: handle subscription

    if(currentUserProgress.hearts === 0) {
        return { error: "hearts" }
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0)
    })
    .where(eq(userProgress.userId, userId))

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
}

export const RefillHearts = async () => {
    const { userId } = auth()
    if(!userId) throw new Error("Unauthorized")
    
    const currentUserProgress = await getUserProgress()
    if(!currentUserProgress || !currentUserProgress.activeCourse) throw new Error("User progress not found")
    if(currentUserProgress.hearts === 5 || currentUserProgress.points < POINT_TO_REFILL) throw new Error("Hearts are already full or you don't have enought points to refill")

    await db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - POINT_TO_REFILL,
    })
    .where(eq(userProgress.userId, userId))

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")    
}