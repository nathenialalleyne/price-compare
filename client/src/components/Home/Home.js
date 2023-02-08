import { useRef, useState } from "react";
import axios from "axios";
import { Items } from "../Items";
import { ImageButton } from "../image-button/image-button";
import './Home.scss'


export function Home(props) {
  const [inputText, setInputText] = useState("");
  const [selected, setSelected] = useState("")
  const loading = props.load;
  const radioRef = useRef();

//Amazon, Bestbuy, Newegg, B&H Photos

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
      <div className="retailer-button-container">
        
              
                <label className="selected">
                  <input type="radio" name="retailer" id="amazon" value="1"></input>
                  <img src={require("../../icons/az-logo.png")} alt="Amazon Logo"></img>
                </label>
                
                <label>
                  <input type="radio" name="retailer" id="bestbuy" value="2"></input>
                  <img src={require("../../icons/bb-logo.png")} alt="Best Buy Logo"></img>
                </label>
                <label >
                  <input type="radio" name="retailer" id="bnh" value="3"></input>
                  <img src={require("../../icons/bh-logo.png")} alt="B&H Photos Logo"></img>
                </label>
                <label>
                  <input type="radio" name="retailer" id="newegg" value="4"></input>
                  <img src={require("../../icons/ne-logo.png")} alt="Newegg Logo"></img>
                </label>
        {/* <ImageButton img={require('../../icons/az-logo.png')}/>
        <ImageButton img={require('../../icons/bb-logo.png')}/>
        <ImageButton img={require('../../icons/bh-logo.png')}/>
        <ImageButton img={require('../../icons/ne-logo.png')}/> */}

      </div>
    </div>
  );
}
