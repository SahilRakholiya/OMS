const orderModel = require('../models/order');
const PDFDocument = require('pdfkit');

exports.pdf_download = async (req, resp) => {
    try {
        const oid = req.params.orderid;
        // Fetch data from MongoDB using Mongoose
        const data = await orderModel.find({ _id: oid });
        // return resp.send(data)
        // Create a new PDF document
        const doc = new PDFDocument();

        // Set response headers for PDF download
        resp.setHeader('Content-Disposition', 'attachment; filename="Invoice.pdf"');
        resp.setHeader('Content-Type', 'application/pdf');

        // Pipe the PDF document to the response object
        doc.pipe(resp);

        // Generate the PDF content dynamically
        //   doc.fontSize(16).text(`${}Your Order Details `);

        // Example: Loop through the fetched data and add it to the PDF
        let i = 0;
        data.map((data) => {
            doc.text(` `)
            doc.text(`Invoice Number :- ${oid}`);
            doc.text(` `)
            doc.text(` `)
            doc.text(`User Name :- ${data.user_name}`);
            doc.text(`Email :- ${data.email}`);
            doc.text(`Phone Number :- ${data.phone_number}`);
            doc.text(`Order Date :- ${data.date}`);
            doc.text(`Address :- ${data.address} , ${data.city} , ${data.state} , ${data.pincode}`);
            doc.text(` `);
            doc.text(` `);
            doc.text("----------------------------------------------------------------------------------------------------------------");
            doc.text(` `);
            doc.text(` `);

            data.orders.map((item) => {
                i++;
                doc.text(`Order :- ${i}`)
                if (item.medicine_name) {

                    doc.text(`Product Name : ${item.medicine_name}`);
                    doc.text(`Quantity : ${item.quantity}`);
                    doc.text(`Amount: ${item.amount}`);
                    doc.text(`Company: ${item.company}`);
                }
                else {
                    if (item.wellness_product_name) {
                        doc.text(`Product Name : ${item.wellness_product_name}`);
                        doc.text(`Quantity : ${item.quantity}`);
                        doc.text(`Amount: ${item.amount}`);
                        doc.text(`Ctaegory: ${item.wellness_category}`);
                        doc.text(`Company: ${item.company}`);
                    }
                    else {
                        if (item.beauty_product_name) {
                            doc.text(`Product Name : ${item.beauty_product_name}`);
                            doc.text(`Quantity : ${item.quantity}`);
                            doc.text(`Amount: ${item.amount}`);
                            doc.text(`Ctaegory: ${item.beauty_category}`);
                            doc.text(`Company: ${item.company}`);
                        }
                    }
                }
                doc.moveDown();
            })
            doc.text(` `);
            doc.text(` `);
            doc.text("----------------------------------------------------------------------------------------------------------------");
            doc.text(` `);
            doc.text(` `);
            doc.text(`Payment Id : ${data.razorpay_payment_id}`);
            doc.text(`Order Total Amount : ${data.order_total_amount}`);
        });

        // Finalize the PDF document
        doc.end();
        //  resp.sendfile(doc)

    } catch (err) {
        console.error(err);
        resp.status(500).send(err);
    }
}