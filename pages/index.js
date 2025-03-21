import { useState, useEffect } from "react";
import QrScanner from "../components/QrScanner";
import ParticipantInfo from "../components/ParticipantInfo";
import { fetchParticipantData, checkInParticipant } from "../utils/api";
import Head from "next/head";

export default function CheckInPage() {
  const [ticketId, setTicketId] = useState("");
  const [participant, setParticipant] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false); // Track if search was attempted
  const [scannerError, setScannerError] = useState(false);

  const handleScan = async (data) => {
    if (data && data !== ticketId) {
      console.log("QR Code escaneado:", data);
      setTicketId(data);
      await fetchAndSetParticipant(data);
      setScanning(false);
    }
  };

  const handleScanError = (error) => {
    console.error("Scanner error:", error);
    setScannerError(true);
  };

  // Reset search attempted state when ticket ID changes
  useEffect(() => {
    setSearchAttempted(false);
  }, [ticketId]);

  const fetchAndSetParticipant = async (ticketId) => {
    if (!ticketId.trim()) return;
    
    setLoading(true);
    setSearchAttempted(true); // Mark that a search was attempted
    setCheckInSuccess(false);
    console.log("Buscando participante para o ticket:", ticketId);
    const participantData = await fetchParticipantData(ticketId);
    console.log("Dados do participante recebidos:", participantData);

    if (participantData) {
      setParticipant(participantData.attendee);
    } else {
      console.warn("Nenhum participante encontrado para este ticket.");
      setParticipant(null);
    }
    setLoading(false);
  };

  const handleCheckIn = async () => {
    setLoading(true);
    console.log("Tentando realizar check-in para o ticket:", ticketId);
    if (await checkInParticipant(ticketId)) {
      console.log("Check-in confirmado para o ticket:", ticketId);
      setCheckInSuccess(true);
    } else {
      console.error("Falha ao realizar check-in.");
      setCheckInSuccess(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background: #121212;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            -webkit-tap-highlight-color: transparent;
          }
        `}</style>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-dark-500 to-dark-600 p-4">
        <div className="w-full max-w-md p-6 bg-dark-400 text-gray-100 rounded-lg shadow-lg text-center border-t border-dark-300">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">
              Sales Experience
            </h1>
            <div className="h-1 w-16 bg-primary-500 mx-auto my-2"></div>
            <p className="text-gray-400 text-sm mt-2">Validação de Ingressos</p>
          </div>
          
          {scanning ? (
            <div className="mb-6 border border-dark-300 rounded-lg p-4 bg-dark-500">
              <QrScanner 
                onScan={handleScan} 
                onError={handleScanError} 
              />
              <button
                onClick={() => setScanning(false)}
                className="mt-4 px-4 py-2 bg-dark-300 text-white rounded hover:bg-dark-200 transition-all text-sm"
              >
                Cancelar
              </button>
              
              {scannerError && (
                <div className="mt-3 p-2 bg-dark-600 rounded text-xs text-gray-400">
                  Se tiver problemas com o scanner, digite o código do ticket manualmente.
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setScannerError(false);
                setScanning(true);
              }}
              className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded hover:bg-primary-700 transition-all shadow-md flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Escanear QR Code
            </button>
          )}

          <div className="mt-6">
            <div className="relative">
              <input
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Digite o ID do Ticket"
                className="w-full p-3 bg-dark-input border border-dark-300 rounded text-gray-200 focus:ring-1 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all text-sm"
              />
              {ticketId && (
                <button 
                  onClick={() => setTicketId("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={() => fetchAndSetParticipant(ticketId)}
              disabled={loading || !ticketId.trim()}
              className={`mt-3 w-full px-4 py-3 ${loading ? 'bg-dark-300' : 'bg-dark-300 hover:bg-dark-200'} text-white font-medium rounded transition-all shadow-md flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Participante
                </span>
              )}
            </button>
          </div>

          {loading && !participant && (
            <div className="mt-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
              <p className="mt-3 text-gray-400 text-sm">Buscando informações...</p>
            </div>
          )}

          {participant && (
            <ParticipantInfo 
              participant={participant}
              onCheckIn={handleCheckIn}
              loading={loading}
              success={checkInSuccess}
            />
          )}
          
          {!loading && searchAttempted && !participant && (
            <div className="mt-6 p-4 bg-dark-500 rounded border border-dark-300">
              <p className="text-gray-400 text-sm">Nenhum participante encontrado para este ticket.</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          Sales Experience © {new Date().getFullYear()} - Validação de Ingressos
        </div>
      </div>
    </>
  );
}
