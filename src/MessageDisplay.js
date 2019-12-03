import React, { Component, Fragment } from 'react';

export default class MessageDisplay extends Component {

  renderMessages = () => {
    const { chat } = this.props
    return chat.messages.map(message => <li key={ message.id }>
                            { `${message.name}: ${message.content}`}
                          </li>)
  }

  render() {
    const { renderMessages } = this
    return (
      <Fragment>
        { renderMessages() }
      </Fragment>
    )
  }

}
