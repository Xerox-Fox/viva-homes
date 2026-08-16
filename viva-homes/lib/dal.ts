import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export async function getOnboardingStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    return { isAuthenticated: false, isCompleted: false, user: null, role: null, session: null }
  }

  const userId = session.user.id
  const role = (session.user as { role?: string }).role || "USER"

  let isCompleted = false

  if (role === "AGENT") {
    const profile = await prisma.agentProfile.findUnique({ where: { userId } })
    isCompleted = Boolean(profile?.completedAt)
  } else if (role === "HOMEOWNER") {
    const profile = await prisma.homeownerProfile.findUnique({ where: { userId } })
    isCompleted = Boolean(profile?.completedAt)
  } else {
    const profile = await prisma.userProfile.findUnique({ where: { userId } })
    isCompleted = Boolean(profile?.completedAt)
  }

  return {
    isAuthenticated: true,
    isCompleted,
    user: session.user,
    role,
    session: session.session,
  }
}

export async function verifySession() {
  const status = await getOnboardingStatus()

  if (!status.isAuthenticated || !status.user || !status.session) {
    redirect("/sign-in")
  }

  if (!status.isCompleted) {
    redirect("/onboarding")
  }

  return {
    user: status.user,
    session: status.session,
    role: status.role,
  }
}
