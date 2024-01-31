import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./components/Page";
import Page2 from "./components/Page2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/show/:id" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;
