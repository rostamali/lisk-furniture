import Swal from 'sweetalert2';

export const handleDeleteConfirm = (title: string, text: string) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, Delete it!',
		buttonsStyling: false,

		customClass: {
			htmlContainer: 'font-Averta text-dark-200',
			title: 'font-Averta',
			confirmButton: 'popup-confirm-btn confirm__btn',
			cancelButton: 'popup-cancel-btn cancel__btn',
		},
	});
};
export const handleUpdateConfirm = (title: string, text: string) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: 'success',
		showCancelButton: true,
		confirmButtonText: 'Yes, Update it!',
		buttonsStyling: false,

		customClass: {
			htmlContainer: 'font-Averta text-dark-200',
			title: 'font-Averta',
			confirmButton: 'popup-confirm-btn confirm__btn',
			cancelButton: 'popup-cancel-btn cancel__btn',
		},
	});
};
