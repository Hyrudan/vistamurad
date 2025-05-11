/* import React, { useEffect, useRef } from "react";
import MetaMaskLogo from "@metamask/logo";

const Metamask3DFox: React.FC = () => {
  const logoContainer = useRef<HTMLDivElement | null>(null);
  const logoInstance = useRef<any>(null);

  useEffect(() => {
    logoInstance.current = MetaMaskLogo({
      pxNotRatio: true,
      width: 50,
      height: 50,
      followMouse: true,
      slowDrift: false,
    });

    if (logoContainer.current) {
      logoContainer.current.appendChild(logoInstance.current.container);
    }

    return () => {
      if (logoInstance.current) {
        logoInstance.current.stopAnimation();
        if (logoContainer.current) {
          logoContainer.current.innerHTML = "";
        }
      }
    };
  }, []);

  return (
    <a
      href="https://metamask.io"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: 50,
        height: 50,
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        display: "block",
      }}
      aria-label="Go to MetaMask website"
    >
      <div
        ref={logoContainer}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />
    </a>
  );
};

export default Metamask3DFox;
*/