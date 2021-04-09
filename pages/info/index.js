import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

import classes from '../../styles/Map.module.css';

const infoPage = props => {

    const [loader, setLoader] = useState(true);
    const [info, setInfo] = useState(null);
    const [country, setCountry]=useState("");
    const router = useRouter();
   
    useEffect(() => {
     if (router && router.query) {
      setCountry(router.query.country);
     }
    }, [router]);

    if(info == null){
            const options = {
        method: 'GET',
        url: 'https://wikiapi.p.rapidapi.com/api/v1/wiki/geography/country/info/' + country,
        params: {lan: 'en'},
        headers: {
            'x-rapidapi-key': '3b69bcc390msh36d535a7e1bf26ap18ba19jsn8fa37b8a5756',
            'x-rapidapi-host': 'wikiapi.p.rapidapi.com'
        }
    };
    console.log("requested");    
    axios.request(options).then(function (response) {
        setInfo(response.data);
        console.log("Set loader to false");
        console.log(info);
        setLoader(false);

    }).catch(function (error) {
        console.error(error);
    });
    }

    // const info = {
    //     anthem: "Anthem: 'Jana Gana Mana' 'Thou Art the Ruler of the Minds of All People'",
    //     area: "3,287,263 km2 (1,269,219 sq mi) (7th)",
    //     calling_code: "+91",
    //     capital: "New Delhi",
    //     currency: "Indian rupee (₹) (INR)₹ (Indian rupee)",
    //     date_format: "dd-mm-yyyy",
    //     demonyms: "Indian",
    //     driving_side: "left",
    //     flag_img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/125px-Flag_of_India.svg.png",
    //     formation: (2) ["Dominion 15 August 1947", "Republic 26 January 1950"],
    //     full_name: "Bhārat Gaṇarājya(see other local names)",
    //     gdp_nominal_per_capita: "$2,338 (139th)",
    //     gdp_nominal_total: "$3.202 trillion (5th)",
    //     gdp_nominal_year: "2020 estimate",
    //     gdp_ppp_per_capita: "$9,027 (118th)",
    //     gdp_ppp_total: "$12.363 trillion (3rd)",
    //     gdp_ppp_year: "2020 estimate",
    //     gini: "33.9 medium · 79th",
    //     government: "Federal parliamentary constitutional republic",
    //     hdi: "0.647 medium · 129th",
    //     internet_tld: ".in (others)",
    //     iso_3166_code: "IN",
    //     largest_city: "Mumbai (city proper) Delhi (metropolitan area)",
    //     legislature: "Parliament",
    //     location_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_%28orthographic_projection%29.svg/250px-India_%28orthographic_projection%29.svg.png",
    //     lower_house: "Lok Sabha",
    //     mains_electricity: "230 V–50 Hz",
    //     motto: "'Satyameva Jayate'",
    //     name: "Republic of India",
    //     population_census: "2011 1,210,854,977 (2nd)",
    //     population_density: "407.3/km2 (1,054.9/sq mi) (19th)",
    //     population_estimate: "2018 1,352,642,280 (2nd)",
    //     president: "Ram Nath Kovind",
    //     prime_minister: "Narendra Modi",
    //     religion: "79.8% Hinduism 14.2% Islam 2.3% Christianity 1.7% Sikhism 0.7% Buddhism 0.4% Jainism",
    //     symbol_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/60px-Emblem_of_India.svg.png",
    //     time_zone: "UTC+05:30 (IST)",
    //     upper_house: "Rajya Sabha",
    //     vice_president: "Venkaiah Naidu",
    //     water_percentage: "9.6",
    //   }

    return (
        <div className={classes.mainContainer}>
        <div className={classes.headerContainer}>
            <div><b>Info</b> Mapper</div>
            <div style={{fontSize: 19, display:"flex", alignItems:"center"}}>
                Find me at: GitHub
            </div>
        </div>
        <div className={classes.infoContainer}>
            <div className={classes.infoHeader}>
                <h1>{country}</h1>
            </div>
            {loader 
            ? <div className={classes.loader}><div></div><div></div><div></div><div></div></div>
            :            
            <div className={classes.infoSubBlock}>
                <div className={classes.infoLeft}>
                    <img src={info.flag_img} />
                    <img src={info.symbol_img}/>
                    <img src={info.location_img}/>
                </div>
                <div className={classes.infoRight}>
                    <p className={classes.lineInfo}><b>Capital:</b> {info.capital}</p>
                    <p className={classes.lineInfo}><b>Motto:</b> {info.motto}</p>
                    <p className={classes.lineInfo}><b>Currency:</b> {info.currency}</p>
                    <p className={classes.lineInfo}><b>Area:</b> {info.area}</p>
                    <p className={classes.lineInfo}><b>Population:</b> {info.population_census}</p>
                    <p className={classes.lineInfo}><b>President:</b> {info.president}</p>
                    <p className={classes.lineInfo}><b>Prime Minister:</b> {info.prime_minister}</p>
                    <p className={classes.lineInfo}><b>Dialing Code:</b> {info.calling_code}</p>
                    <p className={classes.lineInfo}><b>Time Zone:</b> {info.time_zone}</p>
                </div>
            </div>
            }

        </div>
    </div>
    )
}

export default infoPage;