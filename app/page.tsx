import EmailChangeMessage from "@/components/accountUpdate/messages/emailChange/EmailChangeMessage"
import SignUpMessage from "@/components/accountUpdate/messages/signUp/SignUpMessage"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      HOME
      <SignUpMessage />
      <EmailChangeMessage />
    </main>
  )
}
