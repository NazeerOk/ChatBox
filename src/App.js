import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		db.collection('messages')
			.orderBy('timestamp')
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						message: doc.data(),
					}))
				);
				window.scrollTo(0,document.body.scrollHeight);
			});
	}, []);

	useEffect(() => {
		setUsername(prompt('Please enter your name:'));
	}, []);

	const sendMessege = (event) => {
		event.preventDefault();

		db.collection('messages').add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput('');
	};

	return (
		<div className="App">
		<div className="container">
			<div className="app__header">
			<ChatBubbleIcon className="app__logo"/>
			<h2 className="app__title">ChatBox</h2>
			<h3 className="app__userInfo">Welcome {username || "Unknown User"}</h3>
			</div>
			

			<FlipMove className="app__flipMove">
				{messages.map(({ message, id }) => (
					<Message key={id} username={username} message={message} id={id}></Message>
				))}
			</FlipMove>

			<form className="app__form">
				<FormControl className="app__formControl">
					<Input className="app__input" placeholder="Enter a message..." value={input} onChange={(event) => setInput(event.target.value)} />

					<IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessege}>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>
			</div>
		</div>
	);
}

export default App;
