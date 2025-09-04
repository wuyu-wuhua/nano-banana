'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '~/contexts/auth-context'
import { Button } from '~/components/ui/button'
import { ChevronDown, User, LogOut, Settings } from 'lucide-react'

export function UserDropdownMenu() {
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (!user) {
    return null; // 未登录时不显示任何内容
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-full transition-all duration-200 touch-manipulation"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center shadow-md">
          {user.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg sm:rounded-xl shadow-lg py-2 z-50 border border-gray-200 backdrop-blur-sm">
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 text-white text-sm sm:text-lg font-semibold flex items-center justify-center shadow-md">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate text-sm sm:text-base">{user.email}</div>
                <div className="text-xs text-gray-500">已登录</div>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              个人资料
            </Link>
          </div>
          
          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
