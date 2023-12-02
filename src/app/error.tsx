"use client"
interface ErrorPageProps {
    error:Error,
    reset:()=>void,
}

export default function Error({error,reset}:ErrorPageProps) {
    return <div>Error
    <button onClick={reset}>REset</button></div>
}
