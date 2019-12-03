import React, { Component, Fragment } from 'react';
import ChatForm from './ChatForm'
import Chat from './Chat'
import './App.css';
import { ActionCableConsumer } from 'react-actioncable-provider';

export default class App extends Component {

  state = {
    chats: []
  }

  handleNewChat = title => {
    fetch('http://localhost:3000/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({title})
    })
    // .then(res => res.json())
    // .then(chat => {
    //   this.setState(prevState => {
    //     return {
    //       chats: [...prevState.chats, chat]
    //     }
    //   })
    // })
  }

  handleNewMessage = (chat_id, name, content) => {
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        chat_id,
        name,
        content
      })
    })
    // .then(res => res.json())
    // // .then(console.log)
    // .then(chatObj => this.setState(prevState => {
    //   return {
    //     chats: prevState.chats.map(chat => {
    //       return chat.id === chatObj.id ? chatObj : chat
    //     })
    //   }
    // }))
  }

  handleReceivedChat = chat => {
    this.setState(prevState => {
      return {
        chats: [...prevState.chats, chat]
      }
    })
  }

  handleReceivedMessage = chatObj => {
    this.setState(prevState => {
      return {
        chats: prevState.chats.map(chat => {
          return chat.id === chatObj.id ? chatObj : chat
        })
      }
    })
  }

  renderMessageActionCables = () => {
    const { state: {chats}, handleReceivedMessage } = this
    return chats.map(chat => {
      return <ActionCableConsumer
                  key={ chat.id }
                  channel={ {channel: 'MessagesChannel', chat_id: chat.id} }
                  onReceived={ handleReceivedMessage } />
    })
  }

  renderChats = () => {
    const { state: {chats}, handleNewMessage } = this
    return chats.map(chat => {
      return (
        <Chat key={ chat.id }
              chat={ chat }
              handleNewMessage={ handleNewMessage }/>
      )
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/chats')
    .then(res => res.json())
    .then(chats => this.setState({chats}))
  }

  render() {
    const { handleNewChat,
            handleReceivedChat,
            renderMessageActionCables,
            renderChats } = this
    return (
      <Fragment>
        <ActionCableConsumer
              channel={ {channel: 'ChatsChannel'} }
              onReceived={ handleReceivedChat }/>
        { renderMessageActionCables() }
        <ChatForm handleNewChat={ handleNewChat } />
        { renderChats() }
      </Fragment>
    )
  }
}
