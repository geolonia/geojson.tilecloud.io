/**
 * All properties should have prefix `user_`.
 * See https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */

export default [
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
        ['==', 'small', ['get', 'user_marker-size']], 3,
        ['==', 'large', ['get', 'user_marker-size']], 11,
        7,
      ],
      'circle-color': ['string', ['get', 'user_marker-color'], '#7e7e7e'],
      'circle-opacity': ['number', ['get', 'user_fill-opacity'], 0.6],
      'circle-stroke-width': ['number', ['get', 'user_stroke-width'], 2],
      'circle-stroke-color': ['string', ['get', 'user_stroke'], '#555555'],
      'circle-stroke-opacity': ['number', ['get', 'user_stroke-opacity'], 1.0],
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
      'line-width': ['number', ['get', 'user_stroke-width'], 2],
      'line-color': ['string', ['get', 'user_stroke'], '#555555'],
      'line-opacity': ['number', ['get', 'user_stroke-opacity'], 1.0],
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
      'fill-color': ['string', ['get', 'user_fill'], '#7e7e7e'],
      'fill-opacity': ['number', ['get', 'user_fill-opacity'], 0.6],
      'fill-outline-color': ['string', ['get', 'user_stroke'], '#555555'],
    },
  },
]
