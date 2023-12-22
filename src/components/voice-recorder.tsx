'use client'
import React, {useEffect, useState} from 'react';

const VoiceRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    let mediaRecorder: MediaRecorder | null = null;
    let audioStream: MediaStream | null = null;

    useEffect(() => {
        const startRecording = async () => {
            try {
                audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
                mediaRecorder = new MediaRecorder(audioStream);

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setAudioChunks((chunks) => [...chunks, event.data]);
                    }
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
                    const audioUrl = URL.createObjectURL(audioBlob);
                    console.log(audioUrl);
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        const stopRecording = () => {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
            }
            setIsRecording(false);
        };

        if (isRecording) {
            startRecording();
        }

        return () => {
            stopRecording();
        };
    }, [isRecording, audioChunks]);

    const toggleRecording = () => {
        if (isRecording) {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
            }
        } else {
            setAudioChunks([]);
        }

        setIsRecording(!isRecording);
    };

    return (
        <div>
            <button onClick={toggleRecording}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
        </div>
    );
};

export default VoiceRecorder;
