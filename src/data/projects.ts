export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  createdAt: string;
}

// Sample project data - replace with your actual projects
export const projects: Project[] = [
  {
    id: 'game-of-life',
    title: 'Game of Life',
    description: 'Interactive implementation of Conway\'s Game of Life cellular automaton. Click to toggle cells and watch patterns evolve according to simple rules.',
    image: '/projects/cellular-automata.svg',
    tags: ['React', 'Cellular Automata', 'Interactive'],
    demoUrl: '/project/game-of-life',
    sourceUrl: 'https://github.com/yourusername/game-of-life',
    createdAt: '2024-08-28'
  },
  {
    id: 'particle-system',
    title: 'Particle System',
    description: 'Interactive particle system with physics simulation and mouse interaction. Particles respond to cursor movement creating beautiful flowing effects.',
    image: '/projects/particle-system.svg',
    tags: ['JavaScript', 'Canvas', 'Physics'],
    demoUrl: '/projects/particle-system',
    sourceUrl: 'https://github.com/yourusername/particle-system',
    createdAt: '2024-01-15'
  },
  {
    id: 'generative-art',
    title: 'Generative Art Gallery',
    description: 'Collection of algorithmic art pieces generated using mathematical functions and randomization. Each piece is unique and created through code.',
    image: '/projects/generative-art.svg',
    tags: ['p5.js', 'Generative', 'Mathematics'],
    demoUrl: '/projects/generative-art',
    sourceUrl: 'https://github.com/yourusername/generative-art',
    createdAt: '2024-02-20'
  },
  {
    id: 'audio-visualizer',
    title: 'Audio Visualizer',
    description: 'Real-time audio visualization with frequency analysis and dynamic graphics that respond to music and sound input.',
    image: '/projects/audio-visualizer.svg',
    tags: ['Web Audio API', 'Canvas', 'FFT'],
    demoUrl: '/projects/audio-visualizer',
    sourceUrl: 'https://github.com/yourusername/audio-visualizer',
    createdAt: '2024-03-10'
  },
  {
    id: 'cellular-automata',
    title: 'Cellular Automata',
    description: 'Implementation of Conway\'s Game of Life and other cellular automata patterns. Watch complex behaviors emerge from simple rules.',
    image: '/projects/cellular-automata.svg',
    tags: ['Algorithm', 'Simulation', 'TypeScript'],
    demoUrl: '/project/game-of-life',
    sourceUrl: 'https://github.com/yourusername/cellular-automata',
    createdAt: '2024-04-05'
  },
  {
    id: 'fractal-explorer',
    title: 'Fractal Explorer',
    description: 'Interactive fractal generator with zoom functionality. Explore the infinite complexity of Mandelbrot and Julia sets.',
    image: '/projects/fractal-explorer.svg',
    tags: ['Mathematics', 'WebGL', 'Complex Numbers'],
    demoUrl: '/projects/fractal-explorer',
    sourceUrl: 'https://github.com/yourusername/fractal-explorer',
    createdAt: '2024-05-12'
  },
  {
    id: '3d-sculptures',
    title: '3D Digital Sculptures',
    description: 'Three-dimensional art pieces created with Three.js. Interactive sculptures that respond to user input and showcase procedural geometry.',
    image: '/projects/3d-sculptures.svg',
    tags: ['Three.js', '3D', 'WebGL'],
    demoUrl: '/projects/3d-sculptures',
    sourceUrl: 'https://github.com/yourusername/3d-sculptures',
    createdAt: '2024-06-18'
  }
];
