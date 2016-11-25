import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectNetwork, selectWeek, fetchAPIData} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'


class App extends Component {
  constructor(props) {
    super(props)
    //this.handleChange = this.handleChange.bind(this)
    //this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleNetChange = this.handleNetChange.bind(this)
    this.handleWeekChange = this.handleWeekChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  componentDidMount() {
    console.log("mounted")
    const { dispatch } = this.props
    

    dispatch(fetchAPIData("http://rockthecatzva.com/slim-tracker/api/getnets", "nets"))
    dispatch(fetchAPIData("http://rockthecatzva.com/slim-tracker/api/getweeks", "weeks"))

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.selectedNetwork !== this.props.selectedNetwork) {
      const {dispatch, selectedNetwork} = nextProps
      this.handleNetChange(nextProps.selectedNetwork)
    }

    if (nextProps.selectedWeek !== this.props.selectedWeek) {
      const {dispatch, selectedWeek} = nextProps
      this.handleWeekChange(nextProps.selectedWeek)
    }

  }


  handleNetChange(nextNet){
    console.log("on change", nextNet)
    this.props.dispatch(selectNetwork(nextNet))
  }

  handleWeekChange(nextWk){
    this.props.dispatch(selectWeek(nextWk))
    //console.log("THis", this)
  }



  handleSubmitClick(e){
    console.log("THis", this)
    e.preventDefault()
    const{dispatch} = this.props
    dispatch(fetchAPIData('http://rockthecatzva.com/slim-tracker/api/getweeklyratings/?net%5B%5D=FAKENET&metric=aa&stream%5B%5D=lsd&demo%5B%5D=p55&starttime=2014-12-22&weeks=7', 'Weekly7-P55-LSD', ['date_time', 'rating_avg']))
    dispatch(fetchAPIData('http://rockthecatzva.com/slim-tracker/api/getweeklyratings/?net%5B%5D=FAKENET&metric=aa&stream%5B%5D=lsd&demo%5B%5D=p2_17&starttime=2014-12-22&weeks=7', 'Weekly7-P2_17-LSD', ['date_time', 'rating_avg']))
    dispatch(fetchAPIData('http://rockthecatzva.com/slim-tracker/api/getaverage?net=FAKENET&metric=imp&demo=p2&starttime=2014-12-22&stream=l7d&weeks=1', 'Week1-P2-L7D-IMP', ['rating_avg']))
  }

  render() {
    const {selectedNetwork, selectedWeek, apiData } = this.props

    return (
      <div>
        {((apiData.weeks)&&(apiData.nets)) &&
          <div>
            <Picker value={selectedWeek}
                    onChange={this.handleWeekChange}
                    options={apiData.weeks}
                    propname={"date_time"} />

            <Picker value={selectedNetwork}
                    onChange={this.handleNetChange}
                    options={apiData.nets}
                    propname={"net"} />
          </div>
        }

        <button type="button" onClick={this.handleSubmitClick} >Submit</button>

      </div>
    )
  }
}

App.propTypes = {
  selectedNetwork: PropTypes.string.isRequired,
  selectedWeek: PropTypes.string.isRequired,
  apiData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedNetwork, selectedWeek, apiData } = state


  return {
    selectedNetwork,
    selectedWeek,
    apiData
  }
}

export default connect(mapStateToProps)(App)
