"use client"
import {Button} from "@/components/ui/button";

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}

export default function Error({error, reset}: ErrorPageProps) {
    return <div>Error
        <Button onClick={reset}>REset</Button></div>
}
