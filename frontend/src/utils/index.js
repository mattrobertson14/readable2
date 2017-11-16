import React from 'react';

export const Form = (props) => {
	return (
		<div className="Form">
			<button type="submit">Add</button>
			<button type="cancel" onClick={props.cancel}>Cancel</button>
		</div>
	)
}