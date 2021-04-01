import { createContext, ReactNode, useState } from "react";

interface HomeContextData {
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    audioIndex: number;
    configAudio: ()=>void;
    toonglePlayPause: ()=> void;
    toongleMute: ()=> void;
    configVolume: (value: number) => void;
    configCurrentTime: (value: number) => void;
    setupAudio: (value: number) => void;
}

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContext = createContext({} as HomeContextData);

const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTimeTotal] = useState(0);
    const [audioIndex, setAudioIndex] = useState(0);

    const configAudio = () => {
        updateAudio(0);
    }

    const setupAudio = (index: number) => {
        pause();
        setIsPlaying(false);
        setCurrentTime(0);
        updateAudio(index);
    }

    const updateAudio = (index: number) => {
        const currentAudioIndex = index % 3;
        const audioInicial = new Audio(`/audios/audio${currentAudioIndex + 1}.mp3`);
        setCurrentTime(0);
        setAudioIndex(index);
        setAudio(audioInicial);

        audioInicial.onloadeddata = ()=> {
            setTimeTotal(audioInicial.duration);
        }

        audioInicial.ontimeupdate = ()=> {
            setCurrentTime(audioInicial.currentTime);
        }
    }

    const toonglePlayPause = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        }
        else {
            play();
            setIsPlaying(true);
        }
    }

    const play = ()=> {
        audio.play();
    }

    const pause = ()=> {
        audio.pause();
    }

    const toongleMute = () => {
        const muted = !audio.muted;
        setIsMute(muted);
        audio.muted = muted;
    }

    const configVolume = (value: number) => {
        setVolume(value);
        audio.volume = value;
    }

    const configCurrentTime = (value: number) => {
        setCurrentTime(value);
        audio.currentTime = value;
    }

    return (
        <HomeContext.Provider value={{
            isPlaying,
            isMute,
            volume,
            currentTime,
            totalTime,
            audioIndex,
            configAudio,
            toonglePlayPause,
            toongleMute,
            configVolume,
            configCurrentTime,
            setupAudio
        }}>
        {children}
        </HomeContext.Provider>
    );
}

export default HomeContextProvider;