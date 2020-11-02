import React from 'react';

import Dice from './../comp/Dice.js';

function DieceView(props) {
	return (
		<div className="view dices">
			<Dice />
		</div>
	);
}

export default DieceView;