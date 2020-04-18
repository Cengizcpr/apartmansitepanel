import React, { Component } from 'react'
import { Link } from "react-router-dom";
class ResultList extends Component {
  constructor(props) {
    super(props);
    this.state={
      a:"cengiz"
    }
  }
  render() {
   

    return (
      <div>
    <Link to={{ pathname: '/apartmentsettings', state: { foo: this.state.a} }}>My route</Link>


      </div>
    )
  }

}

export default ResultList