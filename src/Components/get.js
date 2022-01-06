import React, { Component } from 'react'
import axios from 'axios'

export class Getform extends Component {
  constructor(props) {
      super(props)

      this.state = {
          Title: '',
          Content: '',
          Postid: ''
      }

  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
    //the stored value = the entered value every time the field changes
}

  retrievalHandler = e => {
      axios.get("http://localhost:8082/posts/", {
        params: {
          postid: {Postid}
        }
      })
          .then(response => {
              console.log(response)
              this.setState({ Title: response.data[0].title });
              this.setState({ Content: response.data[0].content });
          }).catch(error => {
              console.log(error)
          })
  }

  render() {
      const { Title, Content, Postid} = this.state
      return (
          <>
              <p>Get Request (gets the latest post)</p>
              <form onSubmit={this.retrievalHandler}>
                    <label>PostId</label><br /><br />
                    <input name='PostID' onChange={this.changeHandler} value={Postid}></input><br /><br />
                    <button>
                        Get Post
                    </button>
                </form>
              
              <h2> {Title} </h2>
              <p>{Content}</p>
          </>
      )
  }
}

export default Getform