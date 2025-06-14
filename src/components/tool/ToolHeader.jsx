import React from 'react';
import { Button } from '@/components/ui/button';
import { Terminal, BookOpen, AlertTriangle } from 'lucide-react';

const ToolHeader = ({ onHelpClick, onAlertClick }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <Terminal className="w-6 h-6 text-green-400" />
      <h2 className="text-xl font-semibold text-white">Editor de Comandos</h2>
    </div>
    <div className="flex items-center space-x-2">
       <Button
        variant="ghost"
        size="icon"
        onClick={onAlertClick}
        className="text-slate-400 hover:text-yellow-400"
      >
        <AlertTriangle className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onHelpClick}
        className="text-slate-400 hover:text-blue-400"
      >
        <BookOpen className="w-5 h-5" />
      </Button>
    </div>
  </div>
);

export default ToolHeader;