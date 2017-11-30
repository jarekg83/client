// @flow
// This loads up a remote component. It makes a pass-through store which accepts its props from the main window through ipc
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// $FlowIssue
import RemoteStore from './store'
import Root from '../renderer/container'
import Menubar from '../../menubar/remote-container.desktop'
import Pinentry from '../../pinentry/remote-container.desktop'
import PurgeMessage from '../../pgp/remote-container.desktop'
import Tracker from '../../tracker/remote-container.desktop'
import UnlockFolders from '../../unlock-folders/remote-container.desktop'
import {disable as disableDragDrop} from '../../util/drag-drop'
import {globalColors} from '../../styles'
import {remote, BrowserWindow} from 'electron'
import {setupContextMenu} from '../app/menu-helper'
import {setupSource} from '../../util/forward-logs'
import {makeEngine} from '../../engine'

setupSource()
disableDragDrop()
makeEngine() // TODO remove when the avatar dep on engine is fixed

module.hot && module.hot.accept()

class RemoteComponentLoader extends Component<any> {
  _store: any
  _ComponentClass: any
  _window: ?BrowserWindow

  _onGotProps = () => {
    // Show when we get props, unless its the menubar
    if (this._window && this.props.component !== 'menubar') {
      this._window.show()
    }
  }

  _getComponent = (key: string) => {
    switch (key) {
      case 'puregeMessage':
        return PurgeMessage
      case 'unlockFolders':
        return UnlockFolders
      case 'menubar':
        return Menubar
      case 'pinentry':
        return Pinentry
      case 'tracker':
        return Tracker
      default:
        throw new TypeError('Invalid Remote Component passed through')
    }
  }

  componentWillMount() {
    this._window = remote.getCurrentWindow()
    this._store = new RemoteStore({
      component: this.props.component,
      gotPropsCallback: this._onGotProps,
      selectorParams: this.props.selectorParams,
    })
    this._ComponentClass = this._getComponent(this.props.component)

    setupContextMenu(this._window)
  }

  render() {
    const TheComponent = this._ComponentClass
    return (
      <div id="RemoteComponentRoot" style={styles.container}>
        <Root store={this._store}>
          <TheComponent />
        </Root>
      </div>
    )
  }
}

const styles = {
  container: {
    backgroundColor: globalColors.white,
    display: 'block',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  loading: {
    backgroundColor: globalColors.grey,
  },
}

function load(options) {
  const node = document.getElementById('root')
  if (node) {
    ReactDOM.render(
      <RemoteComponentLoader component={options.component} selectorParams={options.selectorParams} />,
      node
    )
  }
}

window.load = load