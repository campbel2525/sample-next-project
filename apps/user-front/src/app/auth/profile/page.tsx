'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { APP_PAGES } from '@/config/settings'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (!session) {
    router.push(APP_PAGES.auth.login)
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* ヘッダー */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">マイページ</h1>
              <div className="flex gap-2">
                <Link
                  href={APP_PAGES.home}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  ホームに戻る
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  プロフィール情報
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      ユーザーID
                    </label>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                      {session.user.id}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      メールアドレス
                    </label>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                      {session.user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      名前
                    </label>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                      {session.user.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* アクション */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  アカウント設定
                </h2>
                <div className="space-y-3">
                  <Link
                    href={APP_PAGES.auth.editProfile}
                    className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded hover:bg-green-700 transition-colors"
                  >
                    プロフィールを編集
                  </Link>
                  <Link
                    href={APP_PAGES.auth.changePassword}
                    className="block w-full px-4 py-3 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors"
                  >
                    パスワードを変更
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
