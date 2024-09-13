import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log("Seeding database")

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg"
            },
            {
                id: 2,
                title: "Japanese",
                imageSrc: "/jp.svg"
            },
            {
                id: 3,
                title: "Italian",
                imageSrc: "/it.svg"
            },
            {
                id: 4,
                title: "French",
                imageSrc: "/fr.svg"
            },
        ])

        await db.insert(schema.units).values([
            { id: 1, courseId: 1, title: "Unit 1", description: "Learn the basic of Spanish", order: 1 },
        ])

        await db.insert(schema.lessons).values([
            { id: 1, unitId: 1, title: "Nouns", order: 1 },
            { id: 2, unitId: 1, title: "Verbs", order: 2 },
            { id: 3, unitId: 1, title: "Adjective", order: 3 },
            { id: 4, unitId: 1, title: "four", order: 4 },
            { id: 5, unitId: 1, title: "five", order: 5 },
        ])

        await db.insert(schema.challenges).values([
            { id: 1, lessonId: 1, type: "SELECT", question: 'Which one of these is "the man" ?', order: 1 },
            { id: 2, lessonId: 1, type: "ASSIST", question: '"the man"', order: 2 },
            { id: 3, lessonId: 1, type: "SELECT", question: 'Which one of these is "the robot" ?', order: 3 },
        ])

        await db.insert(schema.challengeOptions).values([
            { id: 1, challengeId: 1, imageSrc: "/man.svg", audioSrc: "/es_man.mp3", correct: true, text: "el hombre"},
            { id: 2, challengeId: 1, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3", correct: false, text: "la mujer"},
            { id: 3, challengeId: 1, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3", correct: false, text: "el robot"},
        ])

        await db.insert(schema.challengeOptions).values([
            {id: 4, challengeId: 2, audioSrc: "/es_man.mp3", correct: true, text: "el hombre"},
            {id: 5, challengeId: 2, audioSrc: "/es_woman.mp3", correct: false, text: "la mujer"},
            {id: 6, challengeId: 2, audioSrc: "/es_robot.mp3", correct: false, text: "el robot"},
        ])

        await db.insert(schema.challengeOptions).values([
            { id: 7, challengeId: 3, imageSrc: "/man.svg", audioSrc: "/es_man.mp3", correct: false, text: "el hombre"},
            { id: 8, challengeId: 3, imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3", correct: false, text: "la mujer"},
            { id: 9, challengeId: 3, imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3", correct: true, text: "el robot"},
        ])

        await db.insert(schema.challenges).values([
            { id: 4, lessonId: 2, type: "SELECT", question: 'Which one of these is "the man" ?', order: 1 },
            { id: 5, lessonId: 2, type: "ASSIST", question: '"the man"', order: 2 },
            { id: 6, lessonId: 2, type: "SELECT", question: 'Which one of these is "the robot" ?', order: 3 },
        ])

        console.log("Seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}

main()