import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Terminal as TerminalIcon, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../hooks/useSound';
import { TypingAnimation } from './TypingAnimation';

interface TerminalProps {
  onCommand: (command: string, args: string[]) => void;
  output: React.ReactNode[];
  isProcessing: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ onCommand, output, isProcessing }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { playBell, playKeypress } = useSound();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({
        top: outputRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    if (soundEnabled) playBell();
    
    const [command, ...args] = input.trim().split(' ');
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    onCommand(command.toLowerCase(), args);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (soundEnabled && e.key.length === 1) playKeypress();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();

      const commands = [
        'help', 'whoami', 'projects', 'skills', 'contact', 
        'history', 'theme', 'man', 'clear', 'logout'
      ];

      const currentInput = input.trim().toLowerCase();
      if (!currentInput) {
        setInput('help');
        return;
      }

      // Split input to handle commands with modifiers
      const [commandPart] = currentInput.split(' ');

      const matches = commands.filter(cmd => cmd.startsWith(commandPart));

      if (matches.length === 1) {
        // Single match: complete the command, preserve any modifier
        const [_, ...rest] = input.split(' ');
        setInput(rest.length > 0 ? `${matches[0]} ${rest.join(' ')}` : matches[0]);
      } else if (matches.length > 1) {
        // Multiple matches: find longest common prefix
        let commonPrefix = matches[0];
        for (let i = 1; i < matches.length; i++) {
          let j = 0;
          while (j < commonPrefix.length && 
                 j < matches[i].length && 
                 commonPrefix[j] === matches[i][j]) {
            j++;
          }
          commonPrefix = commonPrefix.substring(0, j);
        }

        if (commonPrefix.length > commandPart.length) {
          // Complete to common prefix, preserve any modifier
          const [_, ...rest] = input.split(' ');
          setInput(rest.length > 0 ? `${commonPrefix} ${rest.join(' ')}` : commonPrefix);
        }
      }
    }
  };

  const handleFocus = (e: React.MouseEvent) => {
    // Only focus input if clicking on terminal background, not on interactive elements
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('form, input, textarea, button, a, [role="button"]');
    
    if (!isInteractiveElement && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-container h-full flex flex-col bg-terminal text-terminal-text font-mono">
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between p-2 bg-terminal-header border-b border-terminal-border">
        <div className="flex items-center space-x-2">
          <TerminalIcon size={16} className="text-terminal-accent" />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 hover:bg-terminal-hover rounded transition-colors"
            aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="terminal-output flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-terminal scrollbar-thumb-terminal-accent"
        onClick={handleFocus}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {output.map((line, index) => (
          <div key={index} className="mb-2">
            {line}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex items-center space-x-2">
            <TypingAnimation text="Processing" />
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Input - Now positioned above footer */}
      <form onSubmit={handleSubmit} className="terminal-input p-4 border-t border-terminal-border"> 
        <div className="flex items-center space-x-2">
          <span className="text-terminal-accent flex-shrink-0">aisurf3r@portfolio:~$</span>
          <ChevronRight size={16} className="text-terminal-accent flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-text caret-terminal-accent border-none focus:ring-0 focus:outline-none"
            placeholder="Type 'help' for available commands..."
            autoComplete="off"
            spellCheck="false"
            aria-label="Command input"
          />
        </div> 
      </form>
    </div>
  );
};