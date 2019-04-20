'use strict'

import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

class styleControl {
  constructor() {

  }

  onAdd() {
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl'

    return this.container
  }

  onRemove() {
    this.container.parentNode.removeChild( this.container )
  }

  getDefaultPosition() {
    return 'top-left'
  }
}

export default styleControl
