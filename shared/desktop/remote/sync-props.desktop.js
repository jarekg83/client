// @flow
// This HOC wraps a RemoteWindow so it can send props over the wire
// Listens for requests from the main process (which proxies requests from other windows) to kick off an update
// If asked we'll send all props, otherwise we do a shallow compare and send the different ones
import * as React from 'react'
import electron, {remote} from 'electron'

const ipcRenderer = electron.ipcRenderer
const BrowserWindow = remote.BrowserWindow

type Props = {
  selectorParams: ?string,
  component: string,
  remoteWindow: ?BrowserWindow,
}

function SyncProps(ComposedComponent: any) {
  class RemoteConnected extends React.PureComponent<Props> {
    _lastProps: Object = {}

    _sendProps = () => {
      if (this.props.remoteWindow) {
        try {
          const props = this._getPropsToSend()
          // TODO remove
          console.log('aaa RemoteConnector sending props', JSON.stringify(props, null, 2))
          this.props.remoteWindow && this.props.remoteWindow.emit('props', props)
        } catch (e) {
          console.error(e)
        }
      }
    }

    _onNeedProps = ({sender}, component: string, selectorParams: ?string) => {
      if (component === this.props.component && selectorParams === this.props.selectorParams) {
        // If the remote asks for props send the whole thing
        this._lastProps = {}
        this._sendProps()
      }
    }

    _getPropsToSend = () => {
      const childProps = this._getChildProps()
      const toSend = Object.keys(childProps).reduce((map, key) => {
        if (childProps[key] !== this._lastProps[key]) {
          map[key] = childProps[key]
        }
        return map
      }, {})
      this._lastProps = childProps
      return toSend
    }

    _getChildProps = () => {
      // Don't pass down remoteWindow
      const {remoteWindow, ...props} = this.props
      return props
    }

    componentDidMount() {
      ipcRenderer.on('remoteWindowWantsProps', this._onNeedProps)
    }
    componentWillUnmount() {
      ipcRenderer.removeListener('remoteWindowWantsProps', this._onNeedProps)
    }

    render() {
      this._sendProps()
      return <ComposedComponent {...this._getChildProps()} />
    }
  }

  return RemoteConnected
}

export default SyncProps
