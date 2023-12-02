import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "@/app/ThemeProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Luo.com',
    description: 'Our Culture, our pride',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>

    )
}
