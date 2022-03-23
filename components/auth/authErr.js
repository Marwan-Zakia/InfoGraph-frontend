/** @format */
import React from 'react'

/**
 * 
 * @param {takes the errors if found } formErrors 
 * @returns 
 * @description a component that renders form errors errors i used it to check
 *  the lenght of the password and the format of email
 */



export const FormErrors = ({ formErrors }) => (
	<div className="formErrors">
		{Object.keys(formErrors).map((fieldName, i) => {
			if (formErrors[fieldName].length > 0) {
				return (
					<div key={i} status="error" className='error' >
						{fieldName} {formErrors[fieldName]}
					</div>
				);
			} else {
				return "";
			}
		})}
	</div>
);
