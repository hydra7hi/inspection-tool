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

            // Add Company Name and Title
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text("Your Company Name", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            doc.setFontSize(16);
            doc.setFont('helvetica', 'normal');
            doc.text("INSPECTION CERTIFICATE", doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            // Client Information Table
            doc.autoTable({
                startY: 40,
                head: [['Client Information', '', '', '']],
                body: [
                    ['Client Name', formData.client_name, 'Contact Person', formData.contact_person],
                    ['Location', formData.location, 'Contact Phone', formData.contact_phone],
                ],
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] },
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
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] },
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
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] },
            });

            doc.save('inspection-certificate.pdf');
        });
    }
});