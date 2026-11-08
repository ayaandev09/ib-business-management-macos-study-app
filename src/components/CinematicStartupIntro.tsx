"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LiquidGlassLogo } from "./liquid-glass-logo";

const APP_LOGO_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImliRW1lcmFsZEdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYTdmM2QwIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjMwJSIgc3RvcC1jb2xvcj0iIzM0ZDM5OSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI3MCUiIHN0b3AtY29sb3I9IiMwNTk2NjkiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA2NGUzYiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImliRW1lcmFsZEF1cmEiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMGI5ODEiIHN0b3Atb3BhY2l0eT0iMC40IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzA1OTY2OSIgc3RvcC1vcGFjaXR5PSIwLjE1IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNjRlM2IiIHN0b3Atb3BhY2l0eT0iMCIgLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImliU2FwcGhpcmVHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzdkZDNmYyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMwMjg0YzciIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA3NTk4NSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImliSmFkZUdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDU5NjY5IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzA0Nzg1NyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDY0ZTNiIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iaWJHb2xkVmVjdG9yIiB4MT0iMCUiIHkxPSIxMDAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y1OWUwYiIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI2MCUiIHN0b3AtY29sb3I9IiNmYmJmMjQiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZlZjA4YSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjQwIiBmaWxsPSJ1cmwoI2liRW1lcmFsZEF1cmEpIiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjMwIiBmaWxsPSIjMDYxMjFhIiBzdHJva2U9InVybCgjaWJFbWVyYWxkR3JhZCkiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLW9wYWNpdHk9IjAuOTUiIC8+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIyMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI4IDgiIHN0cm9rZS1vcGFjaXR5PSIwLjY1IiAvPgogIDxsaW5lIHgxPSIyNTYiIHkxPSI1NiIgeDI9IjI1NiIgeTI9IjQ1NiIgc3Ryb2tlPSIjMDU5NjY5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLWRhc2hhcnJheT0iNCA2IiAvPgogIDxsaW5lIHgxPSI1NiIgeTE9IjI1NiIgeDI9IjQ1NiIgeTI9IjI1NiIgc3Ryb2tlPSIjMDU5NjY5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLWRhc2hhcnJheT0iNCA2IiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMTcwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMjg0YzciIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLW9wYWNpdHk9IjAuNCIgLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDI4NGM3IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjQiIC8+CiAgPHJlY3QgeD0iMTMwIiB5PSIyNzAiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMTAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2liSmFkZUdyYWQpIiBzdHJva2U9IiMzNGQzOTkiIHN0cm9rZS13aWR0aD0iMiIgLz4KICA8cmVjdCB4PSIxOTQiIHk9IjIyMCIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjE2MCIgcng9IjgiIGZpbGw9InVybCgjaWJFbWVyYWxkR3JhZCkiIHN0cm9rZT0iI2E3ZjNkMCIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDxyZWN0IHg9IjI1OCIgeT0iMTcwIiB3aWR0aD0iNDYiIGhlaWdodD0iMjEwIiByeD0iOCIgZmlsbD0idXJsKCNpYlNhcHBoaXJlR3JhZCkiIHN0cm9rZT0iIzdkZDNmYyIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDxyZWN0IHg9IjMyMiIgeT0iMTIwIiB3aWR0aD0iNDYiIGhlaWdodD0iMjYwIiByeD0iOCIgZmlsbD0idXJsKCNpYlNhcHBoaXJlR3JhZCkiIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLXdpZHRoPSIyLjUiIC8+CiAgPHBhdGggZD0iTSAxMjAgMzQwIFEgMjIwIDI4MCwgMjcwIDE5MCBUIDM4NCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNpYkdvbGRWZWN0b3IpIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICA8cG9seWdvbiBwb2ludHM9IjM4NCwxMDAgMzU0LDEwNiAzNzYsMTI4IiBmaWxsPSIjZmVmMDhhIiBzdHJva2U9IiNkOTc3MDYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICA8Y2lyY2xlIGN4PSIxNTMiIGN5PSIyNzAiIHI9IjYiIGZpbGw9IiNmZWYwOGEiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogIDxjaXJjbGUgY3g9IjIxNyIgY3k9IjIyMCIgcj0iNiIgZmlsbD0iI2ZlZjA4YSIgc3Ryb2tlPSIjZDk3NzA2IiBzdHJva2Utd2lkdGg9IjIiIC8+CiAgPGNpcmNsZSBjeD0iMjgxIiBjeT0iMTcwIiByPSI2IiBmaWxsPSIjZmVmMDhhIiBzdHJva2U9IiNkOTc3MDYiIHN0cm9rZS13aWR0aD0iMiIgLz4KICA8Y2lyY2xlIGN4PSIzNDUiIGN5PSIxMjAiIHI9IjciIGZpbGw9IiNmZWYwOGEiIHN0cm9rZT0iI2Q5NzcwNiIgc3Ryb2tlLXdpZHRoPSIyIiAvPgo8L3N2Zz4=";

interface CinematicStartupIntroProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen = true,
  onClose,
  onComplete,
}) => {
  const isDismissingRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    onClose?.();
    onComplete?.();
  }, [onClose, onComplete]);

  // Automatic dismiss after the liquid glass simulation finishes (~4.5s)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isOpen, handleDismiss]);

  // Keyboard shortcut listener (Space, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 select-none overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "#020704",
        backgroundImage: `radial-gradient(ellipse at 12% 8%, rgba(21, 128, 61, 0.32) 0%, transparent 46%), radial-gradient(ellipse at 88% 12%, rgba(202, 138, 4, 0.24) 0%, transparent 46%), radial-gradient(ellipse at 50% 108%, rgba(22, 101, 52, 0.35) 0%, transparent 62%), linear-gradient(180deg, #020704 0%, #06150c 52%, #020704 100%)`,
      }}
    >
      {/* Center Liquid Glass Logo Animation */}
      <div className="relative w-full max-w-3xl flex flex-col items-center justify-center pointer-events-none">
        <div className="w-full h-72 sm:h-80 flex items-center justify-center">
          <LiquidGlassLogo
            logo={APP_LOGO_SVG}
            mark="logo"
            text="IB BUSINESS"
            ending="wordmark"
            fontSize={48}
            fontFamily="'Cinzel', 'Times New Roman', Georgia, serif"
            fontWeight={800}
            letterSpacing={0.08}
            theme="dark"
            logoColor="original"
            logoRelief={0.8}
            textColor="#dcfce7"
            tileColor="#05180f"
            background="transparent"
            depth={1.3}
            dispersion={1.15}
            relief={1.0}
            caustics={1.35}
            highlights={1.25}
            bloom={0.55}
            speed={1.0}
            loop={false}
            style={{ background: "transparent" }}
            className="w-full h-full"
          />
        </div>

        {/* Elegant Minimalist Wordmark Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-col items-center gap-1.5 text-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-emerald-300 uppercase">
              EXECUTIVE CODEX · IB DIPLOMA PROGRAMME
            </span>
          </div>
          <p className="text-xs text-emerald-200/50 font-serif italic">
            Strategy · Finance · Marketing · Operations · HRM
          </p>
        </motion.div>
      </div>

      {/* Subtle Bottom Skip Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 inset-x-0 text-center pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Click anywhere or press Space to continue
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CinematicStartupIntro;
