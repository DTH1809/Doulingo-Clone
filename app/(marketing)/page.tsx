import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative flex justify-center items-center w-[240px] h-[240px] lg:w-[350px] lg:h-[350px] mb-8 lg:mb-0">
        <Image alt="hero" src="/hero.svg" fill/>
      </div>
      <div className="flex flex-col items-center gap-y-8 max-w-[300px] md:max-w-full">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[440px] text-center">Learn, practive and master <br/>new languages with Doulingo</h1>
        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton mode="modal" fallbackRedirectUrl={"/learn"} signInFallbackRedirectUrl={"/learn"}>
              <Button variant="secondary" size={"lg"}>
                Get Started
              </Button>
            </SignUpButton>
            <SignInButton mode="modal" fallbackRedirectUrl={"/learn"} signUpFallbackRedirectUrl={"/learn"}>
              <Button variant="secondaryOutline" size={"lg"}>
                Already have an account
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button size={"lg"} variant={"primary"} asChild>
              <Link href={"/learn"} >
                Continue Learning
              </Link>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  )
}