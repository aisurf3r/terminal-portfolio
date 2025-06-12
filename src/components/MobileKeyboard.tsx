import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface MobileKeyboardProps {
  isVisible: boolean;
  onToggle: () => void;
  onKeyPress: (key: string) => void;
}

export const MobileKeyboard: React.FC<MobileKeyboardProps> = ({ 
  isVisible, 
  onToggle, 
  onKeyPress 
}) => {
  const commonCommands = [
    'help', 'projects', 'skills', 'contact', 'whoami', 
    'clear', 'theme', 'history'
  ];

  const shortcuts = [
    { key: 'Enter', label: '↵' },
    { key: 'Backspace', label: '⌫' },
    { key: 'Tab', label: 'Tab' },
    { key: 'ArrowUp', label: '↑' },
    { key: 'ArrowDown', label: '↓' }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-terminal-accent text-terminal-bg p-3 rounded-full shadow-lg z-50 md:hidden"
        aria-label="Show virtual keyboard"
      >
        <Keyboard size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-terminal-header border-t border-terminal-border p-4 z-50 md:hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-terminal-accent font-bold">Virtual Keyboard</h3>
        <button
          onClick={onToggle}
          className="text-terminal-muted hover:text-terminal-accent transition-colors"
          aria-label="Hide virtual keyboard"
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick Commands */}
      <div className="mb-4">
        <div className="text-terminal-muted text-sm mb-2">Quick Commands:</div>
        <div className="grid grid-cols-2 gap-2">
          {commonCommands.map((command) => (
            <button
              key={command}
              onClick={() => onKeyPress(command)}
              className="bg-terminal-hover text-terminal-text p-2 rounded text-sm font-mono border border-terminal-border hover:border-terminal-accent transition-colors"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      {/* Control Keys */}
      <div>
        <div className="text-terminal-muted text-sm mb-2">Controls:</div>
        <div className="flex flex-wrap gap-2">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.key}
              onClick={() => onKeyPress(shortcut.key)}
              className="bg-terminal text-terminal-accent p-2 rounded text-sm font-mono border border-terminal-border hover:border-terminal-accent transition-colors min-w-[48px]"
            >
              {shortcut.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
