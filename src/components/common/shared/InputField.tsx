import { FieldValues, UseFormRegister } from 'react-hook-form';
interface ShipFormProps {
	register: UseFormRegister<FieldValues>;
	label: string;
	id: string;
	name: string;
	type: string;
	required: boolean;
	disabled: boolean;
}

const InputField: React.FC<ShipFormProps> = ({
	register,
	label,
	id,
	name,
	type,
	required,
	disabled,
}) => {
	return (
		<>
			<div className="input-group mb-3">
				<label htmlFor={id} className="form-label">
					{label}
				</label>
				<input
					className="input-field"
					type={type}
					id={id}
					{...register(name)}
					required={required}
					disabled={disabled}
				/>
			</div>
		</>
	);
};

export default InputField;
