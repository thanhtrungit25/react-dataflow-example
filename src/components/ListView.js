import _ from "lodash"
import autoBind from "react-autobind"
import React, { Component } from "react"

export default class ListView extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  render() {
    return <ul>{_.map(this.props.rowsIdArray, this.renderRowById)}</ul>
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.props.renderRow(rowId, _.get(this.props.rowsById, rowId))}
      </li>
    )
  }
}
