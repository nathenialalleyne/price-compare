import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Loading } from "./components/Loading";
import axios from "axios";

function App() {
  const [testData, setTestData] = useState();
  const [error, setError] = useState(false);
  let key = 0;
  useEffect(() => {
    axios.get("/test").then((response) => {
      setTestData(response.data);
    });
  }, []);

  return (
    <div>
      {testData ? (
        Object.keys(testData).map((data) => {
          key++;
          return <Home data={data} key={key} />;
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
