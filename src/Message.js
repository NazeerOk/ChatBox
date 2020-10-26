import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "./firebase";

const Message = forwardRef(({ message, username, id }, ref) => {
     
	const useStyles = makeStyles({
		userCard: {
			background: "#0b81ff",
		},
		guestCard: {
			background: "#e9e9eb",
		},
	});
	const styles = useStyles();
    const isUser = username === message.username;
    
    const deleteMessage = (event) => {
        db.collection('messages').doc(id).delete();
    }
	return (
		<div ref={ref} className={`message ${isUser && "message_user"}`}>
			<Card className={isUser ? styles.userCard : styles.guestCard}>
				<CardContent className="message__cardContent">
					<Typography variant="h6" component="h6">
						{!isUser && `${message.username || "Unknown User"}: `}
						{message.message}
					</Typography>
					{isUser && <DeleteIcon variant="Filled" onClick={deleteMessage}/>}
				</CardContent>
			</Card>
		</div>
	);
});

export default Message;
