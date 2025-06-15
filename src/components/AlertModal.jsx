
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

const AlertModal = ({ isOpen, onOpenChange, title, children }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800/90 backdrop-blur-md border-slate-700 text-slate-100">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Info className="w-6 h-6 text-yellow-400" />
            <AlertDialogTitle className="text-2xl text-slate-50">{title}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <div className="text-slate-300 text-sm">
          {children}
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
