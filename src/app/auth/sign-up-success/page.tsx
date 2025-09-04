import Link from 'next/link'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { Button } from '~/components/ui/button'
import { WarpBackground } from '~/components/ui/warp-background'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <WarpBackground 
          className="w-full max-w-md border-0 bg-transparent p-0"
          perspective={800}
          beamsPerSide={5}
          beamSize={8}
          beamDelayMax={4}
          beamDelayMin={0}
          beamDuration={4}
          gridColor="rgba(255, 255, 255, 0.1)"
        >
          <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/50">
              {/* 装饰性背景元素 */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-green-50"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative p-8">
                {/* 标题区域 */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-2">
                    注册成功！
                  </h1>
                  <p className="text-gray-600 text-lg">请检查您的邮箱并点击确认链接</p>
                </div>

                <div className="space-y-6">
                  {/* 成功信息 */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-green-700 font-medium">
                      我们已向您的邮箱发送了确认链接。请点击链接来激活您的账户。
                    </p>
                  </div>

                  {/* 返回登录按钮 */}
                  <Link href="/auth/sign-in" className="block">
                    <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                      返回登录
                    </Button>
                  </Link>

                  {/* 提示信息 */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      没有收到邮件？请检查垃圾邮件文件夹
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WarpBackground>
      </main>
      
      <Footer />
    </div>
  )
}
