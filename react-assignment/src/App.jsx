// src/App.jsx
import React, { useState } from "react";
import Layout from "./components/Layout";
import TaskManager from "./components/TaskManager";
import ApiData from "./components/ApiData";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6 text-center">
        <h1 className="text-3xl font-bold mb-4">React + Tailwind Task App</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -
          </button>
          <span className="text-xl font-bold">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Task Manager component */}
      <TaskManager />
      {/* API Data component */}
      <ApiData />
    </Layout>
  );
}

export default App;
