import React, { useState, useEffect } from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryProps {
  commands: string[];
}

export const History: React.FC<HistoryProps> = ({ commands: initialCommands }) => {
  const [commands, setCommands] = useState<string[]>(initialCommands);
  const [isCopied, setIsCopied] = useState(false);
  const uniqueCommands = [...new Set(commands)];
  const recentCommands = commands.slice(-20); // Show last 20 commands

  // Sync local commands state with prop and listen for clearHistory event
  useEffect(() => {
    setCommands(initialCommands);

    const handleClearHistory = () => {
      setCommands([]);
    };

    window.addEventListener('clearHistory', handleClearHistory);
    return () => window.removeEventListener('clearHistory', handleClearHistory);
  }, [initialCommands]);

  const handleClearHistory = () => {
    // Clear the command history by dispatching a custom event
    const clearEvent = new CustomEvent('clearHistory');
    window.dispatchEvent(clearEvent);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard?.writeText(commands.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="history-section">
      <div className="mb-4">
        <h2 className="text-terminal-accent text-lg font-bold mb-2 flex items-center">
          <Clock size={18} className="mr-2" />
          Command History
        </h2>
        <p className="text-terminal-muted text-sm">
          Your recent terminal session activity. Use ↑/↓ arrows to navigate history.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Commands */}
        <div className="space-y-4">
          <h3 className="text-terminal-accent font-bold">📝 Recent Commands</h3>
          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border max-h-96 overflow-y-auto">
            {recentCommands.length > 0 ? (
              <div className="space-y-2">
                {recentCommands.map((command, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 text-sm p-2 hover:bg-terminal rounded transition-colors"
                  >
                    <span className="text-terminal-muted font-mono w-8">
                      {recentCommands.length - index}
                    </span>
                    <span className="text-terminal-accent">$</span>
                    <span className="text-terminal-text font-mono">{command}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-terminal-muted text-center py-8">
                No commands in history yet.<br />
                Start typing commands to see them here!
              </div>
            )}
          </div>
        </div>

        {/* Command Statistics */}
        <div className="space-y-4">
          <h3 className="text-terminal-accent font-bold">📊 Session Statistics</h3>
          <div className="space-y-3">
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-terminal-muted">Total Commands</div>
                  <div className="text-terminal-accent font-bold text-lg">{commands.length}</div>
                </div>
                <div>
                  <div className="text-terminal-muted">Unique Commands</div>
                  <div className="text-terminal-accent font-bold text-lg">{uniqueCommands.length}</div>
                </div>
              </div>
            </div>

            {/* Most Used Commands */}
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-3">🔥 Most Used</h4>
              <div className="space-y-2">
                {uniqueCommands
                  .map(cmd => ({
                    command: cmd,
                    count: commands.filter(c => c === cmd).length
                  }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-terminal-text font-mono">{item.command}</span>
                      <span className="text-terminal-accent">{item.count}x</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-3">⚡ Quick Actions</h4>
              <div className="space-y-2">
                <div className="relative">
                  <button 
                    className="w-full text-left p-2 hover:bg-terminal rounded transition-colors flex items-center space-x-2 text-sm"
                    onClick={handleCopyToClipboard}
                  >
                    <span className="text-terminal-muted">📋</span>
                    <span className="text-terminal-text">Copy history to clipboard</span>
                  </button>
                  {isCopied && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-terminal-hover bg-opacity-90 rounded">
                      <div className="text-terminal-success text-sm font-bold">
                        Copied to clipboard!
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className="w-full text-left p-2 hover:bg-terminal rounded transition-colors flex items-center space-x-2 text-sm"
                  onClick={handleClearHistory}
                >
                  <Trash2 size={14} className="text-terminal-muted" />
                  <span className="text-terminal-text">Clear history</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <p className="text-terminal-muted text-sm">
          💡 <span className="text-terminal-accent">Tip:</span> Use the up and down arrow keys to quickly 
          access previous commands without retyping them.
        </p>
      </div>
    </div>
  );
};