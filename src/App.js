import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Routes } from "react-router-dom";

import axios from "axios";
import roomsStore from "./stores/rooms.store";
import { observer } from "mobx-react";

const App = () => {
	let rooms = roomsStore.rooms;
	useEffect(() => {
		roomsStore.fetchRooms();
	}, []);

	const addChat = async (roomId, msg) => {
		await axios.post(
			`https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
			msg
		);
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='__main'>
			<div className='main__chatbody'>
				<center>
					<Routes>
						<Route
							path='/room/:roomSlug'
							element={<ChatRoom rooms={rooms} addChat={addChat} />}
						/>
						<Route exact path='/' element={<ChatRoomsList rooms={rooms} />} />
					</Routes>
				</center>
			</div>
		</div>
	);
};

export default observer(App);
