'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { APP_PAGES } from '@/config/settings'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              サンプルアプリケーション
            </h1>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300">
                    こんにちは、{session.user.name || session.user.email}さん
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {session ? (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                ダッシュボード
              </h2>
              <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
                <p className="text-green-800 dark:text-green-200">
                  ✅ NextAuth.jsによる認証が正常に動作しています！
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2 text-gray-900 dark:text-white">
                  <p><strong>ユーザーID:</strong> {session.user.id}</p>
                  <p><strong>メールアドレス:</strong> {session.user.email}</p>
                  <p><strong>名前:</strong> {session.user.name}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <Link
                    href={APP_PAGES.auth.profile}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    マイページ
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                ようこそ
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                このアプリケーションを使用するにはログインが必要です。
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ログインページへ
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
