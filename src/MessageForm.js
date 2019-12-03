import React, { Component } from 'react';

export default class MessageForm extends Component {

  state = {
    name: '',
    content: ''
  }

  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { state: {name, content},
    props: {chat, handleNewMessage} } = this
    handleNewMessage(chat.id, name, content)
    this.setState({
      name: '',
      content: ''
    })
  }

  render() {
    const { state: {name, content},
            handleChange,
            handleSubmit } = this

    return (
      <form onSubmit={ handleSubmit }>
        <input name='name'
                value={ name }
                placeholder='name'
                onChange={ handleChange } />
        <input name='content'
                value={ content }
                placeholder='new message'
                onChange={ handleChange } />
        <input type='submit' />
      </form>
    )
  }
}
