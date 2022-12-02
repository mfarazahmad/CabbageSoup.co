import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import allStates from "./data.json"
import axios from "axios"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};


const MapChart = ({ setTooltipContent }) => {

  const [findState, settingState] = useState("");
  const [numerberofcustomers, settingnumberofcustomers] = useState("");

  return (
    <ComposableMap data-tip="" projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { name } = geo.properties;
                  settingState(`${name}`)
                  const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + `/analytics/map?state=${findState}`
                  endpoint)
              .then(res => {
                settingnumberofcustomers(res.data)
                console.log(res.data)
              })
                  setTooltipContent(`${name} has ${numerberofcustomers} customers`);
                }}
            onMouseLeave={() => {
              setTooltipContent("");
            }}
            style={{
              default: {
                fill: "#D6D6DA",
                outline: "none"
              },
              hover: {
                fill: "#F53",
                outline: "none"
              },
              pressed: {
                fill: "#E42",
                outline: "none"
              }
            }}
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (

                      <Marker coordinates={centroid} >
                        <text y="2" fontSize={14} textAnchor="middle" >
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};



export default MapChart;

