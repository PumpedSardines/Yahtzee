import React, { useState } from 'react';

import { _users, _started } from './../recoil/users.js';
import { useSetRecoilState } from 'recoil';

const User = ({ name, remove }) => {
	return <h2 onClick={() => {remove(name)}}>{name}</h2>
}

function SelectUsersView({start}) {
	const [users, setUsers] = useState([]);
	const [userName, setUserName] = useState("");
	const setGlobalUsers = useSetRecoilState(_users);
	const setStart = useSetRecoilState(_started);

	const addUser = () => {
		if(userName.length == 0) return;

		const newUsers = JSON.parse(JSON.stringify(users));
		newUsers.push(userName);
		setUserName("");
		setUsers(newUsers);
	}

	const returnUser = (name) => {
		const newUsers = users.filter(v => v != name);
		setUsers(newUsers);
	}

	const PlayerList = () => {
		if (users.length == 0) return <></>

		return (
			<>
				<div className="player-list">
					{users.map(v => {
						return <User id={v} name={v} remove={() => {returnUser(v)}} />
					})}
				</div>
				<button className="start" onClick={() => {
					setStart(true);
					setGlobalUsers(users);
				}}>Start</button>
			</>
		)
	}

	return (
		<div className="view select-user">
			<div className="button-list">
				<h1 className="title">Enter players</h1>
				<div className="enter-name">
					<input placeholder="name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
					<button onClick={addUser}>Add</button>
				</div>
				<PlayerList />
			</div>
		</div>
	);
}

export default SelectUsersView;