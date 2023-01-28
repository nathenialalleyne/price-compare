import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";

function App() {
  const [testData, setTestData] = useState([{}]);
  useEffect(() => {
    fetch("/test")
      .then((response) => response.json())
      .then((data) => {
        setTestData(data);
      });
  }, []);
  // return <div>{testData ? <Home data={testData} /> : <Loading />}</div>;
}

export default App;
