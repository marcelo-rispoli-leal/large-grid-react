import { useEffect, useState } from "react";

export default function useUnmountProgressBar(progress, delay = 3000) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setShow(false), delay);
      return () => clearTimeout(timer);
    }
  }, [progress, delay]);

  return show;
}
