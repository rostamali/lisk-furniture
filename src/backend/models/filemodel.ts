import { Schema, model, models } from 'mongoose';

const fileSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Must need user name'],
			trim: true,
			lowercase: true,
			unique: true,
		},
	},
	{ timestamps: true },
);

const File = models.File || model('File', fileSchema);
export default File;
