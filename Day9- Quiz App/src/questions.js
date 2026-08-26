// A small local question bank. Each question has 4 options and the
// index of the correct one. Kept local (no API) so the app works
// offline and the focus stays on quiz-flow state management.

export const QUESTIONS = [
  {
    id: 1,
    question: 'Which hook is used to manage state in a function component?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    correctIndex: 1,
  },
  {
    id: 2,
    question: 'What does JSX stand for?',
    options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extra'],
    correctIndex: 0,
  },
  {
    id: 3,
    question: 'Which company originally created React?',
    options: ['Google', 'Meta (Facebook)', 'Microsoft', 'Amazon'],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'Which build tool is used in this project instead of Create React App?',
    options: ['Webpack', 'Parcel', 'Vite', 'Rollup'],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What does the useEffect hook let you do?',
    options: [
      'Create reusable components',
      'Run side effects after render',
      'Style components with CSS',
      'Define constants',
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    question: 'How do you pass data from a parent to a child component?',
    options: ['State', 'Props', 'Context only', 'Refs'],
    correctIndex: 1,
  },
  {
    id: 7,
    question: 'What is the virtual DOM?',
    options: [
      'A browser extension',
      'A lightweight copy of the real DOM used for efficient updates',
      'A CSS framework',
      'A type of state',
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question: 'Which array method is commonly used to render lists in React?',
    options: ['.forEach()', '.filter()', '.map()', '.reduce()'],
    correctIndex: 2,
  },
]

export const TIME_PER_QUESTION = 20 // seconds