import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { SignUpForm } from '~/components/auth/sign-up-form'
import { WarpBackground } from '~/components/ui/warp-background'

export default function Page() {
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
          <SignUpForm />
        </div>
      </WarpBackground>
      
      <Footer />
    </div>
  )
}
