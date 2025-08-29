import { PixelFaceConfig } from './types';

export const PIXEL_FACE_CONFIG: PixelFaceConfig = {
  gridWidth: 24,
  gridHeight: 32,
  
  colors: {
    background: '#2d1b2e',
    dim: '#4a2d4d',
    medium: '#8b4a8c',
    bright: '#d16ba5',
    highlight: '#f7a8d8',
  },

  expressions: {
    neutral: {
      eyes: [
        { x: 7, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] },
        { x: 15, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }
      ],
      mouth: [
        { x: 10, y: 22, pattern: [[1, 1, 1, 1]] }
      ],
      cheeks: [
        { x: 5, y: 17, pattern: [[1]] },
        { x: 18, y: 17, pattern: [[1]] }
      ]
    },
    
    smiling: {
      eyes: [
        { x: 7, y: 10, pattern: [[0, 1, 0], [1, 1, 1], [1, 0, 1]] },
        { x: 15, y: 10, pattern: [[0, 1, 0], [1, 1, 1], [1, 0, 1]] }
      ],
      mouth: [
        { x: 9, y: 22, pattern: [[0, 1, 1, 1, 1, 0]] },
        { x: 10, y: 23, pattern: [[1, 1, 1, 1]] }
      ],
      cheeks: [
        { x: 4, y: 16, pattern: [[1, 1], [1, 1]] },
        { x: 18, y: 16, pattern: [[1, 1], [1, 1]] }
      ]
    },

    surprised: {
      eyes: [
        { x: 6, y: 9, pattern: [
          [0, 1, 1, 1, 0], 
          [1, 0, 0, 0, 1], 
          [1, 0, 0, 0, 1], 
          [1, 0, 0, 0, 1], 
          [0, 1, 1, 1, 0]
        ] },
        { x: 13, y: 9, pattern: [
          [0, 1, 1, 1, 0], 
          [1, 0, 0, 0, 1], 
          [1, 0, 0, 0, 1], 
          [1, 0, 0, 0, 1], 
          [0, 1, 1, 1, 0]
        ] }
      ],
      mouth: [
        { x: 10, y: 22, pattern: [
          [0, 1, 1, 0], 
          [1, 0, 0, 1], 
          [1, 0, 0, 1], 
          [0, 1, 1, 0]
        ] }
      ],
      cheeks: [
        { x: 5, y: 18, pattern: [[1]] },
        { x: 18, y: 18, pattern: [[1]] }
      ]
    },

    sad: {
      eyes: [
        { x: 7, y: 10, pattern: [[1, 0, 1], [1, 1, 1], [0, 1, 0]] },
        { x: 15, y: 10, pattern: [[1, 0, 1], [1, 1, 1], [0, 1, 0]] }
      ],
      mouth: [
        { x: 9, y: 24, pattern: [[0, 1, 1, 1, 1, 0]] },
        { x: 10, y: 23, pattern: [[1, 1, 1, 1]] }
      ],
      cheeks: [
        { x: 5, y: 19, pattern: [[1]] },
        { x: 18, y: 19, pattern: [[1]] }
      ]
    },

    winking: {
      eyes: [
        { x: 7, y: 10, pattern: [[1, 1, 1], [1, 1, 1]] },
        { x: 15, y: 10, pattern: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }
      ],
      mouth: [
        { x: 9, y: 22, pattern: [[0, 1, 1, 1, 1, 0]] },
        { x: 11, y: 23, pattern: [[1, 1]] }
      ],
      cheeks: [
        { x: 4, y: 17, pattern: [[1, 1]] },
        { x: 18, y: 18, pattern: [[1]] }
      ]
    },

    angry: {
      eyes: [
        { x: 6, y: 9, pattern: [[1, 1, 0], [1, 1, 1], [1, 0, 1]] },
        { x: 16, y: 9, pattern: [[0, 1, 1], [1, 1, 1], [1, 0, 1]] }
      ],
      mouth: [
        { x: 9, y: 24, pattern: [[1, 1, 1, 1, 1, 1]] }
      ],
      cheeks: [
        { x: 4, y: 18, pattern: [[1, 1], [1, 1]] },
        { x: 18, y: 18, pattern: [[1, 1], [1, 1]] }
      ]
    },

    laughing: {
      eyes: [
        { x: 7, y: 11, pattern: [[1, 1, 1], [0, 0, 0]] },
        { x: 15, y: 11, pattern: [[1, 1, 1], [0, 0, 0]] }
      ],
      mouth: [
        { x: 8, y: 21, pattern: [[0, 1, 1, 1, 1, 1, 0]] },
        { x: 9, y: 22, pattern: [[1, 1, 1, 1, 1]] },
        { x: 10, y: 23, pattern: [[1, 1, 1]] }
      ],
      cheeks: [
        { x: 3, y: 16, pattern: [[1, 1, 1], [1, 1, 1]] },
        { x: 18, y: 16, pattern: [[1, 1, 1], [1, 1, 1]] }
      ]
    }
  },

  nosePattern: [
    { x: 11, y: 16, pattern: [[1]] },
    { x: 11, y: 17, pattern: [[1]] }
  ]
};
