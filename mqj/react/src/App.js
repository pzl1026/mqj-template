import LocalButton from './Widget';
import React from 'react';

const C1 = React.lazy(() => import("common/C1"));

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App 2（react）</h2>
    <LocalButton />
    <React.Suspense fallback="Loading Button">
      <C1 />
    </React.Suspense>
  </div>
);

export default App;
