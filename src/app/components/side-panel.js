import { AbstractPanel } from './panel'
const csjs = require('csjs-inject')
const yo = require('yo-yo')

const css = csjs`
  .panel {
    height: 100%;
    overflow-y: hidden; 
  }
  .swapitTitle {
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .swapitTitle a{
    cursor: help;
  }
  .swapitTitle i{
    padding-left:4px;
    font-size:10px;
  }
  .swapitHeader {
    height: 35px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .swapitHeader h6 {
    margin: 0;
  }
  .icons i {
    height: 80%;
    cursor: pointer;
  }
  .pluginsContainer {
    height: calc(100% - 35px);
    overflow: auto;
  }
`

const options = {
  default: true
}

export class SidePanel extends AbstractPanel {

  constructor (appStore) {
    super('sidePanel', appStore, options)
    this.header = this.renderHeader()
    this.store = appStore
  }

  /**
   * Display content and update the header
   * @param {String} name The name of the plugin to display
   */
  showContent (name) {
    super.showContent(name)
    yo.update(this.header, this.renderHeader())
  }

  /** The header of the swap panel */
  renderHeader () {
    let name = ' - '
    let docLink = ''
    if (this.active) {
      const { profile } = this.store.getOne(this.active)
      name = profile.displayName ? profile.displayName : profile.name
      const docsRoot = 'https://remix.readthedocs.io/en/latest/'
      docLink = profile.documentation ? yo`<a href="${docsRoot}${profile.documentation}" title="link to documentation" target="_blank"><sup><i aria-hidden="true" class="fas fa-book"></i></sup></a>` : ''
    }

    return yo`
    <header class="${css.swapitHeader}">
  <h6 class="${css.swapitTitle}">${name}${docLink}</h6>
      </div>
    </header>`
  }

  render () {
    return yo`
      <section class="${css.panel}">
        ${this.header}
        <div class="${css.pluginsContainer}">
          ${this.view}
        </div>
      </section>`
  }
}
