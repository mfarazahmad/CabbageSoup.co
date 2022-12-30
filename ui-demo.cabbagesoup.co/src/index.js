import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Root />);

serviceWorker.unregister();
