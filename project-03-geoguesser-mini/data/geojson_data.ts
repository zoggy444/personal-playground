import auvergneRhoneAlpeGeoJson from './region_data/region-auvergne-rhone-alpes.json' with { type: "json" };
import bourgogneFrancheComteGeoJson from './region_data/region-bourgogne-franche-comte.json' with { type: "json" };
import bretagneGeoJson from './region_data/region-bretagne.json' with { type: "json" };
import centreValDeLoireGeoJson from './region_data/region-centre-val-de-loire.json' with { type: "json" };
import corseGeoJson from './region_data/region-corse.json' with { type: "json" };
import grandEstGeoJson from './region_data/region-grand-est.json' with { type: "json" };
import hautsDeFranceGeoJson from './region_data/region-hauts-de-france.json' with { type: "json" };
import ileDeFranceGeoJson from './region_data/region-ile-de-france.json' with { type: "json" };
import normandieGeoJson from './region_data/region-normandie.json' with { type: "json" };
import nouvelleAquitaineGeoJson from './region_data/region-nouvelle-aquitaine.json' with { type: "json" };
import occitanieGeoJson from './region_data/region-occitanie.json' with { type: "json" };
import paysDeLaLoireGeoJson from './region_data/region-pays-de-la-loire.json' with { type: "json" };
import provenceAlpesCoteDAzurGeoJson from './region_data/region-provence-alpes-cote-d-azur.json' with { type: "json" };

import type { GeoJsonObject } from 'geojson';

type GeoJsonMapValue = {
  name: string;
  geojson: GeoJsonObject;
};

const regionGeoJson = new Map<string, GeoJsonMapValue>([
  ['auvergne-rhone-alpes', { name: 'Auvergne-Rhône-Alpes', geojson: auvergneRhoneAlpeGeoJson }],
  ['bourgogne-franche-comte', { name: 'Bourgogne-Franche-Comté', geojson: bourgogneFrancheComteGeoJson }],
  ['bretagne', { name: 'Bretagne', geojson: bretagneGeoJson }],
  ['centre-val-de-loire', { name: 'Centre-Val de Loire', geojson: centreValDeLoireGeoJson }],
  ['corse', { name: 'Corse', geojson: corseGeoJson }],
  ['grand-est', { name: 'Grand Est', geojson: grandEstGeoJson }],
  ['hauts-de-france', { name: 'Hauts-de-France', geojson: hautsDeFranceGeoJson }],
  ['ile-de-france', { name: 'Île-de-France', geojson: ileDeFranceGeoJson }],
  ['normandie', { name: 'Normandie', geojson: normandieGeoJson }],
  ['nouvelle-aquitaine', { name: 'Nouvelle-Aquitaine', geojson: nouvelleAquitaineGeoJson }],
  ['occitanie', { name: 'Occitanie', geojson: occitanieGeoJson }],
  ['pays-de-la-loire', { name: 'Pays de la Loire', geojson: paysDeLaLoireGeoJson }],
  ['provence-alpes-cote-d-azur', { name: 'Provence-Alpes-Côte d\'Azur', geojson: provenceAlpesCoteDAzurGeoJson }],
]);

export default regionGeoJson;
