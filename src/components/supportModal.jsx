// components/SupportModal.jsx
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Heart, Check } from "lucide-react";

const messages = {
  en: {
    title: "Support the Project",
    intro:
      "If you like the tool and want to help keep it alive and improving, consider supporting:",
    pixLabel: "PIX",
    pixCopyTitle: "Click to copy the PIX key",
    pixCopied: "Copied!",
    paypalButton: "Support with PayPal",
    noticesTitle: "Notices & Updates:",
    notices: [
      "New features launching soon.",
      "Updates to improve user experience.",
      "Integrated chat support in development.",
    ],
    close: "Close",
    copyError: "Couldn't copy the PIX key. Please try manually.",
  },
  pt: {
    title: "Apoie o Projeto",
    intro:
      "Se você gosta da ferramenta e quer ajudar a mantê-la viva e em constante melhoria, considere apoiar:",
    pixLabel: "PIX",
    pixCopyTitle: "Clique para copiar o PIX",
    pixCopied: "Copiado!",
    paypalButton: "Apoiar com PayPal",
    noticesTitle: "Avisos e Novidades:",
    notices: [
      "Breve lançamento de novas funcionalidades.",
      "Atualizações para melhorar a experiência do usuário.",
      "Suporte via chat integrado em desenvolvimento.",
    ],
    close: "Fechar",
    copyError: "Não foi possível copiar o PIX. Tente manualmente.",
  },
};

const SupportModal = ({ isOpen, onOpenChange, language = "pt" }) => {
  const {
    title,
    intro,
    pixLabel,
    pixCopyTitle,
    pixCopied,
    paypalButton,
    noticesTitle,
    notices,
    close,
    copyError,
  } = messages[language] || messages.pt;

  const pixKey = "meuemail@pix.com"; // Atualize com sua chave PIX real
  const [copied, setCopied] = useState(false);

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert(copyError);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800/90 backdrop-blur-md border border-slate-700 text-slate-100 max-w-md mx-auto">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-6 h-6 text-pink-400" aria-hidden="true" />
            <AlertDialogTitle className="text-2xl font-semibold">{title}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <div className="text-slate-300 text-sm space-y-4">
          <p>{intro}</p>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <strong>{pixLabel}:</strong>
              <code
                className="text-yellow-300 cursor-pointer select-all bg-yellow-900/30 px-2 py-1 rounded hover:bg-yellow-800 transition"
                onClick={handleCopyPix}
                title={pixCopyTitle}
                aria-label={pixCopyTitle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCopyPix();
                }}
              >
                {pixKey}
              </code>
              <span aria-live="polite" className="flex items-center text-green-400 w-16">
                {copied && <Check className="w-5 h-5 mr-1" title={pixCopied} aria-hidden="true" />}
                {copied && <span className="sr-only">{pixCopied}</span>}
              </span>
            </p>
            <img
              src="/assets/pix-qr.png" // atualize para o caminho correto do seu QR code
              alt="QR Code para pagamento via PIX"
              className="w-40 rounded mx-auto shadow-lg"
            />
          </div>

          <div className="text-center mt-4">
            <a
              href="https://www.paypal.com/donate?hosted_button_id=SEU_ID" // atualize seu link real
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-medium transition"
            >
              {paypalButton}
            </a>
          </div>

          <div className="mt-6 p-4 bg-slate-700 rounded text-yellow-300 border border-yellow-400">
            <strong>{noticesTitle}</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {notices.map((notice, i) => (
                <li key={i}>{notice}</li>
              ))}
            </ul>
          </div>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogAction
            onClick={onOpenChange}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white transition"
          >
            {close}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SupportModal;
