import { createContext, ReactNode, useState } from "react";

interface HomeContextData {
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    configAudio: ()=>void;
    toonglePlayPause: ()=> void;
    toongleMute: ()=> void;
    configVolume: (value: number) => void;
    configCurrentTime: (value: number) => void;
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

    const configAudio = () => {
        const audioInicial = new Audio("/audios/audio3.mp3");
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
            configAudio,
            toonglePlayPause,
            toongleMute,
            configVolume,
            configCurrentTime
        }}>
        {children}
        </HomeContext.Provider>
    );
}

export default HomeContextProvider;