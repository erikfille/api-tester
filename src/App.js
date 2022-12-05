import "./App.css";
import React, { useState } from "react";

function App() {
  const [info, setInfo] = useState({
    Nasa: {},
    Cocktail: {},
    Bands: {},
  });

  const [input, setInput] = useState({
    Nasa: "",
    Cocktail: "",
    Bands: "",
  });

  function onSearchNasa(search) {
    fetch(`https://images-api.nasa.gov/search?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.collection) {
          setInfo({ ...info, Nasa: data.collection.items })
        } else {
          window.alert("No hay media con ese ID");
        }
      });
    console.log("estado:");
    console.log(info.Nasa);
  }

  function onSearchCocktail(search) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.drinks && search!=="") {
          setInfo({ ...info, Cocktail: data.drinks });
        } else {
          window.alert("No hay media con ese ID");
        }
      });
    console.log("estado:");
    console.log(info.Cocktail);
  }

  function onSearchBands(search) {
    fetch(`http://musicbrainz.org/ws/2/artist?query=${search}&fmt=json`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.artists) {
          setInfo({ ...info, Bands: data.artists });
        } else {
          window.alert("No hay media con ese ID");
        }
      });
    console.log("estado:");
    console.log(info.Bands);
  }

  let handleInputChange = (e) => {
    if (e.target.name === "Nasa") setInput({ ...input, Nasa: e.target.value });
    if (e.target.name === "Cocktail")
      setInput({ ...input, Cocktail: e.target.value });
    if (e.target.name === "Bands")
      setInput({ ...input, Bands: e.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">API Tester</header>
      <div className="input-container">
        <label htmlFor="Nasa">Nasa Library API</label>
        <div className="search">
          <input
            type="text"
            name="Nasa"
            id="Nasa"
            className="input"
            value={input.Nasa}
            placeholder="Busca lo que quieras del espacio"
            onChange={handleInputChange}
          ></input>
          <button onClick={() => onSearchNasa(input.Nasa)}>Buscar</button>
        </div>
        <label htmlFor="Cocktail">Cocktail API</label>
        <div className="search">
          <input
            type="text"
            name="Cocktail"
            id="Cocktail"
            className="input"
            value={input.Cocktail}
            placeholder="Busca un trago"
            onChange={handleInputChange}
          ></input>
          <button onClick={() => onSearchCocktail(input.Cocktail)}>Buscar</button>
        </div>
        <label htmlFor="Bands">Bands API</label>
        <div className="search">
          <input
            type="text"
            name="Bands"
            id="Bands"
            className="input"
            value={input.Bands}
            placeholder="Busca una banda"
            onChange={handleInputChange}
          ></input>
          <button onClick={() => onSearchBands(input.Bands)}>Buscar</button>
        </div>
        <div className="search">
          <button className="log-state" onClick={() => console.log(info)}>Consologuear Estado</button>{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
