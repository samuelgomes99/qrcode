import { useState } from "react";
import QrScanner from "../components/QrScanner";
import ParticipantInfo from "../components/ParticipantInfo";
import { fetchParticipantData, checkInParticipant } from "../utils/api";

export default function CheckInPage() {
  const [ticketId, setTicketId] = useState("");
  const [participant, setParticipant] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = async (data) => {
    if (data && data !== ticketId) {
      console.log("📡 QR Code escaneado:", data);
      setTicketId(data);
      await fetchAndSetParticipant(data);
      setScanning(false);
    }
  };

  const fetchAndSetParticipant = async (ticketId) => {
    console.log("📡 Buscando participante para o ticket:", ticketId);
    const participantData = await fetchParticipantData(ticketId);
    console.log("✅ Dados do participante recebidos:", participantData);

    if (participantData) {
      setParticipant(participantData.attendee);
    } else {
      console.warn("⚠️ Nenhum participante encontrado para este ticket.");
      setParticipant(null);
    }
  };

  const handleCheckIn = async () => {
    console.log("📡 Tentando realizar check-in para o ticket:", ticketId);
    if (await checkInParticipant(ticketId)) {
      console.log("✅ Check-in confirmado para o ticket:", ticketId);
      alert("Check-in realizado com sucesso!");
    } else {
      console.error("❌ Falha ao realizar check-in.");
      alert("Erro ao realizar check-in. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 p-6 text-white">
      <div className="w-full max-w-lg p-8 bg-white text-gray-900 rounded-3xl shadow-xl text-center">
        <h1 className="text-3xl font-extrabold mb-6">Check-in do Evento</h1>
        
        {scanning ? (
          <div className="mb-6 border-4 border-dashed border-gray-300 rounded-lg p-4">
            <QrScanner onScan={handleScan} />
          </div>
        ) : (
          <button
            onClick={() => setScanning(true)}
            className="w-full px-6 py-4 bg-green-500 text-white text-xl font-bold rounded-xl hover:bg-green-600 transition shadow-lg"
          >
            📷 Escanear QR Code
          </button>
        )}

        <div className="mt-6">
          <input
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Digite o ID do Ticket"
            className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg text-gray-700 focus:ring-4 focus:ring-blue-500 shadow-sm"
          />
          <button
            onClick={() => fetchAndSetParticipant(ticketId)}
            className="mt-4 w-full px-6 py-4 bg-gray-700 text-white text-xl font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
          >
            🔍 Buscar Participante
          </button>
        </div>

        {participant && (
          <div className="mt-6 p-6 bg-gray-100 rounded-xl border border-gray-300 shadow-md">
            <p className="text-xl font-semibold text-gray-800"><strong>Nome:</strong> {participant.name}</p>
            <p className="text-lg text-gray-700"><strong>Email:</strong> {participant.email}</p>
            <p className="text-lg text-gray-700"><strong>Telefone:</strong> {participant.phone_local_code} {participant.phone_number}</p>
            <button
              onClick={handleCheckIn}
              className="mt-6 w-full px-6 py-4 bg-blue-500 text-white text-xl font-bold rounded-xl hover:bg-blue-600 transition shadow-lg"
            >
              ✅ Confirmar Check-in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
