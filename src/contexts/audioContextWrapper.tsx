import React, {
  createContext, useContext, useMemo, useRef, useState
} from 'react';

const ReactAudioContext = createContext<{
  audioContext: AudioContext | null;
  audioAnalyser: AnalyserNode | null;
  audioElement: HTMLAudioElement | null;
  playAudio(source: string): void;
} | null>(null);
const audioElement = new Audio();

audioElement.volume = 0.5;

export function AudioContextWrapperProvider({ children }: {children: React.ReactNode}) {
  const audioElementRef = useRef<HTMLAudioElement>(audioElement);
  const audioSourceRef = useRef('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
  const value = useMemo(() => {
    let mediaElementSource: MediaElementAudioSourceNode | null = null;

    function playAudio(audioSource: string): void {
      const audioContext = audioContextRef.current ?? new AudioContext();

      if (audioSourceRef.current === audioSource) {
        return;
      }
      audioContextRef.current = audioContext;
      audioElementRef.current?.pause();
      audioElementRef.current.src = audioSource;
      audioElementRef.current.crossOrigin = 'anonymous';
      if (!mediaElementSource) {
        const newAudioAnalyser = audioContext.createAnalyser();

        mediaElementSource = audioContext.createMediaElementSource(audioElementRef.current);
        mediaElementSource.connect(newAudioAnalyser);
        newAudioAnalyser.connect(audioContext.destination);
        setAudioAnalyser(newAudioAnalyser);
      }
      audioElementRef.current.play();
      audioSourceRef.current = audioSource;
    }

    return { audioContext: audioContextRef.current, playAudio };
  }, []);
  const providerValues = useMemo(
    () => (
      { ...value, audioAnalyser, audioElement }
    ),
    [value, audioAnalyser, audioElement]
  );

  return (
    <ReactAudioContext.Provider value={providerValues}>
      {children}
    </ReactAudioContext.Provider>
  );
}

export const useAudioContext = () => useContext(ReactAudioContext);

export const useAudioAanalyser = () => {
  const audioContext = useAudioContext();

  return audioContext?.audioAnalyser;
};

export const usePlayAudio = () => {
  const audioContext = useAudioContext();

  return audioContext?.playAudio;
};

export const useAudioElement = () => {
  const audioContext = useAudioContext();

  return audioContext?.audioElement;
};
