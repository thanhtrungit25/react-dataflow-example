import React, { Component } from "react"
import { connect } from "react-redux"
import autoBind from "react-autobind"
import "./TopicsScreen.css"
import * as topicsActions from "../store/topics/actions"
import * as topicsSelectors from "../store/topics/reducer"
import ListView from "../components/ListView"
import ListRow from "../components/ListRow"

class TopicsScreen extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  componentDidMount() {
    this.props.dispatch(topicsActions.fetchTopics())
  }

  render() {
    if (!this.props.topicsByUrl) return this.renderLoading()
    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowsIdArray={this.props.topicsUrlArray}
          rowsById={this.props.topicsByUrl}
          renderRow={this.renderRow}
        />
        {!this.props.canFinalizeSelection ? (
          false
        ) : (
          <button className="NextScreen" onClick={this.onNextScreenClick} />
        )}
      </div>
    )
  }

  renderLoading() {
    return <p>Loading...</p>
  }

  renderRow(topicUrl, topic) {
    const selected = this.props.selectedRowsById[topicUrl]
    return (
      <ListRow rowId={topicUrl} onClick={this.onRowClick} selected={selected}>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    )
  }

  onRowClick(topicUrl) {
    this.props.dispatch(topicsActions.selectTopic(topicUrl))
  }

  onNextScreenClick() {
    this.props.dispatch(topicsActions.finalizeTopicSelection())
  }
}

// which props do we want to inject, given the global store state
function mapStateToProps(state) {
  const [topicsByUrl, topicsUrlArray] = topicsSelectors.getTopics(state)
  return {
    topicsByUrl,
    topicsUrlArray,
    selectedRowsById: topicsSelectors.getSelectedTopicsByUrl(state),
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
  }
}

export default connect(mapStateToProps)(TopicsScreen)
