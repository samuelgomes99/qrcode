import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QrScanner({ onScan }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    // Custom styles for the scanner
    const style = document.createElement('style');
    style.innerHTML = `
      #qr-reader {
        border: none !important;
        padding: 0 !important;
        width: 100% !important;
      }
      #qr-reader__scan_region {
        background: rgba(0, 0, 0, 0.3) !important;
        border-radius: 4px !important;
      }
      #qr-reader__dashboard_section_csr button {
        background: #EA580C !important;
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        padding: 8px 12px !important;
        font-weight: 500 !important;
        font-size: 14px !important;
      }
      #qr-reader__status_span {
        background: #181818 !important;
        color: #d1d5db !important;
        border-radius: 4px !important;
        padding: 6px !important;
        font-size: 12px !important;
      }
      #qr-reader__dashboard_section_swaplink {
        color: #F97316 !important;
        font-size: 14px !important;
      }
      select {
        background: #1a1a1a !important;
        color: #d1d5db !important;
        border: 1px solid #333333 !important;
        border-radius: 4px !important;
        padding: 4px 8px !important;
        font-size: 14px !important;
      }
    `;
    document.head.appendChild(style);

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 220, height: 220 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        formatsToSupport: [ Html5QrcodeScanner.FORMATS.QR_CODE ],
      }
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );

    return () => {
      scanner.clear();
      document.head.removeChild(style);
    };
  }, [onScan]);

  return (
    <div className="qr-scanner-container">
      <p className="mb-4 text-gray-400 text-sm">Posicione o QR Code na câmera</p>
      <div id="qr-reader" ref={scannerRef} className="mx-auto"></div>
    </div>
  );
}