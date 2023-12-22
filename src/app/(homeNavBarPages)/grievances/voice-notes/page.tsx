import VoiceRecorder from "@/components/voice-recorder";

export default function VoiceNote() {
    return <div>
        <br/>Voice Note
        <br/>Audio recordings sharing personal stories and concerns.
        <br/>A play button for each voice note and a transcript for accessibility.
        <div>
            <h1>Voice Recorder</h1>
            <VoiceRecorder/>
        </div>
    </div>
}
export const metadata = {
    title: `Grievances: Audio recordings sharing personal stories and concerns.`
}
