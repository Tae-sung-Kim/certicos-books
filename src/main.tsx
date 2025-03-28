import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
      Hello, Tailwind CSS!
    </div>
  </StrictMode>
);
