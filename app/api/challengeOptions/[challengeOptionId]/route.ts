import db from "@/db/drizzle"
import { challengeOptions, challenges } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request, 
    { params }: { params: { challengeOptionId: number } },
) => {
    
    const isAdmin = getIsAdmin()
    if(!isAdmin) {
        return new NextResponse("Not Admin", { status: 403})
    }

    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id, params.challengeOptionId)
    })
    const beta = await db.query.challenges.findFirst({
        where: eq(challenges.id, data!.challengeId)
    })
    const challengeQuestion = beta!.question
    
    const response = {
        ...data,
        challengeQuestion
    }
    console.log(response)

    return NextResponse.json(response)
}

export const PUT = async (
    req: Request, 
    { params }: { params: { challengeOptionId: number } },
) => {
    
    const isAdmin = getIsAdmin()
    if(!isAdmin) {
        return new NextResponse("Not Admin", { status: 403})
    }

    const body = await req.json()
    const data = await db.update(challengeOptions).set({
        ...body,
    })
    .where(eq(challengeOptions.id, params.challengeOptionId))
    .returning()

    return NextResponse.json(data[0])
}

export const DELETE = async (
    req: Request, 
    { params }: { params: { challengeOptionID: number } },
) => {
    
    const isAdmin = getIsAdmin()
    if(!isAdmin) {
        return new NextResponse("Not Admin", { status: 403})
    }

    const data = await db.delete(challengeOptions)
        .where(
            eq(challengeOptions.id, params.challengeOptionID)
        )
        .returning()

    return NextResponse.json(data[0])
}