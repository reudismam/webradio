import { createContext, ReactNode, useEffect, useState } from "react";

interface HomeContextData {
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    audioIndex: number;
    panner;
    configAudio: ()=>void;
    toonglePlayPause: ()=> void;
    toongleMute: ()=> void;
    configVolume: (value: number) => void;
    configCurrentTime: (value: number) => void;
    updateAudio: (value: number) => void;
    configAudioIndex: (index: number) => void;
    configPanner: (index: number) => void;
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
    const [panner, setPanner] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTimeTotal] = useState(0);
    const [audioIndex, setAudioIndex] = useState(0); 
    const [gain, setGain] = useState<GainNode>(); 
    const [stered, setStereo] = useState<StereoPannerNode>();

    useEffect(() => {
        if (audio) {
            audio.onloadeddata = ()=> {
                setTimeTotal(audio.duration);
                setCurrentTime(0);

                if (isPlaying) {
                    play();
                }
            }
    
            audio.ontimeupdate = ()=> {
                setCurrentTime(audio.currentTime);
            }

            audio.onended = () => {
                //setAudioIndex(audioIndex + 1);
                updateAudio(audioIndex + 1);
            }
        }
    }, [audio])

    const configAudio = () => {
        updateAudio(0);
    }

    const updateAudio = (index: number) => {
        const newAudioIndex = index % 3;
        const updatedAudio = new Audio(`/audios/audio${newAudioIndex + 1}.mp3`);
        setAudioIndex(newAudioIndex);
        setCurrentTime(0);
        setAudio(updatedAudio);

        const audioConext = new AudioContext();
        const media = audioConext.createMediaElementSource(updatedAudio);
        const updatedGain = audioConext.createGain();
        const updatedStereo = audioConext.createStereoPanner();
        media.connect(updatedGain);
        updatedGain.connect(updatedStereo);
        updatedStereo.connect(audioConext.destination);
        
        updatedAudio.onplay = () => {
            audioConext.resume();
        }
        setGain(updatedGain);
        setStereo(updatedStereo);
    }

    const configAudioIndex = (index: number) => {
        updateAudio(index);
        setAudioIndex(index);
        setIsPlaying(false);
        audio.pause();
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
        gain.gain.value = value;
    }

    const configCurrentTime = (value: number) => {
        setCurrentTime(value);
        audio.currentTime = value;
    }
    
    const configPanner = (value: number) => {
        setPanner(value);
        stered.pan.value = value;
    }

    return (
        <HomeContext.Provider value={{
            isPlaying,
            isMute,
            volume,
            currentTime,
            totalTime,
            audioIndex,
            panner,
            configAudio,
            toonglePlayPause,
            toongleMute,
            configVolume,
            configCurrentTime,
            updateAudio,
            configAudioIndex,
            configPanner
        }}>
        {children}
        </HomeContext.Provider>
    );
}

export default HomeContextProvider;