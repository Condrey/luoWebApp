import type {Metadata} from 'next'
import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "@/app/ThemeProvider";
import {webPageName} from "@/lib/constants/Constants";
import {inter} from "@/app/ui/fonts";


export const metadata: Metadata = {
    title: `${webPageName}`,
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
