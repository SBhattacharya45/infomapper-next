import React, { useState } from "react";
import {useRouter} from 'next/router';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import MapChart from '../Components/MapChart/MapChart';
import classes from '../styles/Map.module.css';
import axios from 'axios';

const app = () => {
  const router = useRouter();

  const [capital, setCapital] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [dial, setDial] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  //to prevent api call when just passing over
  var hoverTimeout = null;

  const getDataHandler = (query) => {
    setTooltip(true);
    setLoader(true);
    if(query === "United States of America"){
      query = "united_states";
    }
    if(query === "United Kingdom"){
      query = "england";
    }
    hoverTimeout = setTimeout(function(){

      const options = {
          method: 'GET',
          url: 'https://wikiapi.p.rapidapi.com/api/v1/wiki/geography/country/info/' + query.toLowerCase(),
          params: {lan: 'en'},
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_API_KEY,
            'x-rapidapi-host': 'wikiapi.p.rapidapi.com'
          }
        };
        
      axios.request(options).then(function (response) {
          setContent(false);
          setCapital(response.data.capital);
          setName(response.data.name);
          setDial(response.data.calling_code);
          setCurrency(response.data.currency);
          setPopulation(response.data.population_census);
          setArea(response.data.area);
          console.log(response.data);        
          setContent(true);
          setLoader(false);
  
      }).catch(function (error) {
          console.error(error);
      });
    }, 1000);

    // console.log(query);
    // setLoader(true);
    // setTimeout(function() {
    //   setCapital("Delhi");
    //   setName("India");
    //   setDial("+91");
    //   setCurrency("Indian Rupee");
    //   setPopulation("99999999..");
    //   setArea("27368km2");
    //   setContent(true);
    //   setLoader(false);
    // }, 500);
  }

  const onClickHander = (query) => {
    if(query === "United States of America"){
      query = "united states";
    }
    if(query === "United Kingdom"){
      query = "england";
    }
    router.push("/info?country=" + query.toLowerCase().replace(/ /g,"_"));
  }

  const onExitHandler = () => {
    clearTimeout(hoverTimeout);
    setCapital("");
    setName("");
    setDial("");
    setCurrency("");
    setPopulation("");
    setArea(""); 
    setContent(false);
    setTooltip(false);
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerContainer}>

          <div><b>Info</b> Mapper</div>
          <div style={{fontSize: 19, display:"flex", alignItems:"center"}}>
            Find me at: GitHub
          </div>
      </div>
      <div className={classes.mapContainer}>
        <MapChart className={classes.map} clicked={onClickHander} fetchData={getDataHandler} onExit={onExitHandler}/>
        <ReactTooltip
        backgroundColor="#0e3835"
        multiline={true}>

          {!tooltip ? <span>Click to see info</span> : null}

          {(content&&tooltip)
          ? <div>
              <p>Name: {name}</p>
              <p>Capital: {capital}</p>
              <p>Currency: {currency}</p>
              <p>Area: {area}</p>
              <p>Population: {population}</p>
              <p>Dial Code: {dial}</p>
              <p>Double click to <u>see more</u></p>
            </div>
          : null}

          {/* {!loader ? name : null}
          <br/>
          {!loader ? capital : null}
          <br/>
          {!loader ? currency : null}
          <br/>
          {!loader ? area : null}
          <br/>                        
          {!loader ? population : null}
          <br/>
          {!loader ? dial : null} */}

          {(loader&&tooltip) 
          ?<div className={classes.loader}><div></div><div></div><div></div><div></div></div>
          :null}
        </ReactTooltip>
      </div>
    </div>
  );
}

export default app;