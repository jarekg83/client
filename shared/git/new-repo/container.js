// @flow
import * as Creators from '../../actions/git/creators'
import * as I from 'immutable'
import NewRepo from '.'
import {compose, lifecycle, mapProps} from 'recompose'
import {connect} from 'react-redux'
import {getTeams} from '../../actions/teams/creators'
import {navigateTo} from '../../actions/route-tree'
import {teamsTab} from '../../constants/tabs'

import type {TypedState} from '../../constants/reducer'

const mapStateToProps = (state: TypedState, {routeProps}) => ({
  _teams: state.entities.getIn(['teams', 'teamnames'], I.Set()),
  error: state.entities.getIn(['git', 'error']),
  isTeam: routeProps.isTeam,
  loading: state.entities.getIn(['git', 'loading']),
})

const mapDispatchToProps = (dispatch: any, {navigateAppend, navigateUp, routeProps}) => ({
  _loadTeams: () => dispatch(getTeams()),
  onClose: () => dispatch(navigateUp()),
  onCreate: (name: string, teamname: ?string, notifyTeam: boolean) => {
    const createAction = routeProps.isTeam && teamname
      ? Creators.createTeamRepo(teamname, name, notifyTeam)
      : Creators.createPersonalRepo(name)
    dispatch(createAction)
  },
  onNewTeam: () => dispatch(navigateTo([teamsTab], ['showNewTeamDialog'])),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(props => ({
    ...props,
    teams: props._teams.toArray().sort(),
  })),
  lifecycle({
    componentDidMount: function() {
      this.props._loadTeams()
    },
  })
)(NewRepo)
