import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
    CrossIcon,
  Play,
  Trash2,
  X, 

} from 'lucide-react';
import { Button } from '@/components/ui/button';
const Modal = ({setCommand ,isOpen, setIsOpen, title, description, children, footer, history }) => {
const hist = JSON.parse(localStorage.getItem('history'))||"Não há histórico!!";
return (
<Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="sm:max-w-[625px] bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <DialogHeader>
            {title && (
                <DialogTitle className="text-2xl text-slate-50">{title}</DialogTitle>
            )}
            {description && (
                <DialogDescription className="text-slate-400">{description}</DialogDescription>
            )}
        </DialogHeader>
        <div className="space-y-2 text-md list-none">
            {history? hist.map((p, idx) => (
                <li  onClick={() => setCommand(p)} key={idx} className=" p-3 bg-slate-700/50 rounded-md border border-slate-600/50 hover:bg-slate-600/50 cursor-pointer flex justify-between" title={`Adicionar "${p}" ao campo de entrada`}>
                  <p className="font-mono text-yellow-300">{p}</p>
                <Trash2 onClick={console.log("Em criação...")} className="w-4 h-auto mr-2 font-bold"/>
                </li>
              )):children}
        </div>
        <DialogFooter>
            {footer ? (
                footer
            ) : (
                <Button onClick={() => setIsOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Fechar
                </Button>
            )}
        </DialogFooter>
    </DialogContent>
</Dialog>
)};

export default Modal;