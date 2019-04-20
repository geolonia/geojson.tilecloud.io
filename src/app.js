'use strict'

import 'babel-polyfill'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import geojsonExtent from '@mapbox/geojson-extent'
import styleControl from './lib/styleControl'
import jsonStyle from './lib/jsonStyle'

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
  styles: jsonStyle,
  userProperties: true,
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
