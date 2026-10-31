"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Smartphone, Wifi, ExternalLink } from "lucide-react";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkUrl: string;
}

export function QrCodeModal({ isOpen, onClose, networkUrl }: QrCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(networkUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#05070f",
          light: "#ffffff",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [isOpen, networkUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(networkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Open on iPhone 16e
            </h3>
            <p className="text-xs text-slate-400">
              Scan with your Camera app on the local network
            </p>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white mb-4 shadow-inner">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR code to open on mobile"
              className="w-56 h-56 rounded-lg"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-500 font-mono text-xs">
              Generating QR Code...
            </div>
          )}
          <span className="font-mono text-[10px] text-slate-600 mt-2">
            Points to iPhone 16e optimized mobile shell
          </span>
        </div>

        {/* Network URL Pill */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/10 mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-mono text-xs text-slate-200 truncate select-all">
              {networkUrl}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-[11px] text-sky-200/90 leading-relaxed space-y-1">
          <p className="font-semibold text-sky-100 flex items-center gap-1">
            <span>💡 Instructions:</span>
          </p>
          <p>
            1. Ensure your iPhone is connected to the same Wi-Fi network.
          </p>
          <p>
            2. Open the default Camera app on your iPhone and point it at the QR code.
          </p>
          <p>
            3. Tap the yellow link banner to launch the mobile study view.
          </p>
        </div>
      </div>
    </div>
  );
}
