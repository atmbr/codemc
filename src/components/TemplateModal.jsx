
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
import { Package } from 'lucide-react';

const TemplateModal = ({ isOpen, setIsOpen, title, description, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-3">
            <Package className="w-7 h-7 text-blue-400" />
            <DialogTitle className="text-2xl text-slate-50">{title || "Modal Template"}</DialogTitle>
          </div>
          {description && (
            <DialogDescription className="text-slate-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="my-4 max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateModal;
