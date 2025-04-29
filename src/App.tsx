import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-2xl font-bold text-center mb-4">📝 Trello Task Board</h1>
    <Board />
  </div>
  );
}

export default App;
