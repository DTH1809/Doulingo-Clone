import { auth } from "@clerk/nextjs/server"

export const getIsAdmin = () => {
    const { userId } = auth()
    if(!userId) return false

    return userId === "user_2lPNIlf7Edo9KfkjtxNzwghNImQ"
} 