import type { MapControlProps } from "../../types";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
} as const;

function MapControl({ position, children }: MapControlProps) {
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

export default MapControl;
