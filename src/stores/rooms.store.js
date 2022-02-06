import axios from "axios";
import { makeAutoObservable } from "mobx";

class Rooms {
	rooms = [];
	constructor() {
		makeAutoObservable(this);
	}

	fetchRooms = async () => {
		try {
			const roomsResult = await axios.get(
				"https://coded-task-axios-be.herokuapp.com/rooms"
			);
			this.rooms = roomsResult.data;
			// console.log(roomsResult.data);
			console.log(this.rooms.map(rom => rom));
		} catch (error) {
			console.log(error);
		}
	};

	createRoom = async newRoom => {
		// to do : call BE to create a room
		try {
			const response = await axios.post(
				"https://coded-task-axios-be.herokuapp.com/rooms",
				newRoom
			);
			this.rooms = [...this.rooms, response.data];
			console.log(this.rooms);
		} catch (error) {
			console.log(error);
		}
	};

	deleteRoom = async id => {
		try {
			await axios.delete(
				`https://coded-task-axios-be.herokuapp.com/rooms/${id}`
			);
			this.rooms = this.rooms.filter(room => room.id !== id);
		} catch (error) {
			console.log(error);
		}
	};

	updateRoom = async updatedRoom => {
		try {
			await axios.put(
				`https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
				updatedRoom
			);
			this.rooms = this.rooms.map(room =>
				room.id === updatedRoom.id ? updatedRoom : room
			);
		} catch (error) {
			console.log(error);
		}
	};

	addChat = async (roomId, msg) => {
		await axios.post(
			`https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
			msg
		);
		this.rooms = this.rooms.map(room =>
			room.id === roomId ? (room.messages = [...room.messages, msg]) : room
		);
		try {
		} catch (error) {
			console.log(error);
		}
	};
}

const roomsStore = new Rooms();
roomsStore.fetchRooms();
export default roomsStore;
