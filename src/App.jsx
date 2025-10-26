import React, { useState } from "react";
import Layout from "./components/Layout";
import TaskManager from "./components/TaskManager";
import ApiData from "./components/ApiData";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      {/* Counter Section */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Counter Example</h2>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCount((count) => count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -
          </button>
          <span className="text-xl font-bold">{count}</span>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Task Manager Section */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
        <TaskManager />
      </div>

      {/* API Data Section */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">API Data</h2>
        <ApiData />
      </div>
    </Layout>
  );
}

export default App;
