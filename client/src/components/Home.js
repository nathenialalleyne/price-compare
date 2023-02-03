import { useState } from "react";
import axios from "axios";
import { Items } from "./Items";

export function Home(props) {
  const [inputText, setInputText] = useState("");
  const loading = props.load;

  return (
    <div className="test">
      <label htmlFor="item">Type the item link or SKU number</label>
      <input
        id="item"
        onChange={(e) => {
          setInputText(e);
        }}
      ></input>
      <button
        className="submit"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          loading(true);
          axios
            .post("/page", {
              items: inputText,
            })
            .then((r) => {})
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        submit
      </button>
    </div>
  );
}
