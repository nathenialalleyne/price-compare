import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import axios from "axios";

function App() {
  const [testData, setTestData] = useState([{}]);
  useEffect(() => {
    axios.get("/test").then((response) => {
      console.log(response);
    });
  }, []);
  // return <div>{testData ? <Home data={testData} /> : <Loading />}</div>;
}

export default App;
