
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Info } from 'lucide-react';
import displayMessage from '@/alertdata'
const AlertModal = ({ isOpen, onOpenChange, title, children }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Info className="w-6 h-6 text-yellow-400" />
            <AlertDialogTitle className="text-2xl text-slate-50">Melhorias na Ferramenta!</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <div className="text-slate-300 text-sm">
          <p className="mb-2">Veja algumas atualizações:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            {displayMessage.novidades.content.map((p, idx) => (
              <li key={idx}>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">{displayMessage.novidades.footer}</p>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction
            onClick={onOpenChange}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Entendi!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
