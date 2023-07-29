import logo from "./logo.svg";
import "./App.css";
import Create from "./component/Create/Create";
import Read from "./component/Read/Read";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./component/Update/Update"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Create />}></Route>
          <Route exact path="/read" element={<Read />}></Route>
          <Route exact path="/update" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
