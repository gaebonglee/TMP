// hooks/useScript.js

import { useEffect, useState } from "react";

const useScript = (src) => {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);

      const setLoaded = () => setStatus("ready");
      const setError = () => setStatus("error");

      script.addEventListener("load", setLoaded);
      script.addEventListener("error", setError);

      return () => {
        script.removeEventListener("load", setLoaded);
        script.removeEventListener("error", setError);
      };
    }

    setStatus(script.getAttribute("data-status") || "loading");
  }, [src]);

  return status;
};

export default useScript;
