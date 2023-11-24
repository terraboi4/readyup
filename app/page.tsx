import { UserButton } from "@clerk/nextjs"



export default function Home() {
  return (
    <div>
      <a href="/home" className="link">Home</a>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
