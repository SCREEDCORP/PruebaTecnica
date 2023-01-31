import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const GIPHY_API_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
  const [catFact, setCatFact] = useState("");
  const [catGif, setCatGif] = useState("");
  const callGiphyAPI = (string) => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${string}&api_key=${GIPHY_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("gif", data.data[0].images.original.url);
        setCatGif(data.data[0].images.original.url);
      });
  };
  const callApi = () => {
    // console.log("calling api ");
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => {
        setCatFact(data.fact);
        callGiphyAPI(data?.fact?.split(" ").slice(0, 3).join(" "));
        console.log(data.fact);
      });
  };
  useEffect(callApi, []);

  return (
    <div className="App">
      <>
        <h1>{catFact}</h1>
        <img src={catGif} />
      </>
    </div>
  );
}

export default App;
