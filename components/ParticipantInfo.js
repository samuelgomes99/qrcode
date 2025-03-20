export default function ParticipantInfo({ participant, onCheckIn }) {
    return (
      <div className="mt-4 text-center">
        <p><strong>Nome:</strong> {participant.nome}</p>
        <p><strong>Email:</strong> {participant.email}</p>
        <button
          onClick={onCheckIn}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Realizar Check-in
        </button>
      </div>
    );
  }
  