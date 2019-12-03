import React, { Component, Fragment } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageForm from './MessageForm';

export default class Chat extends Component {

  state = {
    viewChat: false
  }

  handleClick = () => {
    this.setState(prevState => {
      return {
        viewChat: !prevState.viewChat
      }
    })
  }

  expandChat = () => {
    const { chat, handleNewMessage } = this.props
    return (
      <Fragment>
        <MessageDisplay chat={ chat } />
        <MessageForm chat={ chat }
                      handleNewMessage={ handleNewMessage } />
      </Fragment>
    )
  }

  render() {
    const { state: {viewChat},
            props: {chat},
            handleClick,
            expandChat } = this
    return (
      <Fragment>
        <p onClick={ handleClick }>{ chat.title }</p>
        { viewChat ? expandChat() : null }
      </Fragment>
    )
  }
}
