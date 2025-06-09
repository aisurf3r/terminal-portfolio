import React from 'react';
import { Project } from '../../data/portfolioData';
import { Github, ExternalLink, Calendar, Code, Users, Star } from 'lucide-react';

interface ManPageProps {
  project: Project;
}

export const ManPage: React.FC<ManPageProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-yellow-500';
      case 'planned':
        return 'text-blue-500';
      default:
        return 'text-terminal-muted';
    }
  };

  return (
    <div className="man-page">
      {/* Header */}
      <div className="mb-6 p-4 bg-terminal-hover rounded-lg border border-terminal-border">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-terminal-accent text-xl font-bold">{project.name.toUpperCase()}</h1>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-terminal-muted text-sm font-mono">
          User Commands Manual | Portfolio Projects
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">NAME</h2>
        <div className="pl-4 text-terminal-text">
          {project.name} - {project.description}
        </div>
      </div>

      {/* Synopsis */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">SYNOPSIS</h2>
        <div className="pl-4 bg-terminal p-3 rounded border border-terminal-border font-mono text-sm">
          <div className="text-terminal-success">
            $ git clone {project.github || 'https://github.com/user/project'}
          </div>
          <div className="text-terminal-muted">$ cd {project.id}</div>
          <div className="text-terminal-muted">$ npm install && npm start</div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">DESCRIPTION</h2>
        <div className="pl-4 text-terminal-text whitespace-pre-line">
          {project.details}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">TECHNOLOGIES</h2>
        <div className="pl-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-terminal text-terminal-accent text-sm rounded border border-terminal-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      {(project.github || project.demo) && (
        <div className="mb-6">
          <h2 className="text-terminal-accent font-bold text-lg mb-2">LINKS</h2>
          <div className="pl-4 space-y-2">
            {project.github && (
              <div className="flex items-center space-x-3">
                <Github size={16} className="text-terminal-accent" />
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-text hover:text-terminal-accent transition-colors underline"
                >
                  Source Code Repository
                </a>
              </div>
            )}
            {project.demo && (
              <div className="flex items-center space-x-3">
                <ExternalLink size={16} className="text-terminal-accent" />
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-text hover:text-terminal-accent transition-colors underline"
                >
                  Live Demo
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">PREVIEW</h2>
        <div className="pl-4">
          <div className="relative rounded-lg overflow-hidden border border-terminal-border">
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">STATISTICS</h2>
        <div className="pl-4 grid gap-4 md:grid-cols-3">
          <div className="bg-terminal-hover p-3 rounded border border-terminal-border flex items-center space-x-2">
            <Code size={16} className="text-terminal-accent" />
            <div>
              <div className="text-terminal-text font-medium">Technologies</div>
              <div className="text-terminal-muted text-sm">{project.technologies.length} used</div>
            </div>
          </div>
          <div className="bg-terminal-hover p-3 rounded border border-terminal-border flex items-center space-x-2">
            <Star size={16} className="text-terminal-accent" />
            <div>
              <div className="text-terminal-text font-medium">Status</div>
              <div className={`text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </div>
            </div>
          </div>
          <div className="bg-terminal-hover p-3 rounded border border-terminal-border flex items-center space-x-2">
            <Calendar size={16} className="text-terminal-accent" />
            <div>
              <div className="text-terminal-text font-medium">Updated</div>
              <div className="text-terminal-muted text-sm">Recently</div>
            </div>
          </div>
        </div>
      </div>

      {/* See Also */}
      <div className="mb-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-2">SEE ALSO</h2>
        <div className="pl-4 text-terminal-text">
          <div className="space-y-1 text-sm">
            <div><span className="text-terminal-success font-mono">projects</span> - list all projects</div>
            <div><span className="text-terminal-success font-mono">skills</span> - display technical skills</div>
            <div><span className="text-terminal-success font-mono">contact</span> - get in touch</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-terminal-border text-center">
        <div className="text-terminal-muted text-sm">
          Terminal Portfolio | {new Date().getFullYear()} | Version 2.01
        </div>
      </div>
    </div>
  );
};