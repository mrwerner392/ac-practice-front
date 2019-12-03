import React, { Component } from 'react';

export default class ChatForm extends Component {

  state = {
    title: ''
  }

  handleChange = evt => {
    this.setState({
      title: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { props: {handleNewChat}, state: {title} } = this
    handleNewChat(title)
  }

  render() {
    const { state: {title}, handleChange, handleSubmit } = this
    return (
      <form onSubmit={ handleSubmit }>
        <input name='title'
                value={ title }
                placeholder='new chat title'
                onChange={ handleChange }
                />
        <input type='submit' />
      </form>
    )
  }

}
