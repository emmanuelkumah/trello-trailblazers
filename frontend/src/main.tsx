import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterContainer from './router/Route.tsx';
import Providers from './providers/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterContainer />
    </Providers>
  </StrictMode>,
)
