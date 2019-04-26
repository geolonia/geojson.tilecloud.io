'use strict'

/* global tilecloud:false */

import MapboxDraw from '@mapbox/mapbox-gl-draw'
import geojsonExtent from '@mapbox/geojson-extent'
import turfCenter from '@turf/center'
import styleControl from './styleControl'
import jsonStyle from './jsonStyle'
import toTable from './toTable'

export default () => {
  const map = new tilecloud.Map( document.getElementById( 'map' ) )

  const draw = new MapboxDraw( {
    boxSelect: false,
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
      document.getElementById( 'geojson' ).value = JSON.stringify(json, null, '  ')
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

  map.on( 'draw.selectionchange', event => {
    if ( event.features.length ) {
      const feature = event.features[ event.features.length - 1 ]
      const center = turfCenter( feature ).geometry.coordinates
      const content = toTable( feature.properties )
      new mapboxgl.Popup().setLngLat( center ).setHTML( content ).addTo( map )
    }
  } )
}
