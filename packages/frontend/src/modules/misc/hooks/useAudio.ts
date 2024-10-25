import { useEffect, useState } from "react";

export const useAudio = (path: string, shouldStart: boolean) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!shouldStart) return;
    const audio = new Audio(path);

    audio.addEventListener("canplaythrough", () => {
      setReady(true);
      audio.play();
    });

    return () => {
      audio.pause();
    };
  }, [path, shouldStart]);

  return { ready };
};
