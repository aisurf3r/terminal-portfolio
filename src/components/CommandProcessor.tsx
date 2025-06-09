import React from 'react';
import { projects, skills } from '../data/portfolioData';
import { useTheme } from '../contexts/ThemeContext';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Help } from './sections/Help';
import { WhoAmI } from './sections/WhoAmI';
import { History } from './sections/History';
import { ManPage } from './sections/ManPage';
import { NotFound } from './sections/NotFound';

interface CommandProcessorProps {
  command: string;
  args: string[];
  commandHistory: string[];
}

export const CommandProcessor: React.FC<CommandProcessorProps> = ({ 
  command, 
  args, 
  commandHistory 
}) => {
  const { theme, setTheme } = useTheme();

  const renderCommand = () => {
    switch (command) {
      case 'help':
      case 'h':
        return <Help />;
        
      case 'projects':
      case 'ls':
        return <Projects />;
        
      case 'skills':
      case 'skill':
        return <Skills />;
        
      case 'contact':
      case 'email':
        return <Contact />;
        
      case 'whoami':
      case 'about':
        return <WhoAmI />;
        
      case 'history':
        return <History commands={commandHistory} />;
        
      case 'theme':
        if (args.length > 0) {
          const newTheme = args[0].toLowerCase();
          if (['matrix', 'amber', 'blue', 'white'].includes(newTheme)) {
            setTheme(newTheme as any);
            return (
              <div className="text-terminal-success">
                Theme switched to: {newTheme}
                <div className="text-terminal-muted text-sm mt-1">
                  Available themes: matrix, amber, blue, white
                </div>
              </div>
            );
          } else {
            return (
              <div className="text-terminal-error">
                Invalid theme: {newTheme}
                <div className="text-terminal-muted text-sm mt-1">
                  Available themes: matrix, amber, blue, white
                </div>
              </div>
            );
          }
        } else {
          return (
            <div className="text-terminal-error">
              Please specify a theme name.
              <div className="text-terminal-muted text-sm mt-1">
                Usage: theme [name]<br />
                Available themes: matrix, amber, blue, white
              </div>
            </div>
          );
        }
        
      case 'clear':
      case 'cls':
        return null; // Handled by parent component
        
      case 'man':
        if (args.length > 0) {
          const projectId = args[0].toLowerCase();
          const project = projects.find(p => p.id === projectId || p.name.toLowerCase().includes(projectId));
          if (project) {
            return <ManPage project={project} />;
          }
        }
        return (
          <div className="text-terminal-error">
            man: No manual entry for '{args[0] || 'undefined'}'
            <br />
            Try 'man [project-name]' or 'projects' to see available projects.
          </div>
        );
        
      case 'logout':
      case 'exit':
        return (
          <div className="text-terminal-warning">
            Logging out... Connection to aisurf3r@portfolio closed.
          </div>
        );
        
      case 'pwd':
        return <div>/home/aisurf3r/portfolio</div>;
        
      case 'date':
        return <div>{new Date().toLocaleString()}</div>;
        
      case 'uptime':
        return <div>System uptime: {Math.floor(performance.now() / 1000)}s</div>;
        
      case 'echo':
        return <div>{args.join(' ')}</div>;
        
      default:
        return <NotFound command={command} />;
    }
  };

  return (
    <div className="command-output">
      <div className="command-line text-terminal-muted mb-2">
        <span className="text-terminal-accent">aisurf3r@portfolio:~$</span> {command} {args.join(' ')}
      </div>
      {renderCommand()}
    </div>
  );
};