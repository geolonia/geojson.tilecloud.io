'use strict'

import 'babel-polyfill'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import geojsonExtent from '@mapbox/geojson-extent'
import styleControl from './lib/styleControl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import './style.scss'

const map = new tilecloud.Map( document.getElementById( 'map' ) )

const draw = new MapboxDraw( {
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true,
    combine_features: false,
    uncombine_features: false,
  },
  styles: [
    {
      'id': 'draw-active-points',
      'type': 'circle',
      'filter': ['all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'true']],
      paint: {
        'circle-radius': 7,
        'circle-color': '#ff3333',
        'circle-opacity': 0.6,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-opacity': 1.0,
      },
    },
    {
      'id': 'draw-not-active-points',
      'type': 'circle',
      'filter': ['all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'false']],
      paint: {
        'circle-radius': [
          'case',
          ['==', 'small', ['get', 'marker-size']], 3,
          ['==', 'large', ['get', 'marker-size']], 11,
          7,
        ],
        'circle-color': ['string', ['get', 'marker-color'], '#7e7e7e'],
        'circle-opacity': ['number', ['get', 'fill-opacity'], 0.6],
        'circle-stroke-width': ['number', ['get', 'stroke-width'], 2],
        'circle-stroke-color': ['string', ['get', 'stroke'], '#555555'],
        'circle-stroke-opacity': ['number', ['get', 'stroke-opacity'], 1.0],
      },
    },
    {
      'id': 'draw-active-linestring',
      'type': 'line',
      'filter': ['all',
        ['==', '$type', 'LineString'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'true']],
      paint: {
        'line-width': 2,
        'line-color': '#ff3333',
        'line-opacity': 1.0,
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
    },
    {
      'id': 'draw-not-active-linestring',
      'type': 'line',
      'filter': ['all',
        ['==', '$type', 'LineString'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'false']],
      paint: {
        'line-width': ['number', ['get', 'stroke-width'], 2],
        'line-color': ['string', ['get', 'stroke'], '#555555'],
        'line-opacity': ['number', ['get', 'stroke-opacity'], 1.0],
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
    },
    {
      'id': 'draw-active-polygon',
      'type': 'fill',
      'filter': ['all',
        ['==', '$type', 'Polygon'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'true']],
      paint: {
        'fill-color': '#ff3333',
        'fill-opacity': 0.6,
        'fill-outline-color': '#ffffff',
      },
    },
    {
      'id': 'draw-not-active-polygon',
      'type': 'fill',
      'filter': ['all',
        ['==', '$type', 'Polygon'],
        ['==', 'meta', 'feature'],
        ['==', 'active', 'false']],
      paint: {
        'fill-color': ['string', ['get', 'fill'], '#7e7e7e'],
        'fill-opacity': ['number', ['get', 'fill-opacity'], 0.6],
        'fill-outline-color': ['string', ['get', 'stroke'], '#555555'],
      },
    },
  ],
} )

map.addControl( draw, 'top-right' );
map.addControl(new styleControl() );

[ 'draw.create', 'draw.update', 'draw.delete' ].forEach( ( eventType ) => {
  map.on( eventType, () => {
    const textArea = document.getElementById( 'geojson' )
    const geoJson = draw.getAll()
    textArea.value = JSON.stringify( geoJson, null, '  ' )
  } )
} )

const drawSet = () => {
  if ( document.getElementById( 'geojson' ).value.trim() ) {
    const json = JSON.parse( document.getElementById( 'geojson' ).value )
    draw.set( json )
    const bounds = geojsonExtent( json )
    map.fitBounds( bounds, {
      padding: 20,
    } )
  }
}

document.getElementById( 'geojson' ).addEventListener( 'change', drawSet )
window.addEventListener( 'load', drawSet )
