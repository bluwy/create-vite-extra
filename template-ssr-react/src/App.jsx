import React, { Suspense, lazy } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css";

// Works also with SSR as expected
const Content = lazy(() => import('./Content'));

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Suspense fallback={<p>Loading content</p>}>
        <Content />
      </Suspense>
    </>
  );
}

export default App;
