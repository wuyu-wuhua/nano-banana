import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import { AuthProvider } from '../contexts/auth-context'
import CookieConsent from '../components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nano Banana - AI Image Generator | Create Art from Text',
  description: 'Transform words into stunning images with Nano Banana AI. Generate unique artwork from text in seconds. Professional AI technology for creators.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>       
        {/* 条件加载追踪脚本 - 只在用户同意后加载 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 检查用户Cookie同意状态
              (function() {
                const consentChoice = localStorage.getItem('nano_cookie_consent');
                const silentMode = localStorage.getItem('nano_silent_mode');
                
                // 如果用户拒绝或静默模式，阻止所有追踪脚本
                if (consentChoice === 'rejected' || silentMode === 'true') {
                  // 阻止Google Analytics
                  window['ga-disable-G-6KPSN56CS9'] = true;
                  
                  // 阻止Google Tag Manager
                  window.dataLayer = [];
                  window.gtag = function() {};
                  
                  // 阻止Microsoft Clarity
                  window.clarity = function() {};
                  
                  console.log('🔒 Tracking scripts blocked due to user consent choice');
                  return;
                }
                
                // 如果用户同意，加载追踪脚本
                if (consentChoice === 'accepted') {
                  // 动态加载Google Analytics
                  const gaScript = document.createElement('script');
                  gaScript.async = true;
                  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-6KPSN56CS9';
                  document.head.appendChild(gaScript);
                  
                  const gaConfig = document.createElement('script');
                  gaConfig.innerHTML = \`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-6KPSN56CS9');
                  \`;
                  document.head.appendChild(gaConfig);
                  
                  // 动态加载Microsoft Clarity
                  const clarityScript = document.createElement('script');
                  clarityScript.type = 'text/javascript';
                  clarityScript.innerHTML = \`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "svhm05r3kw");
                  \`;
                  document.head.appendChild(clarityScript);
                  
                  console.log('✅ Tracking scripts loaded with user consent');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            {children}
            <CookieConsent />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
