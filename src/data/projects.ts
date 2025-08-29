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
    id: 'clouds',
    title: 'Floating Clouds',
    description: 'Peaceful procedurally generated clouds that drift across the sky from right to left. Each cloud is unique and moves at its own pace. Click to add new clouds.',
    image: '/projects/clouds.svg',
    tags: ['p5.js', 'Generative', 'Animation'],
    demoUrl: '/project/clouds',
    sourceUrl: 'https://github.com/yourusername/clouds',
    createdAt: '2024-08-28'
  },
  {
    id: 'rain',
    title: 'Rain Drops',
    description: 'Peaceful falling raindrops with varying speeds and trajectories. Watch the gentle rhythm of rain create a calming atmosphere. Click to create splash effects.',
    image: '/projects/rain.svg',
    tags: ['p5.js', 'Animation', 'Weather'],
    demoUrl: '/project/rain',
    sourceUrl: 'https://github.com/yourusername/rain',
    createdAt: '2024-08-29'
  }
];
