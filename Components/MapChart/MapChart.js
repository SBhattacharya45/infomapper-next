import React from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = props => {
  return (
    <>
      <ComposableMap data-tip="" width={1050} height={600} projectionConfig={{ scale: 200 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {props.fetchData(geo.properties.NAME)}}
                  onMouseLeave={() => {props.onExit()}}
                  onDoubleClick={() => {props.clicked(geo.properties.NAME)}}
                  style={{
                    default: {
                      fill: "#218b82",
                      outline: "none"
                    },
                    hover: {
                      fill: "#e5db9c",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#e5db9c",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </>
  );
};

export default MapChart;
