'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { APP_PAGES } from '@/config/settings'

export default function EditProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    // バリデーション
    if (!name.trim()) {
      setError('名前は必須です')
      setIsLoading(false)
      return
    }

    if (!email.trim()) {
      setError('メールアドレスは必須です')
      setIsLoading(false)
      return
    }

    // 簡単なメールバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('有効なメールアドレスを入力してください')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'プロフィールの更新に失敗しました')
        return
      }

      // セッションを更新
      await update({
        name: name.trim(),
        email: email.trim(),
      })

      setSuccess(true)
    } catch (err) {
      setError('プロフィール更新中にエラーが発生しました')
      console.error('Update profile error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          {/* ヘッダー */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">プロフィール編集</h1>
              <Link
                href={APP_PAGES.auth.profile}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ← 戻る
              </Link>
            </div>
          </div>

          {/* フォーム */}
          <div className="px-6 py-6">
            {success && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded">
                <p className="text-green-800 dark:text-green-200">
                  プロフィールが正常に更新されました。
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  名前
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前を入力してください"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレスを入力してください"
                />
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded p-3">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>注意:</strong> メールアドレスを変更した場合、次回ログイン時は新しいメールアドレスを使用してください。
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '更新中...' : 'プロフィールを更新'}
                </button>
                <Link
                  href={APP_PAGES.auth.profile}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
                >
                  マイページに戻る
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
