document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;

    const tabButtons = document.querySelectorAll('.tab-nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    const inspectionForm = document.getElementById('inspection-form');
    if (inspectionForm) {
        inspectionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!inspectionForm.checkValidity()) {
                alert('Please fill out all required fields before generating the PDF.');
                return;
            }

            const formData = {
                // Client Info
                client_name: document.getElementById('client_name').value,
                contact_person: document.getElementById('contact_person').value,
                contact_phone: document.getElementById('contact_phone').value,
                location: document.getElementById('location').value,
                // Tracking Info
                inspection_date: document.getElementById('inspection_date').value,
                issue_date: document.getElementById('issue_date').value,
                next_inspection_date: document.getElementById('next_inspection_date').value,
                certificate_no: document.getElementById('certificate_no').value,
                job_order_no: document.getElementById('job_order_no').value,
                sticker_no: document.getElementById('sticker_no').value,
                dws_no: document.getElementById('dws_no').value,
                // Equipment Info
                equipment_name: document.getElementById('equipment_name').value,
                capacity: document.getElementById('capacity').value,
                manufacturer: document.getElementById('manufacturer').value,
                model: document.getElementById('model').value,
                equipment_serial_no: document.getElementById('equipment_serial_no').value,
                equipment_id_no: document.getElementById('equipment_id_no').value,
                manufacturing_date: document.getElementById('manufacturing_date').value,
                // Checklist
                chassis_check: document.querySelector('input[name="chassis_check"]:checked')?.value,
                tire_check: document.querySelector('input[name="tire_check"]:checked')?.value,
                brake_test: document.querySelector('input[name="brake_test"]:checked')?.value,
                alarm_test: document.querySelector('input[name="alarm_test"]:checked')?.value,
                // Review & Submit
                tested_load_kg: document.getElementById('tested_load_kg').value,
                final_result: document.getElementById('final_result').value,
                inspector_name: document.getElementById('inspector_name').value,
            };

            const doc = new jsPDF();
            doc.setFont('helvetica');

            // Add Company Name and Title
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text("Your Company Name", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.setFontSize(16);
            doc.setFont('helvetica', 'normal');
            doc.text("INSPECTION CERTIFICATE", doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            const tableStyles = {
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 128] },
            };

            // Client Information Table
            doc.autoTable({
                startY: 40,
                head: [['Client Information', '', '', '']],
                body: [
                    ['Client Name', formData.client_name, 'Contact Person', formData.contact_person],
                    ['Location', formData.location, 'Contact Phone', formData.contact_phone],
                ],
                ...tableStyles,
                didDrawPage: function (data) {
                    data.settings.margin.top = 10;
                }
            });

            // Certificate Metadata Table
            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Certificate Metadata', '', '', '']],
                body: [
                    ['Inspection Date', formData.inspection_date, 'Certificate No.', formData.certificate_no],
                    ['Issue Date', formData.issue_date, 'Job Order No.', formData.job_order_no],
                    ['Next Inspection Date', formData.next_inspection_date, 'Sticker No.', formData.sticker_no],
                ],
                ...tableStyles,
            });

            // Equipment Description Table
            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Equipment Description', '', '', '']],
                body: [
                    ['Equipment Name', formData.equipment_name, 'Serial No.', formData.equipment_serial_no],
                    ['Manufacturer', formData.manufacturer, 'ID No.', formData.equipment_id_no],
                    ['Model', formData.model, 'Capacity', formData.capacity],
                    ['Manufacturing Date', formData.manufacturing_date, '', ''],
                ],
                ...tableStyles,
            });

            // Inspection Details Table
            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Inspection Details', '']],
                body: [
                    ['Inspection Reference', 'ANSI/ITSDF B56.1-2020'],
                    ['Inspection Tools', 'Digital calliper, Pressure Gauge'],
                    ['Inspection Type', 'Visual, Function & load Test'],
                ],
                ...tableStyles,
            });

            // Signature Block
            const pageHeight = doc.internal.pageSize.getHeight();
            const signatureY = pageHeight - 70; 
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text("Inspector", 40, signatureY);
            doc.text("Approver", doc.internal.pageSize.getWidth() - 80, signatureY);
            doc.line(20, signatureY - 5, 80, signatureY - 5); 
            doc.line(doc.internal.pageSize.getWidth() - 100, signatureY - 5, doc.internal.pageSize.getWidth() - 40, signatureY - 5);
            doc.setFont('helvetica', 'normal');
            doc.text("Fadi Alahmad", doc.internal.pageSize.getWidth() - 80, signatureY + 5);


            // Footer
            const footer = () => {
                const pageHeight = doc.internal.pageSize.getHeight();
                const footerY = pageHeight - 20;
                doc.setFontSize(8);
                doc.text("This certificate is the property of Your Company Name and must be returned upon request.", doc.internal.pageSize.getWidth() / 2, footerY, { align: 'center' });
                doc.text("Contact: info@yourcompany.com | +123 456 7890", doc.internal.pageSize.getWidth() / 2, footerY + 5, { align: 'center' });
                doc.text("DOC-CTRL-001 | REV 1.0 | 2024-07-15", doc.internal.pageSize.getWidth() / 2, footerY + 10, { align: 'center' });
            };

            footer();

            // Page 2: Attachments
            doc.addPage();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Attached picture:", 20, 20);

            const rectX = 20;
            const rectY = 30;
            const rectWidth = doc.internal.pageSize.getWidth() - 40;
            const rectHeight = 200;
            doc.rect(rectX, rectY, rectWidth, rectHeight);
            doc.setFontSize(20);
            doc.setTextColor(150);
            doc.text("Image placeholder", doc.internal.pageSize.getWidth() / 2, rectY + rectHeight / 2, { align: 'center' });
            doc.setTextColor(0);

            footer();

            // Page 3: Checklist Header
            doc.addPage();
            doc.autoTable({
                startY: 20,
                body: [
                    ['Client Name', formData.client_name, 'Equipment Name', formData.equipment_name],
                    ['Certificate No.', formData.certificate_no, 'Inspection Date', formData.inspection_date],
                ],
                ...tableStyles,
            });

            // Checklist Table
            const checklistData = {
                'Safety & Site Preparation': [
                    { description: 'Chassis and Body', pass: true, fail: false, na: false, remark: 'No visible damage' },
                    { description: 'Tires and Wheels', pass: true, fail: false, na: false, remark: 'Properly inflated' },
                ],
                'Visual Structural Inspection': [
                    { description: 'Brake System', pass: false, fail: true, na: false, remark: 'Needs repair' },
                    { description: 'Alarms and Horns', pass: true, fail: false, na: false, remark: 'Functional' },
                    { description: 'Lights', pass: true, fail: false, na: false, remark: 'All working' },
                ],
                'Functional & Operational Test': [
                    { description: 'Engine/Motor', pass: true, fail: false, na: false, remark: 'No leaks' },
                    { description: 'Hydraulic System', pass: true, fail: false, na: false, remark: 'No leaks' },
                    { description: 'Steering', pass: true, fail: false, na: false, remark: 'Smooth operation' },
                ]
            };

            const tableBody = [];
            for (const group in checklistData) {
                tableBody.push([{ content: group, colSpan: 5, styles: { fontStyle: 'bold', fillColor: [230, 230, 230] } }]);
                checklistData[group].forEach(item => {
                    tableBody.push([
                        item.description,
                        item.pass ? '☑' : '☐',
                        item.fail ? '☑' : '☐',
                        item.na ? '☑' : '☐',
                        item.remark
                    ]);
                });
            }

            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Description', 'Pass', 'Fail', 'N/A', 'Remark']],
                body: tableBody,
                ...tableStyles,
                didDrawPage: (data) => {
                    footer();
                }
            });

            // Load Test Details
            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Load Test Details', '', '', '']],
                body: [
                    ['Load Centre', '500 mm', 'Rated Load', '5000 kg'],
                    ['Lift Height', '3000 mm', 'Tested Load', formData.tested_load_kg + ' kg'],
                ],
                ...tableStyles,
            });

            // Inspector Signature
            const finalSignatureY = doc.autoTable.previous.finalY + 20;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text("Inspector", 40, finalSignatureY);
            doc.line(20, finalSignatureY - 5, 80, finalSignatureY - 5);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.inspector_name, 40, finalSignatureY + 5);

            // Sticker
            const stickerX = doc.internal.pageSize.getWidth() - 100;
            const stickerY = doc.autoTable.previous.finalY + 10;
            doc.rect(stickerX, stickerY, 80, 50);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text("Your Company Name", stickerX + 40, stickerY + 10, { align: 'center' });
            
            // QR Code Placeholder
            const qrCodeX = stickerX + 5;
            const qrCodeY = stickerY + 15;
            const qrCodeSize = 30;
            doc.rect(qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text("QR Code", qrCodeX + qrCodeSize / 2, qrCodeY + qrCodeSize / 2, { align: 'center' });
            doc.setTextColor(0);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.text(`Serial No: ${formData.equipment_serial_no}`, qrCodeX + qrCodeSize + 5, qrCodeY + 10);
            doc.text(`ID No: ${formData.equipment_id_no}`, qrCodeX + qrCodeSize + 5, qrCodeY + 15);
            doc.text(`Valid Until: ${formData.next_inspection_date}`, qrCodeX + qrCodeSize + 5, qrCodeY + 20);

            doc.save(`Inspection-Certificate-${formData.certificate_no}.pdf`);
        });
    }
});