export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image: string;
  details: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Skill {
  category: string;
  items: Array<{
    name: string;
    level: number;
    icon: string;
  }>;
}

export const projects: Project[] = [
  {
    id: 'terminal-portfolio',
    name: 'Terminal Portfolio',
    description: 'Interactive terminal-themed portfolio website',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    github: 'https://github.com/user/terminal-portfolio',
    demo: 'https://terminal-portfolio.dev',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    details: `A fully interactive terminal-themed portfolio website featuring:
    
    • Real-time command processing
    • Multiple theme support (Matrix, Amber, Blue, White)
    • Responsive design with mobile support
    • Accessibility features and screen reader compatibility
    • Sound effects and animations
    • Command history and man pages
    • Virtual keyboard for mobile devices
    
    Built with React, TypeScript, and modern web technologies.`,
    status: 'completed'
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Platform',
    description: 'Intelligent conversational AI with natural language processing',
    technologies: ['Python', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL'],
    github: 'https://github.com/user/ai-chatbot',
    demo: 'https://chatbot-demo.dev',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    details: `Advanced AI chatbot platform with features:
    
    • Natural language understanding
    • Context-aware conversations
    • Multi-language support
    • Analytics dashboard
    • Custom training capabilities
    • REST API for integration
    
    Handles 10k+ conversations daily with 95% accuracy.`,
    status: 'completed'
  },
  {
    id: 'data-viz-dashboard',
    name: 'Data Visualization Dashboard',
    description: 'Real-time analytics dashboard with interactive charts',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/user/data-dashboard',
    demo: 'https://dashboard-demo.dev',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    details: `Comprehensive analytics dashboard featuring:
    
    • Real-time data streaming
    • Interactive charts and graphs
    • Custom report generation
    • Data export capabilities
    • Role-based access control
    • Mobile-responsive design
    
    Processes millions of data points with sub-second response times.`,
    status: 'completed'
  },
  {
    id: 'blockchain-wallet',
    name: 'Crypto Wallet App',
    description: 'Secure cryptocurrency wallet with multi-chain support',
    technologies: ['React Native', 'Web3.js', 'Solidity', 'Redux', 'SQLite'],
    github: 'https://github.com/user/crypto-wallet',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
    details: `Secure cryptocurrency wallet application:
    
    • Multi-chain support (Bitcoin, Ethereum, BSC)
    • Hardware wallet integration
    • DeFi protocol interactions
    • Portfolio tracking
    • Security audited smart contracts
    • Biometric authentication
    
    Manages $1M+ in digital assets securely.`,
    status: 'in-progress'
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '📘' },
      { name: 'Vue.js', level: 85, icon: '💚' },
      { name: 'CSS/SCSS', level: 88, icon: '🎨' },
      { name: 'Tailwind CSS', level: 92, icon: '🌊' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Redis', level: 75, icon: '🔴' }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', level: 85, icon: '🐳' },
      { name: 'Kubernetes', level: 78, icon: '⚙️' },
      { name: 'AWS', level: 82, icon: '☁️' },
      { name: 'GitHub Actions', level: 88, icon: '🔄' },
      { name: 'Terraform', level: 72, icon: '🏗️' }
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 95, icon: '📝' },
      { name: 'VS Code', level: 98, icon: '💻' },
      { name: 'Figma', level: 75, icon: '🎯' },
      { name: 'Jest', level: 85, icon: '🧪' },
      { name: 'Webpack', level: 80, icon: '📦' }
    ]
  }
];

export const asciiArt = {
  welcome: `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
`,
  
  error404: ` 
███████╗██████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║  ██║██╔═████╗██║  ██║
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝███████║██║██╔██║███████║
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗╚════██║████╔╝██║╚════██║
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║     ██║╚██████╔╝     ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝     ╚═╝ ╚═════╝      ╚═╝
                                                                  

`,

  whois: `
██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗
██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║
██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║
██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║
╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║
 ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`
};