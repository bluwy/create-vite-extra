import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from './App'

const ABORT_DELAY = 10000;

export function render(res, template) {
  let didError = false;
  
  const { pipe, abort } = renderToPipeableStream(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onShellError() {
        res.sendStatus(500);
      },
      onAllReady() {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const [first, second] = template.split(`<!--app-html-->`);

        // Can use react-helmet-async here
        const head = first.replace(`<!--app-head-->`, '<title>Vite + React SSR</title>');

        res.write(head);
        pipe(res);
        res.write(second);

        res.end();
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    },
  );

  setTimeout(() => {
    abort();
  }, ABORT_DELAY);
}
