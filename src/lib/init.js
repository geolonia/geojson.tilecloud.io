'use strict'

/* global tilecloud:false */

import MapboxDraw from '@mapbox/mapbox-gl-draw'
import geojsonExtent from '@mapbox/geojson-extent'
import styleControl from './styleControl'
import jsonStyle from './jsonStyle'

export default () => {
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

  map.addControl( draw, 'top-right' )
  map.addControl(new styleControl() );

  [ 'draw.create', 'draw.update', 'draw.delete' ].forEach( eventType => {
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
      if (bounds) {
        map.fitBounds( bounds, {
          padding: 20,
        } )
      }
    } else {
      const json = {
        type: 'FeatureCollection',
        features: [],
      }
      document.getElementById( 'geojson' ).value = JSON.stringify( json, null, '  ' )
    }
  }

  document.getElementById( 'geojson' ).addEventListener( 'change', drawSet )
  window.addEventListener( 'load', drawSet )
}
