import React, { Component } from "react"
import { connect } from "react-redux"
import autoBind from "react-autobind"
import "./PostsScreen.css"
import * as postsActions from "../store/posts/actions"
import * as postsSelectors from "../store/posts/reducer"
import * as topicsSelectors from "../store/topics/reducer"
import ListView from "../components/ListView"
import ListRow from "../components/ListRow"
import TopicFilter from "../components/TopicFilter"
import PostView from "../components/PostView"

class PostsScreen extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  componentDidMount() {
    this.props.dispatch(postsActions.fetchPosts())
  }
  render() {
    if (!this.props.postsById) return this.renderLoading()
    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={this.props.topicsByUrl}
            selected={this.props.currentFilter}
            onChanged={this.onFilterChange}
          />
          <ListView
            rowsIdArray={this.props.postsIdArray}
            rowsById={this.props.postsById}
            renderRow={this.renderRow}
          />
        </div>
        <div className="ContentPane">
          <PostView post={this.props.currentPost} />
        </div>
      </div>
    )
  }

  renderLoading() {
    return <p>Loading...</p>
  }

  renderRow(postId, post) {
    const selected = this.props.currentPost === post
    return (
      <ListRow rowId={postId} onClick={this.onRowClick} selected={selected}>
        {!post.thumbnail ? (
          false
        ) : (
          <img className="thumbnail" src={post.thumbnail} alt="thumbnail" />
        )}
        <h3>{post.title}</h3>
      </ListRow>
    )
  }

  onFilterChange(newFilter) {
    this.props.dispatch(postsActions.changeFilter(newFilter))
  }

  onRowClick(postId) {
    this.props.dispatch(postsActions.selectPost(postId))
  }
}

function mapStateToProps(state) {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state)
  return {
    postsById,
    postsIdArray,
    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    currentFilter: postsSelectors.getCurrentFilter(state),
    currentPost: postsSelectors.getCurrentPost(state)
  }
}

export default connect(mapStateToProps)(PostsScreen)
