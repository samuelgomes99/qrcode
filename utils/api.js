import axios from "axios";

const API_URL = "/api/checkin"; // 🔥 Agora usamos a API local do Next.js

export async function fetchParticipantData(ticketId) {
  try {
    console.log(`📡 Buscando dados do participante para o ticket: ${ticketId}`);

    const response = await axios.get(`${API_URL}?ticketId=${ticketId}`);

    console.log("✅ Resposta da API Guru:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar participante:", error.response ? error.response.data : error.message);
    return null;
  }
}

export async function checkInParticipant(ticketId) {
  try {
    console.log(`📡 Realizando check-in para o ticket: ${ticketId}`);

    await axios.post(`${API_URL}?ticketId=${ticketId}`);

    console.log("✅ Check-in realizado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro no check-in:", error.response ? error.response.data : error.message);
    return false;
  }
}
