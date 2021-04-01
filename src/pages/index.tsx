import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import styles from '../../styles/Home.module.css';
import {Icon} from '@material-ui/core';
import {secondsToTimeString} from '../utils/converter';
import {musics} from '../data/musics';

export default function Home() {
  const {
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
    } = useContext(HomeContext);

  useEffect(()=> {
     configAudio();
  }, []);

  return (
    <>
    <Head>
    <title>Aplicação de Áudio</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className={styles.container}>
    
      <div className={styles.content}>
        <div className={styles.principal}>
          <div className={styles.barraLateral}>
      
          </div>
          <div className={styles.mainContent}>
             <div className={styles.topMenu}>
              
             </div>
             <div className={styles.musicContent}>
                <h1>It's #ThrowbackThrusday</h1>
                <div className={styles.musicDetails}>
                  {
                    musics.map((music, index) => {
                      return (
                        <div key={music.title} 
                             className={styles.musicDetail}
                             onClick={() => setupAudio(index)}
                             >
                          <img src={`capas/${music.cover}`} alt={music.title}></img>
                          <h4>{music.title}</h4>
                        </div>
                      );
                    })
                  }
                </div>
             </div>
          </div>
        </div>
        <div className={styles.controles}>
            <div className={styles.audioDetails}>
               <img src={`capas/${musics[audioIndex].cover}`}></img>
               <h4>{musics[audioIndex].title}</h4>
            </div>

            <div className={styles.audioControls}>
              {
                isPlaying ?
                 (<Icon className={styles.play} onClick={toonglePlayPause}>pause_circle_outline</Icon>):
                 (<Icon className={styles.play} onClick={toonglePlayPause}>play_circle_outline</Icon>)
              }
              <div className={styles.currentAudio}>
              {secondsToTimeString(currentTime)}
              <input className={styles.time}
                 type="range" 
                 min="0" 
                 max={totalTime} 
                 step="0.01" 
                 value={currentTime}
                 onChange={e => configCurrentTime(Number(e.target.value))}
                 />
              {secondsToTimeString(totalTime)}
              </div>
            </div>

            <div className={styles.volumeControls}>
              {
                isMute ?
                (<Icon className={styles.mute} onClick={toongleMute}>volume_off</Icon>):
                (<Icon className={styles.mute} onClick={toongleMute}>volume_up</Icon>)
              }
              <input className={styles.volume}
                 type="range" 
                 min="0" 
                 max="1" 
                 step="0.01" 
                 value={volume}
                 onChange={e => configVolume(Number(e.target.value))}
                 />
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
