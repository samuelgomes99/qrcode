import axios from "axios";

const API_URL = "https://digitalmanager.guru/api/v2/etickets";
const TOKEN = "9e789ad9-cb3d-471c-b76a-d44a4fe35dcc|hWDInakOzWs8cga2EN301vpmOjK4sAqN5fi54uU01b3d36f0";

export default async function handler(req, res) {
  const { ticketId } = req.query;

  if (!ticketId) {
    return res.status(400).json({ error: "O ticketId é obrigatório" });
  }

  if (req.method === "GET") {
    try {
      console.log(`📡 Buscando participante para o ticket: ${ticketId}`);

      const response = await axios.get(`${API_URL}/${ticketId}/check-in`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      console.log("✅ Resposta da API Guru:", response.data);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar participante:", error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({ error: "Erro ao buscar participante" });
    }
  }

  if (req.method === "POST") {
    try {
      console.log(`📡 Realizando check-in para o ticket: ${ticketId}`);

      await axios.post(`${API_URL}/${ticketId}/check-in`, {}, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      console.log("✅ Check-in realizado com sucesso!");
      return res.status(200).json({ message: "Check-in realizado com sucesso!" });
    } catch (error) {
      console.error("❌ Erro no check-in:", error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({ error: "Erro ao realizar check-in" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
