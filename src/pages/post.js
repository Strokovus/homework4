import React, { Component } from 'react'
import axios from 'axios'

export class Postform extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Title: '',
            Content: '',
            value: true
        }

    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        //the stored value = the entered value every time the field changes
    }
    disabler = e => {

    }

    submisionHandler = e => {
        e.preventDefault()
        console.log(this.state.value)
        this.setState({ value: !this.state.value });
        console.log(this.state)
        axios.post("http://localhost:8082/posts", this.state)
            .then(
                this.setState({ Title: '' }),
                this.setState({ Content: '' }),
            )
            .then(response => {
                console.log(response)
                alert("Posted!")
                this.setState({ value: !this.state.value });
            }).catch(error => {
                console.log(error)
                alert("Error.")
                this.setState({ value: !this.state.value });
            })
    }

    render() {
        const { Title, Content, value } = this.state
        return (

            <>
            <p>Post Request</p>
                <form onSubmit={this.submisionHandler}>
                    <label>Title</label><br /><br />
                    <input name='Title' onChange={this.changeHandler} value={Title}></input><br /><br />
                    <label>Content</label><br /><br />
                    <input name='Content' name="Content" value={Content} onChange={this.changeHandler}></input><br /><br />
                    <button disabled={!Title || !Content || !value}>
                        Submit
                    </button>
                </form>
            </>
        )
    }
}

export default Postform
