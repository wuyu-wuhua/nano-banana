'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { LoginForm } from '~/components/auth/login-form'
import { WarpBackground } from '~/components/ui/warp-background'

export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <SignInContent />
    </Suspense>
  )
}

function SignInContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <WarpBackground 
        className="flex-1 flex items-center justify-center p-6 md:p-10 pt-20 md:pt-32 bg-white"
        perspective={800}
        beamsPerSide={4}
        beamSize={10}
        beamDelayMax={3}
        beamDelayMin={0}
        beamDuration={5}
        gridColor="rgba(0, 0, 0, 0.05)"
      >
        <div className="w-full max-w-md">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </WarpBackground>
      
      <Footer />
    </div>
  )
}
