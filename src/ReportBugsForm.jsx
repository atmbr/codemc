import React from 'react';
import { AtSignIcon } from 'lucide-react';
const ReportBugsForm = () => {
  return (
    <form
      action="https://formsubmit.co/contatoatomicsan@gmail.com"
      method="POST"
      className="bg-card backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
        <div className="flex items-center space-x-3 mb-4">
        <AtSignIcon className="w-6 h-6 text-orange-400" />
        <h3 className="text-xl font-semibold text-white">Contate-nos</h3>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-slate-200">
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-300 border border-slate-600 text-slate-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="bg-300 border border-slate-600 text-slate-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-sm font-medium text-slate-200">
          Tipo de solicitação
        </label>
        <select
          id="type"
          name="type"
          className="bg-300 border border-slate-600 text-slate-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="bug">Reportar Bug</option>
          <option value="duvida">Dúvida</option>
          <option value="sugestao">Sugestão</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-slate-200">
          Mensagem <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          className="bg-300 border border-slate-600 text-slate-100 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Enviar
      </button>
    </form>
  );
};

export default ReportBugsForm;
