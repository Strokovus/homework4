import React, { Component } from 'react'
import axios from 'axios'

const baseURL = window.location.protocol + "//" + window.location.host

export class Getform extends Component {
  constructor(props) {
      super(props)

      this.state = {
          Title: '',
          Content: '',
          Postid: '',
      }

  }

  retrievalHandler = e => {
      axios.get(`${baseURL}/posts/`, {
      })
          .then(response => {
              console.log(response)
              alert("Retrieved!")
              this.setState({ Title: response.data[0].title });
              this.setState({ Content: response.data[0].content });
          }).catch(error => {
              console.log(error)
          })
  }

  render() {
      const { Title, Content} = this.state
      return (
          <>
              <p>Get Request (gets the latest post)</p>
              <button onClick={this.retrievalHandler}>
                        Latest Post
                    </button>
              <h2> {Title} </h2>
              <p>{Content}</p>
          </>
      )
  }
}

export default Getform