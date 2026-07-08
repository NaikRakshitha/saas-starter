import type { Metadata } from 'next'
import { LayoutClient } from './layout-client'
import './globals.css'

export const metadata: Metadata = {
  title: 'SaaS Starter',
  description: 'Build your SaaS fast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}