/* import React, { Component } from "react";

class Filter extends Component {
  render() {
    const greeting = 'Welcome to React';
    return <h1>{greeting}</h1>;
  }
}
export default Filter */
import React, { Component } from 'react'
import ResultList from "../Pages/ResultList"
class Filter extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    const {foo} = this.props.location.state

    console.log(foo) 
    return (
    <div></div>
    )
  }

}

export default Filter