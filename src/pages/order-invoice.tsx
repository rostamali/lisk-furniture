import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';

const OrderInvoice = () => {
	const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);

	const createInvoice = async () => {
		const pdfDoc = await PDFDocument.load('/invoice.pdf');

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];

		const { width, height } = firstPage.getSize();

		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const title = 'Invoice';
		const customerName = invoiceData.customerName;
		const items = invoiceData.items;

		const table = items.map(({ name, price, quantity }: any) => {
			const total = price * quantity;
			return [
				name,
				price.toString(),
				quantity.toString(),
				total.toString(),
			];
		});

		const tableHeight = table.length * 20 + 40;
		const tableY = height - 100 - tableHeight;

		firstPage.drawText(title, { x: 50, y: height - 50, size: 24, font });
		firstPage.drawText(customerName, {
			x: 50,
			y: height - 80,
			size: 16,
			font,
		});

		const tableX = 50;
		firstPage.drawRectangle({
			x: tableX - 5,
			y: tableY - 5,
			width: 500,
			height: tableHeight + 15,
			borderWidth: 2,
			borderColor: rgb(0, 0, 0),
		});

		firstPage.drawLine({
			start: { x: tableX + 100, y: tableY - 5 },
			end: { x: tableX + 100, y: tableY + tableHeight + 10 },
			thickness: 2,
			color: rgb(0, 0, 0),
		});
		firstPage.drawLine({
			start: { x: tableX + 200, y: tableY - 5 },
			end: { x: tableX + 200, y: tableY + tableHeight + 10 },
			thickness: 2,
			color: rgb(0, 0, 0),
		});
		firstPage.drawLine({
			start: { x: tableX + 300, y: tableY - 5 },
			end: { x: tableX + 300, y: tableY + tableHeight + 10 },
			thickness: 2,
			color: rgb(0, 0, 0),
		});

		firstPage.drawText('Item', {
			x: tableX + 10,
			y: tableY + tableHeight - 20,
			size: 12,
			font,
		});
		firstPage.drawText('Price', {
			x: tableX + 110,
			y: tableY + tableHeight - 20,
			size: 12,
			font,
		});
		firstPage.drawText('Quantity', {
			x: tableX + 210,
			y: tableY + tableHeight - 20,
			size: 12,
			font,
		});
		firstPage.drawText('Total', {
			x: tableX + 310,
			y: tableY + tableHeight - 20,
			size: 12,
			font,
		});
		for (let i = 0; i < table.length; i++) {
			const row = table[i];
			const y = tableY + tableHeight - 40 - i * 20;

			firstPage.drawText(row[0], { x: tableX + 10, y, size: 12, font });
			firstPage.drawText(row[1], { x: tableX + 110, y, size: 12, font });
			firstPage.drawText(row[2], { x: tableX + 210, y, size: 12, font });
			firstPage.drawText(row[3], { x: tableX + 310, y, size: 12, font });
		}

		const pdfBytes = await pdfDoc.save();

		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'invoice.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		setPdfDoc(pdfDoc);
	};

	console.log(pdfDoc);

	return (
		<div>
			<h1>Invoice</h1>
			<button onClick={createInvoice}>Generate Invoice</button>
		</div>
	);
};

const invoiceData = {
	customerName: 'Rose moni',
	items: [
		{
			name: 'product 1',
			price: 1232,
			quantity: 2,
		},
		{
			name: 'product 2',
			price: 1232,
			quantity: 2,
		},
		{
			name: 'product 3',
			price: 1232,
			quantity: 2,
		},
		{
			name: 'product 3',
			price: 1232,
			quantity: 2,
		},
	],
};

export default OrderInvoice;
