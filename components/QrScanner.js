import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function QrScanner({ onScan }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS device
    const iosDetection = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    };
    iosDetection();
    
    // Custom styles for the scanner
    const style = document.createElement('style');
    style.innerHTML = `
      #qr-reader {
        border: none !important;
        padding: 0 !important;
        width: 100% !important;
        box-shadow: none !important;
        background: transparent !important;
      }
      #qr-reader__scan_region {
        background: rgba(0, 0, 0, 0.3) !important;
        border-radius: 4px !important;
        min-height: 220px !important;
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
        word-break: break-word !important;
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
      #html5-qrcode-button-camera-permission {
        margin-bottom: 10px !important;
      }
    `;
    document.head.appendChild(style);

    try {
      // Scanner configuration
      const config = { 
        fps: 10, 
        qrbox: { width: 220, height: 220 },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      };

      // Special handling for iOS
      if (isIOS) {
        // iOS often needs specific camera handling
        config.experimentalFeatures = {
          useBarCodeDetectorIfSupported: true
        };
      }

      const scanner = new Html5QrcodeScanner("qr-reader", config, /* verbose= */ false);

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          scanner.clear().catch(error => console.error("Failed to clear scanner:", error));
        },
        (errorMessage) => {
          console.error("QR Scanner error:", errorMessage);
          // Don't set UI error for normal scanning errors
          if (errorMessage.includes("NotAllowedError") || errorMessage.includes("NotFoundError")) {
            setError("Acesso à câmera negado ou não encontrada. Verifique as permissões.");
          } else if (errorMessage.includes("NotReadableError") || errorMessage.includes("TrackStartError")) {
            setError("Não foi possível acessar a câmera. Ela pode estar em uso por outro aplicativo.");
          }
        }
      );

      return () => {
        scanner.clear().catch(error => console.error("Failed to clear scanner:", error));
        document.head.removeChild(style);
      };
    } catch (err) {
      console.error("Error initializing QR scanner:", err);
      setError("Não foi possível inicializar o scanner. Seu navegador pode não ser compatível.");
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [onScan, isIOS]);

  return (
    <div className="qr-scanner-container">
      <p className="mb-4 text-gray-400 text-sm">Posicione o QR Code na câmera</p>
      
      {error && (
        <div className="mb-4 p-3 bg-dark-600 border border-primary-700 rounded-md text-sm">
          <p className="text-primary-400 mb-2">Erro ao acessar a câmera</p>
          <p className="text-gray-400 text-xs">{error}</p>
          <p className="text-gray-400 text-xs mt-2">
            Tente utilizar outro navegador como Chrome ou Safari.
            {isIOS && " No iOS, verifique se permitiu acesso à câmera nas configurações."}
          </p>
        </div>
      )}
      
      <div id="qr-reader" ref={scannerRef} className="mx-auto"></div>
    </div>
  );
}