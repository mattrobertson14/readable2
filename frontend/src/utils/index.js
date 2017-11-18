import React from 'react';

export const Form = (props) => {
	let name = props.name
	return (
		<div className="Form">
			{props.dropDownFields.map(d => (
				<div type="dropdown" className={name+d.name+"-dropdown-field"} key={d.name}>
					<span className={name+d.name+"-label"}>
						{d.name}: 
					</span>
					<select id={name+d.name+"-dropdown"}>
						{d.options.map(option => (
							<option key={option.name} value={option.name.toLowerCase()}>
								{option.name}
							</option>
						))}
					</select>
				</div>
			))}
			{props.inputFields.map(i => (
				<div key={i} className={name+i+"-input-field"}>
					<span className={name+i+"-label"}>
						{i}
					</span>
					<div type="input"
							 contentEditable="true"
							 className={name+i+"-input"} 
							 id={name+i}
							 placeholder={"Enter "+i+"..."}
					/>
				</div>
			))}
			<button type="submit" onClick={props.submit}>Add</button>
			<button type="cancel" onClick={props.cancel}>Cancel</button>
		</div>
	)
}