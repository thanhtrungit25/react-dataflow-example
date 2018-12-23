import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

import * as reducers from "./store/reducers"
const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
