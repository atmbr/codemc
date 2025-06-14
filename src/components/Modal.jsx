import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Modal = ({ isOpen, setIsOpen, title, description, children, footer }) => (
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
        <div className="my-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {children}
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
);

export default Modal;