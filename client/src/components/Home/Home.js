import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Items } from "../Items";
import './Home.scss'


export function Home(props) {
  const [inputText, setInputText] = useState("");
  const [selected, setSelected] = useState("amazon")
  const loading = props.load;
  const radioRef = useRef();

//Amazon, Bestbuy, Newegg, B&H Photos
                 
  useEffect(()=>{
    console.log(selected)
  })

  return (
    <div className="home-container">
      <div className="input-container">
          <label htmlFor="item">Type the item link</label>
          <div className="input-size-container">
          <input
            id="item"
            onChange={(e) => {
              setInputText(e);
            }}
          ></input>
          </div>
        <div className="button-size-container">
          <button
            className="submit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loading(true);
              axios
                .post("/page", {
                  items: inputText,
                  site: selected,
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
      </div>
    </div>
  );
}
