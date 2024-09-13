import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challengeOptions, challenges } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

export const GET = async () => {
    const isAdmin = getIsAdmin()
    if(!isAdmin) return new NextResponse("Not Admin", { status: 401 })

    const data = await db.query.challengeOptions.findMany()
    const beta = await db.query.challenges.findMany()

    // Create response by mapping over data and finding corresponding beta
    const response = data.map(itema => {
        // Find the corresponding challenge in the beta array by challengeId
        const matchingChallenge = beta.find(itemb => itemb.id === itema.challengeId)
        
        // Return a new object with all properties of itema and the question from matchingChallenge
        return {
            ...itema,
            question: matchingChallenge!.question
        }
    })
    console.log(response)
    return NextResponse.json(response)        
}

export const POST = async (req: Request) => {
    const isAdmin = getIsAdmin()
    if(!isAdmin) return new NextResponse("Not Admin", { status: 401 })

    const body = await req.json()
    const data = await db.insert(challengeOptions).values({
        ...body,
    }).returning()
    return NextResponse.json(data[0])        
}