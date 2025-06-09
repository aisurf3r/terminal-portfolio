import React from 'react';
import { Code, Coffee, Music, TowerControl as GameController2, Book, Zap } from 'lucide-react';
import { asciiArt } from '../../data/portfolioData';

export const WhoAmI: React.FC = () => {
  return (
    <div className="whoami-section">
      <div className="mb-6">
        <pre className="text-terminal-accent text-xs mb-4 overflow-x-auto">
          {asciiArt.whois}
        </pre>
        <h2 className="text-terminal-accent text-xl font-bold mb-2">👨‍💻 About Me</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-terminal-hover p-6 rounded-lg border border-terminal-border">
            <h3 className="text-terminal-accent font-bold text-lg mb-3">$ whoami</h3>
            <div className="space-y-4 text-terminal-text">
              <p>
                Hi there! I'm a passionate <span className="text-terminal-accent">Full-Stack Developer</span> with 
                over 5 years of experience crafting digital experiences that matter. I love turning complex 
                problems into simple, beautiful, and intuitive solutions.
              </p>
              <p>
                My journey began with curiosity about how websites work, and it evolved into a deep passion 
                for creating scalable applications, elegant user interfaces, and robust backend systems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Zap size={16} className="mr-2" />
                Core Values
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• Clean, maintainable code</li>
                <li>• User-centered design</li>
                <li>• Continuous learning</li>
                <li>• Open collaboration</li>
              </ul>
            </div>
            
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Code size={16} className="mr-2" />
                Specializations
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• React & TypeScript</li>
                <li>• Node.js & Python</li>
                <li>• Cloud Architecture (AWS)</li>
                <li>• DevOps & CI/CD</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ ls ~/interests</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Coffee className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Coffee enthusiast ☕</span>
              </div>
              <div className="flex items-center space-x-2">
                <Music className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Electronic music producer 🎵</span>
              </div>
              <div className="flex items-center space-x-2">
                <GameController2 className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Indie game developer 🎮</span>
              </div>
              <div className="flex items-center space-x-2">
                <Book className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Tech book collector 📚</span>
              </div>
            </div>
          </div>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ cat ~/status.txt</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-terminal-muted">Status:</span>
                <span className="text-green-500">Available for hire</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Location:</span>
                <span className="text-terminal-text">San Francisco, CA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Timezone:</span>
                <span className="text-terminal-text">PST (UTC-8)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Coffee Level:</span>
                <span className="text-terminal-accent">████████░░ 80%</span>
              </div>
            </div>
          </div>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ uptime</h4>
            <div className="text-terminal-text text-sm">
              <div>Years coding: <span className="text-terminal-accent">5+</span></div>
              <div>Projects completed: <span className="text-terminal-accent">50+</span></div>
              <div>Coffee consumed: <span className="text-terminal-accent">∞</span></div>
              <div>Bugs fixed: <span className="text-terminal-accent">9,999+</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <p className="text-terminal-muted text-sm">
          💡 <span className="text-terminal-accent">Fun fact:</span> I built this entire terminal interface 
          because I believe portfolios should be as unique as the developers who create them. 
          Every command you see here was crafted with attention to detail and a love for great UX.
        </p>
      </div>
    </div>
  );
};