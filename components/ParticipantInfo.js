import React from 'react';

export default function ParticipantInfo({ participant, onCheckIn, loading, success }) {
  return (
    <div className="mt-6 p-5 bg-dark-500 rounded border border-dark-300 shadow-md animate-fade-in">
      <div className="flex items-start space-x-4 mb-4 pb-3 border-b border-dark-300">
        <div className="rounded-md bg-primary-600 bg-opacity-25 p-2">
          <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-white truncate">{participant.name}</h3>
          <p className="text-gray-400 text-xs">Participante</p>
        </div>
      </div>

      <div className="space-y-2 mb-5 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 w-20">Email:</span>
          <span className="text-gray-300 flex-1 truncate">{participant.email}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 w-20">Telefone:</span>
          <span className="text-gray-300">{participant.phone_local_code} {participant.phone_number}</span>
        </div>
      </div>

      {success ? (
        <div className="p-3 bg-opacity-20 rounded border border-primary-700 text-center bg-primary-900">
          <svg className="h-6 w-6 mx-auto text-primary-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-primary-400 font-medium text-sm">Check-in realizado com sucesso</p>
        </div>
      ) : (
        <button
          onClick={onCheckIn}
          disabled={loading}
          className={`w-full px-4 py-3 ${loading ? 'bg-dark-300' : 'bg-primary-600 hover:bg-primary-700'} text-white font-medium rounded transition-all shadow-md flex items-center justify-center`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Confirmar Check-in
            </span>
          )}
        </button>
      )}
    </div>
  );
}
