# React + Vite

This template sets up server-side rendering (SSR) with streaming for a React application using Vite.

Note that this template does not fully support [React Suspense](https://react.dev/reference/react/Suspense). If they are used, the site will only hydrate when suspense if fully resolved on the server-side.

Why? Suspense works by sending the initial HTML with placeholders, and then stream additional scripts to replace the placeholders when the resource is ready on the server-side. This delay in the stream interferes with script execution as module scripts in Vite are only executed when the DOM is ready (when the stream ends). To remedy this, suspense requires module scripts to be [async](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script#async) and in the correct HTML order for it to hydrate as soon as possible. This is too complex to implement in a template right now.

Check out the [React docs](https://react.dev/learn/creating-a-react-app) for suggested full-stack frameworks that implement this.
