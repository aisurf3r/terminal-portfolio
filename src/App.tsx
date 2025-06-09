import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Terminal } from './components/Terminal';
import { CommandProcessor } from './components/CommandProcessor';
import { StatusBar } from './components/StatusBar';
import { MobileKeyboard } from './components/MobileKeyboard';
import { LoadingScreen } from './components/LoadingScreen';
import { asciiArt } from './data/portfolioData';

function App() {
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileKeyboard, setShowMobileKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOutput([
        <div key="welcome" className="welcome-message">
          <pre className="text-terminal-accent text-xs mb-4 overflow-x-auto">
            {asciiArt.welcome}
          </pre>
          <div className="text-terminal-text">
            <p className="mb-2">Welcome to my interactive terminal portfolio!</p>
            <p className="mb-4 text-terminal-muted">
              Type <span className="text-terminal-success">help</span> to see available     commands, 
              or start exploring with <span className="text-terminal-success">projects</span>, 
              <span className="text-terminal-success">skills</span>, or 
              <span className="text-terminal-success"> whoami</span>.
            </p>
          </div>
        </div>
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for clear history event
  useEffect(() => {
    const handleClearHistory = () => {
      setCommandHistory([]);
    };

    window.addEventListener('clearHistory', handleClearHistory);
    return () => window.removeEventListener('clearHistory', handleClearHistory);
  }, []);

  const handleCommand = useCallback(async (command: string, args: string[]) => {
    setIsProcessing(true);
    setCommandHistory(prev => [...prev, `${command} ${args.join(' ')}`.trim()]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (command === 'clear' || command === 'cls') {
      setOutput([]);
    } else if (command === 'logout' || command === 'exit') {
      setOutput(prev => [
        ...prev,
        <CommandProcessor key={Date.now()} command={command} args={args} commandHistory={commandHistory} />
      ]);
      // Simulate logout animation
      setTimeout(() => {
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 2000);
    } else {
      setOutput(prev => [
        ...prev,
        <CommandProcessor key={Date.now()} command={command} args={args} commandHistory={commandHistory} />
      ]);
    }

    setIsProcessing(false);

    // Auto-scroll to the start of the latest output
    setTimeout(() => {
      const outputElement = document.querySelector('.terminal-output');
      const lastOutput = document.querySelector('.terminal-output > div:last-child');
      if (outputElement && lastOutput) {
        outputElement.scrollTo({
          top: lastOutput.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, [commandHistory]);

  const handleMobileKeyPress = (key: string) => {
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (!inputElement) return;

    if (key === 'Enter') {
      const form = inputElement.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else if (key === 'Backspace') {
      const currentValue = inputElement.value;
      inputElement.value = currentValue.slice(0, -1);
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (key === 'Tab') {
      // Handle tab completion
      const currentValue = inputElement.value;
      const commands = ['help', 'projects', 'skills', 'contact', 'whoami', 'theme', 'clear', 'history'];
      const matches = commands.filter(cmd => cmd.startsWith(currentValue.toLowerCase()));
      if (matches.length === 1) {
        inputElement.value = matches[0];
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      // Handle history navigation
      const event = new KeyboardEvent('keydown', { key, bubbles: true });
      inputElement.dispatchEvent(event);
    } else if (typeof key === 'string' && key.length > 1) {
      // Handle command shortcuts
      inputElement.value = key;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    inputElement.focus();
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <style>
        {`
          .app .flex-1 {
            overflow-y: auto;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .terminal-container {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .terminal-input {
            margin-top: auto;
          }
        `}
      </style>
      <div className="app min-h-screen bg-terminal text-terminal-text flex flex-col font-mono">
        {/* Main Terminal */}
        <div className="flex-1 flex flex-col">
          <Terminal
            onCommand={handleCommand}
            output={output}
            isProcessing={isProcessing}
          />
        </div>

        {/* Status Bar */}
        <StatusBar />

        {/* Mobile Keyboard */}
        <MobileKeyboard
          isVisible={showMobileKeyboard}
          onToggle={() => setShowMobileKeyboard(!showMobileKeyboard)}
          onKeyPress={handleMobileKeyPress}
        />

        {/* Accessibility announcements */}
        <div 
          className="sr-only" 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
        >
          {isProcessing ? 'Processing command...' : 'Ready for input'}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;