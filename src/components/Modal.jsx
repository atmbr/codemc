import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { InfoIcon, Trash2 } from 'lucide-react';

const Modal = ({ setCommand, isOpen, setIsOpen, title, description, footer }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('history'));
        setHistory(Array.isArray(stored) ? stored : []);
      } catch {
        setHistory([]);
      }
    }
  }, [isOpen]);

  const deleteItem = useCallback(
    (item) => {
      if (confirm(`Apagar "${item}" do histórico?`)) {
        const updated = history.filter((h) => h !== item);
        localStorage.setItem('history', JSON.stringify(updated));
        setHistory(updated);
      }
    },
    [history]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <DialogHeader>
          {title && <DialogTitle className="text-2xl text-slate-50">{title}</DialogTitle>}
          {description && <DialogDescription className="text-slate-400">{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-2 text-md list-none">
          {history.length === 0 ? (
            <div className="flex items-center justify-center text-slate-400 font-mono text-xl p-8 bg-slate-800/40 rounded-md select-none">
              <InfoIcon className="h-6 w-6 mr-2 text-blue-400" />
              <span>Não há histórico!</span>
            </div>
          ) : (
            history.map((item, idx) => (
              <li
                key={idx}
                onClick={() => setCommand(item)}
                className="p-3 bg-slate-700/50 rounded-md border border-slate-600/50 hover:bg-slate-600/50 cursor-pointer flex justify-between"
                title={`Adicionar "${item}" ao campo de entrada`}
              >
                <p className="font-mono text-yellow-300">{item}</p>
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item);
                  }}
                  className="w-4 h-auto mr-2 font-bold text-red-400 hover:text-red-600"
                />
              </li>
            ))
          )}
        </div>

        <DialogFooter>{footer || null}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
