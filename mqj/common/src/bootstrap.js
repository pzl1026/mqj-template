// setTimeout(() => {
//   import('app3/Widget').then((res) => {
//     console.log(res, 'app3');
//   });
// }, 2000);

// import('app2/Widget');
// const test = import('app2/test').then((res) => {
//   console.log(res, 'app2');
// });

// import('./layout');


// import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
const App2 = React.lazy(() => import("app2/app"));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <App2 />
    </React.Suspense>
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));


