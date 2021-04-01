import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import styles from '../../styles/Home.module.css';
import {Icon} from '@material-ui/core';
import {secondsToTimeString} from '../utils/converter';

export default function Home() {
  const {
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
        
          </div>
        </div>
        <div className={styles.controles}>
            <div className={styles.audioDetails}>

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
              <input 
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
