import Board from "./components/Board";

function App() {
  return (
    <div className=" min-h-screen p-4 bg-slate-500">
    <h1 className="text-4xl font-bold text-center mb-4 text-gray-200"> Trello Task Board</h1>
    <Board />
  </div>
  );
}

export default App;
