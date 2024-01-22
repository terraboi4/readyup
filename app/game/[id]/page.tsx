'use client'

import { useSearchParams } from "next/navigation"

export default function Game({params}:{params: {id:String}}) {
    
    const searchParams = useSearchParams()

    const username = searchParams.get('username')

    return (
        <div className="h-screen flex items-center justify-center flex-col space-y-20">
            <p className="font-bold text-3xl">{username}</p><p>Waiting for host to start the game...</p>
        </div>
    )
}