'use client'
import React from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'

const SigninButton = () => {
  const { data: session } = useSession()

  return (
    <div>
      <div>
        {session && session.user ? (
          <div className="flex gap-4 align-baseline">
            <Avatar className="border-2 border-blue-600">
              <AvatarImage
                src={`${
                  session.user.image
                    ? session.user.image
                    : 'https://github.com/shadcn.png'
                }`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              variant="default"
              onClick={() => {
                signOut()
              }}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            onClick={() => {
              signIn()
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}

export default SigninButton
