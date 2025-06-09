import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { asciiArt } from '../../data/portfolioData';

interface NotFoundProps {
  command: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ command }) => {
  const suggestions = [
    'help - Show available commands',
    'projects - View my projects',
    'skills - See my technical skills',
    'contact - Get in touch',
    'whoami - Learn about me'
  ];

  return (
    <div className="not-found-section">
      {/* ASCII Art Error */}
      <div className="mb-6 text-center">
        <pre className="text-terminal-error text-xs mb-4 overflow-x-auto">
          {asciiArt.error404}
        </pre>
      </div>

      {/* Error Message */}
      <div className="bg-terminal-hover p-6 rounded-lg border border-red-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="text-red-500" size={24} />
          <div>
            <h2 className="text-red-500 font-bold text-lg">Command Not Found</h2>
            <p className="text-terminal-muted text-sm">
              bash: {command}: command not found
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-terminal-text">
            <p>
              The command <span className="text-terminal-accent font-mono bg-terminal px-2 py-1 rounded">
                {command}
              </span> is not recognized in this terminal session.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-terminal p-4 rounded border border-terminal-border">
            <div className="text-terminal-error text-sm font-mono">
              <div>Error Code: 127</div>
              <div>Status: Command not found</div>
              <div>Shell: /bin/bash</div>
              <div>User: aisurf3r@portfolio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <HelpCircle className="text-terminal-accent" size={20} />
          <h3 className="text-terminal-accent font-bold">Did you mean?</h3>
        </div>
        
        <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-2 hover:bg-terminal rounded transition-colors cursor-pointer"
              >
                <span className="text-terminal-accent">$</span>
                <span className="text-terminal-success font-mono text-sm">
                  {suggestion.split(' - ')[0]}
                </span>
                <span className="text-terminal-muted text-sm">
                  - {suggestion.split(' - ')[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <h4 className="text-terminal-accent font-bold mb-2">💡 Terminal Tips:</h4>
        <ul className="text-terminal-muted text-sm space-y-1">
          <li>• Use <span className="text-terminal-success">Tab</span> for command autocompletion</li>
          <li>• Type <span className="text-terminal-success">help</span> to see all available commands</li>
          <li>• Use <span className="text-terminal-success">↑/↓</span> arrows to browse command history</li>
          <li>• Commands are case-sensitive</li>
        </ul>
      </div>

      {/* Quick Recovery */}
      <div className="mt-4 text-center">
        <div className="text-terminal-muted text-sm">
          Type <span className="text-terminal-success font-mono">clear</span> to clear the screen or 
          <span className="text-terminal-success font-mono"> help</span> to start over
        </div>
      </div>
    </div>
  );
};