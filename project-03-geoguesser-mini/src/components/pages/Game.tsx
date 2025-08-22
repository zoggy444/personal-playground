import { MapContainer } from 'react-leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { MAP_CENTER } from "../../App";
import type { GeoJsonObject } from 'geojson';
import type { LeafletEvent, } from 'leaflet';

import departmentData from '../../../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../../../data/regions-version-simplifiee.json';

import '../../index.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';
import GamePrompter from "./GamePrompter";
import MapControl from "../reusable-ui/MapControl";
import type { GameProps, GeoDataType } from '../../types';

// const FRANCE_BOUNDS = new LatLngBounds([-5.156709, 41.320594],[9.707940, 51.119273])

function Game({
  gameMode,
  toGuess,
  guessedCorrectly,
  guessedIncorrectly,
  onAreaClick,
  onNewRoundClick,
}: GameProps) {

  const geojsonData: GeoDataType = gameMode === 'region' ? regionData : departmentData;;

  const onGeoJsonClick = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    const name = layer.feature.properties.nom;
    return onAreaClick(name);
  }

  const onGeoJsonMouseOver = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    // Highlight the hovered area without changing color
    layer.setStyle({
      weight: 3, // Increase stroke width to highlight
      fillOpacity: 1 // Increase fill opacity
    })
  }

  const onGeoJsonMouseOut = (e: LeafletEvent) => {
    const layer = e.propagatedFrom;
    // Reset the style when mouse leaves
    layer.setStyle({
      weight: 1, // Reset stroke width
      fillOpacity: 0.25 // Reset fill opacity
    });
  }

  return (
  <> 
    <MapContainer
        center={MAP_CENTER}
        dragging={false}
        zoom={6}
        scrollWheelZoom={false}
        zoomControl={false}
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
            click: onGeoJsonClick,
            mouseover: onGeoJsonMouseOver,
            mouseout: onGeoJsonMouseOut
          }}>
        </GeoJSON>
      ))}
      <MapControl position='topright'>
        <GamePrompter toGuess={toGuess} guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onNewRoundClick={onNewRoundClick}/>
      </MapControl>
    </MapContainer>
    
  </>
  )
}

export default Game;