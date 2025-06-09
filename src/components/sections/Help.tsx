import React from 'react';
import { Terminal, User, Briefcase, Mail, History, Book, Palette, LogOut } from 'lucide-react';

export const Help: React.FC = () => {
  const commands = [
    { cmd: 'help', desc: 'Show this help message', icon: <Terminal size={16} /> },
    { cmd: 'whoami', desc: 'Display information about me', icon: <User size={16} /> },
    { cmd: 'projects', desc: 'List all projects', icon: <Briefcase size={16} /> },
    { cmd: 'skills', desc: 'Display skills matrix', icon: <Book size={16} /> },
    { cmd: 'contact', desc: 'Show contact information', icon: <Mail size={16} /> },
    { cmd: 'history', desc: 'Show command history', icon: <History size={16} /> },
    { cmd: 'theme [name]', desc: 'Switch to specific theme', icon: <Palette size={16} /> },
    { cmd: 'man [project]', desc: 'Show detailed project information', icon: <Book size={16} /> },
    { cmd: 'clear', desc: 'Clear terminal screen', icon: <Terminal size={16} /> },
    { cmd: 'logout', desc: 'Exit the terminal', icon: <LogOut size={16} /> }
  ];

  return (
    <div className="help-section">
      <div className="mb-4">
        <h2 className="text-terminal-accent text-lg font-bold mb-2">📖 Available Commands</h2>
        <p className="text-terminal-muted mb-4">
          Navigate through my portfolio using these terminal commands:
        </p>
      </div>
      
      <div className="grid gap-2">
        {commands.map((command, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 hover:bg-terminal-hover rounded transition-colors">
            <span className="text-terminal-accent">{command.icon}</span>
            <span className="text-terminal-success font-bold min-w-[120px]">{command.cmd}</span>
            <span className="text-terminal-muted">-</span>
            <span className="text-terminal-text">{command.desc}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <h3 className="text-terminal-accent font-bold mb-2">💡 Tips:</h3>
        <ul className="text-terminal-muted space-y-1 text-sm">
          <li>• Use <span className="text-terminal-success">Tab</span> for command autocompletion</li>
          <li>• Use <span className="text-terminal-success">↑/↓</span> arrows to navigate command history</li>
          <li>• Use <span className="text-terminal-success">theme [name]</span> to switch themes (matrix, amber, blue, white)</li>
          <li>• Click anywhere in the terminal to focus the input</li>
        </ul>
      </div>
    </div>
  );
};