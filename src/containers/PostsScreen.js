import React, { Component } from "react"
import { connect } from "react-redux"
import * as postsActions from "../store/posts/actions"
import "./PostsScreen.css"

class PostsScreen extends Component {
  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts())
  }
  render() {
    return <div className="PostsScreen">PostsScreen</div>
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect()(PostsScreen)
