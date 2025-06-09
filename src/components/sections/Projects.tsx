import React, { Suspense, useEffect, useRef } from 'react';
import { projects } from '../../data/portfolioData';
import { ExternalLink, Github, Eye, Clock, CheckCircle, Loader } from 'lucide-react';

export const Projects: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in-progress':
        return <Loader size={16} className="text-yellow-500" />;
      case 'planned':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

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

  // Intersection Observer for lazy-loading images
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img && img.dataset.src) {
              img.src = img.dataset.src; // Load the image
              observer.unobserve(entry.target); // Stop observing once loaded
            }
          }
        });
      },
      { rootMargin: '100px' } // Load images 100px before they enter viewport
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Suspense fallback={<div className="text-terminal-muted">Loading projects...</div>}>
      <div className="projects-section">
        <div className="mb-6">
          <h2 className="text-terminal-accent text-xl font-bold mb-2">🚀 Projects Portfolio</h2>
          <p className="text-terminal-muted">
            Here are some of my notable projects. Use <span className="text-terminal-success">man [project-id]</span> for detailed information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-card bg-terminal-hover border border-terminal-border rounded-lg p-4 transition-all duration-300 hover:border-terminal-accent hover:shadow-lg"
              role="article"
              tabIndex={0}
            >
              {/* Project Image */}
              <div className="relative mb-4 rounded overflow-hidden">
                <img
                  data-src={project.image} // Use data-src for lazy loading
                  alt={project.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black bg-opacity-70 px-2 py-1 rounded">
                  {getStatusIcon(project.status)}
                  <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-terminal-accent font-bold text-lg">{project.name}</h3>
                  <p className="text-terminal-muted text-sm mt-1">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-terminal text-terminal-accent text-xs rounded border border-terminal-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-terminal-muted hover:text-terminal-accent transition-colors"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-terminal-muted hover:text-terminal-accent transition-colors"
                      aria-label={`View ${project.name} demo`}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                  <button
                    className="flex items-center space-x-1 text-terminal-muted hover:text-terminal-accent transition-colors"
                    aria-label={`View details for ${project.name}`}
                  >
                    <Eye size={16} />
                    <span className="text-sm">man {project.id}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
          <p className="text-terminal-muted text-sm">
            💡 <span className="text-terminal-accent">Tip:</span> Use <span className="text-terminal-success">man [project-id]</span> to view detailed documentation for any project.
          </p>
        </div>
      </div>
    </Suspense>
  );
};
