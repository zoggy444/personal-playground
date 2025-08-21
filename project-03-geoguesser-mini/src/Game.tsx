import React, { useState, useMemo, Children, type EventHandler } from "react";
import type { AreaType } from "./App";
import { MapContainer, useMap } from 'react-leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { LatLngBounds } from "leaflet";
import { MAP_CENTER } from "./App";
import type { GeoDataType } from "./App";
import type { GeoJsonObject } from 'geojson';
import type { LeafletEvent, Map, } from 'leaflet';

import departmentData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';

import './App.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';
import { Button } from "@blueprintjs/core";
import GamePrompter from "./GamePrompter";

const FRANCE_BOUNDS = new LatLngBounds([-5.156709, 41.320594],[9.707940, 51.119273])

export type GameProps = {
  gameMode: AreaType;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onAreaClick: (name: string) => void;
  onNewRoundClick: () => void;
};

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
} as const;

type PositionType = "bottomleft" | "bottomright" | "topleft" | "topright";

function PrompterControl({ position, children }:
    {position: PositionType;
      children?: React.ReactNode;
    }) {
  // const parentMap = useMap()

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">
        {children}
      </div>
    </div>
  )
}

function MapInteraction(){
  const map: Map = useMap()

  /*if (map) {
    console.log(`const bounds: ${FRANCE_BOUNDS.toBBoxString()}`);
    map.fitBounds(FRANCE_BOUNDS);
    console.log(`map bounds: ${map.getBounds().toBBoxString()}`);
  }*/
  
  return null;
}

function Game({
  gameMode,
  toGuess,
  guessedCorrectly,
  guessedIncorrectly,
  onAreaClick,
  onNewRoundClick,
}: GameProps) {
  const [map, setMap] = useState<Map|null>(null);

  const geojsonData: GeoDataType = gameMode === 'region' ? regionData : departmentData;;
/*
  console.log(map);

  if (map) {
    map.fitBounds(FRANCE_BOUNDS);
    console.log(map.getBounds());
  }
  */
  // console.log(`map bounds: ${map?.getBounds().toBBoxString()}`);
  // map?.fitBounds([[41.320594,-5.156709],[51.119273,9.707940]]);
  // console.log(`map bounds: ${map?.getBounds().toBBoxString()}`);
  // whenReady={() => map?.fitBounds(FRANCE_BOUNDS)}

  return (
  <> 
    <MapContainer
        center={MAP_CENTER}
        dragging={false}
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={false}
        ref={setMap}
        >
      {/* special key for area to guess to force a rerender on third fail guess and allow className to change*/}
      {geojsonData.features.map((feature) => (
        <GeoJSON
          key={`${feature.properties.nom === toGuess ? guessedIncorrectly.length >=3 ? 'failed-' : 'to-guess-' : '' }${feature.properties.code}`}
          data={feature as GeoJsonObject}
          style={{
          color: `${ feature.properties.nom == guessedCorrectly ? 'green' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'red' : 'blue'}`, weight: 1,
          fillColor: `${ feature.properties.nom == guessedCorrectly ? 'lightgreen' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'lightred' : 'lightblue'}`,
          fillOpacity: 0.25,
          className: `area-${feature.properties.code} ${feature.properties.nom === toGuess ? guessedIncorrectly.length >=3 ? 'failed' : 'to-guess' : '' }` }}
          eventHandlers={{
          click: (e: LeafletEvent) => {
            const layer = e.propagatedFrom;
            const name = layer.feature.properties.nom;
            return onAreaClick(name);
          },
          mouseover: (e) => {
            const layer = e.propagatedFrom;
            // Highlight the hovered area without changing color
            layer.setStyle({
            weight: 3, // Increase stroke width to highlight
            fillOpacity: 1 // Increase fill opacity
            });
          },
          mouseout: (e) => {
            const layer = e.propagatedFrom;
            // Reset the style when mouse leaves
            layer.setStyle({
            weight: 1, // Reset stroke width
            fillOpacity: 0.25 // Reset fill opacity
            });
          }
          }}>
        </GeoJSON>
      ))}
      <PrompterControl position='topright'>
        <GamePrompter toGuess={toGuess} guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onNewRoundClick={onNewRoundClick}/>
      </PrompterControl>
    </MapContainer>
    
  </>
  )
}

export default Game;