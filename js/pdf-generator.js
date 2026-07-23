document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;
    const SETTINGS_KEY = 'inspection_tool_settings';

    const readSettings = () => {
        try {
            return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
        } catch (error) {
            console.warn('Unable to read PDF settings', error);
            return {};
        }
    };

    const resolveLogoPath = (logoPath) => {
        const value = (logoPath || 'company_logo.svg').trim();
        if (!value) {
            return '../assets/company_logo.svg';
        }
        if (/^https?:\/\//i.test(value) || value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) {
            return value;
        }
        if (value.startsWith('assets/')) {
            return `../${value}`;
        }
        return `../assets/${value}`;
    };

    const loadLogoImage = (logoPath) => {
        return new Promise((resolve) => {
            const resolvedPath = resolveLogoPath(logoPath);
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(null);
            img.src = resolvedPath;
        });
    };

    const inspectionForm = document.getElementById('inspection-form');
    if (inspectionForm) {
        inspectionForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            if (!inspectionForm.checkValidity()) {
                alert('Please fill out all required fields before generating the PDF.');
                return;
            }

            const deficiencies = [];
            const deficiencyRows = document.querySelectorAll('.deficiency-row');
            deficiencyRows.forEach((row, index) => {
                const desc = row.querySelector('input[name="deficiency_desc[]"]').value;
                const action = row.querySelector('input[name="deficiency_action[]"]').value;
                const status = row.querySelector('select[name="deficiency_status[]"]').value;
                if (desc) { // Only add if description is not empty
                    deficiencies.push({
                        id: index + 1,
                        description: desc,
                        action: action,
                        status: status,
                    });
                }
            });

            const attachments = [];
            const attachmentItems = document.querySelectorAll('.attachment-preview-item');
            attachmentItems.forEach(item => {
                const img = item.querySelector('img');
                const caption = item.querySelector('input').value;
                if (img) {
                    attachments.push({
                        src: img.src,
                        caption: caption
                    });
                }
            });

            const checklistItems = Array.from(document.querySelectorAll('#checklist .checklist-group')).flatMap(group => {
                const groupName = group.querySelector('h3')?.textContent.trim() || 'Checklist';
                return Array.from(group.querySelectorAll('.checklist-item')).map(item => ({
                    group: groupName,
                    description: item.querySelector('.checklist-item-desc')?.textContent.trim() || '',
                    status: item.querySelector('input[type="radio"]:checked')?.value || 'na',
                }));
            });

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
                checklist_items: checklistItems,
                // Review & Submit
                tested_load_kg: document.getElementById('tested_load_kg').value,
                final_result: document.getElementById('final_result').value,
                inspector_name: document.getElementById('inspector_name').value,
                notes: document.getElementById('notes').value,
                deficiencies: deficiencies,
                attachments: attachments,
            };

            const settings = readSettings();
            const companyName = settings.company_name || 'Your Company Name';
            const logoDataUrl = await loadLogoImage(settings.company_logo);

            const doc = new jsPDF();
            doc.setFont('helvetica');

            // Add Company Logo and Title
            if (logoDataUrl) {
                doc.addImage(logoDataUrl, 'PNG', 14, 10, 32, 20);
            }
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(companyName, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
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
                doc.text(`This certificate is the property of ${companyName} and must be returned upon request.`, doc.internal.pageSize.getWidth() / 2, footerY, { align: 'center' });
                doc.text("Contact: info@yourcompany.com | +123 456 7890", doc.internal.pageSize.getWidth() / 2, footerY + 5, { align: 'center' });
                doc.text("DOC-CTRL-001 | REV 1.0 | 2024-07-15", doc.internal.pageSize.getWidth() / 2, footerY + 10, { align: 'center' });
            };

            // Page 2: Checklist Header
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
            const groupedChecklist = formData.checklist_items.reduce((acc, item) => {
                if (!acc[item.group]) {
                    acc[item.group] = [];
                }
                acc[item.group].push(item);
                return acc;
            }, {});

            const tableBody = [];
            Object.entries(groupedChecklist).forEach(([group, items]) => {
                tableBody.push([{ content: group, colSpan: 5, styles: { fontStyle: 'bold', fillColor: [230, 230, 230] } }]);
                items.forEach(item => {
                    tableBody.push([
                        item.description,
                        item.status === 'pass' ? 'X' : '',
                        item.status === 'fail' ? 'X' : '',
                        item.status === 'na' ? 'X' : '',
                        ''
                    ]);
                });
            });

            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 10,
                head: [['Description', 'Pass', 'Fail', 'N/A', 'Remark']],
                body: tableBody,
                ...tableStyles,
                didDrawPage: (data) => {
                    footer();
                }
            });

            // Page 3: Deficiencies and Notes
            doc.addPage();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Deficiencies", 20, 20);

            doc.autoTable({
                startY: 30,
                head: [['Item #', 'Deficiency', 'Corrective Action', 'Status']],
                body: formData.deficiencies.map(d => [d.id, d.description, d.action, d.status]),
                ...tableStyles,
            });

            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Notes", 20, doc.autoTable.previous.finalY + 10);

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.notes, 20, doc.autoTable.previous.finalY + 20, { maxWidth: doc.internal.pageSize.getWidth() - 40 });

            footer();

            // Page 4: Attachments
            doc.addPage();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Attachments", 20, 20);

            let y = 30;
            for (const attachment of formData.attachments) {
                const img = new Image();
                img.src = attachment.src;
                const imgWidth = 100;
                const imgHeight = (img.height * imgWidth) / img.width;

                if (y + imgHeight + 20 > doc.internal.pageSize.getHeight()) {
                    doc.addPage();
                    y = 20;
                }

                doc.addImage(img, 'JPEG', 20, y, imgWidth, imgHeight);
                y += imgHeight + 5;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text(attachment.caption, 20, y, { maxWidth: imgWidth });
                y += 15;
            }

            footer();

            footer();

            // Page 5: Summary
            doc.addPage();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text("Summary", 20, 20);

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text("Final Result:", 20, 30);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.final_result, 60, 30);

            doc.setFont('helvetica', 'bold');
            doc.text("Inspector:", 20, 40);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.inspector_name, 60, 40);


            // Load Test Details
            doc.autoTable({
                startY: 50,
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
            doc.text(companyName, stickerX + 40, stickerY + 10, { align: 'center' });

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

            footer();

            doc.save(`Inspection-Certificate-${formData.certificate_no}.pdf`);
        });
    }
});