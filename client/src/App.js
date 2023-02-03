import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import axios from "axios";

function App() {
  const [loadingScreen, setLoadingScreen] = useState(false);

  return (
    <div>
      <Home load={setLoadingScreen} />
    </div>
  );
}

export default App;
