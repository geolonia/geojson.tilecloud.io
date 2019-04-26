/**
 * All properties should have prefix `user_`.
 * See https://github.com/mapbox/mapbox-gl-draw/blob/master/docs/API.md
 */

const color_active = '#ff9933'
const opacity_active = 0.8
const stroke_active = '#ffffff'

export default [
  {
    id: 'draw-not-active-points',
    type: 'circle',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature']
    ],
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
    id: 'draw-not-active-linestring',
    type: 'line',
    filter: ['all',
      ['==', '$type', 'LineString'],
      ['==', 'meta', 'feature']
    ],
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
    id: 'draw-not-active-polygon',
    type: 'fill',
    filter: ['all',
      ['==', '$type', 'Polygon'],
      ['==', 'meta', 'feature']
    ],
    paint: {
      'fill-color': ['string', ['get', 'user_fill'], '#7e7e7e'],
      'fill-opacity': ['number', ['get', 'user_fill-opacity'], 0.6],
      'fill-outline-color': ['string', ['get', 'user_stroke'], '#555555'],
    },
  },
  {
    id: 'draw-linestring-symbol',
    type: 'symbol',
    filter: ['all',
      ['==', '$type', 'LineString'],
      ['==', 'meta', 'feature']
    ],
    paint: {
      'text-color': '#000000',
      'text-halo-color': 'rgba(255, 255, 255, 1)',
      'text-halo-width': 2,
    },
    layout: {
      'symbol-placement': 'line',
      'text-field': ['get', 'user_title'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 12,
      'text-max-width': 12,
      'text-allow-overlap': false,
    },
  },
  {
    id: 'draw-polygon-symbol',
    type: 'symbol',
    filter: ['all',
      ['==', '$type', 'Polygon'],
      ['==', 'meta', 'feature']
    ],
    paint: {
      'text-color': '#000000',
      'text-halo-color': 'rgba(255, 255, 255, 1)',
      'text-halo-width': 2,
    },
    layout: {
      'text-field': ['get', 'user_title'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 12,
      'text-max-width': 12,
      'text-offset': [0, 0],
      'text-allow-overlap': false,
    },
  },
  {
    id: 'draw-point-symbol',
    type: 'symbol',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'meta', 'feature']
    ],
    paint: {
      'text-color': '#333333',
      'text-halo-color': 'rgba(255, 255, 255, 1)',
      'text-halo-width': 2,
    },
    layout: {
      'icon-image': "{user_marker-symbol}-11",
      'text-field': "{user_title}",
      'text-font': ['Noto Sans Regular'],
      'text-size': 14,
      'text-anchor': 'top',
      'text-max-width': 14,
      'text-offset': [
        'case',
        ['==', 'small', ['get', 'user_marker-size']], ['literal', [0, 0.4]],
        ['==', 'large', ['get', 'user_marker-size']], ['literal', [0, 1]],
        ['literal', [0, 0.8]],
      ],
      'text-allow-overlap': false,
    },
  }
]
