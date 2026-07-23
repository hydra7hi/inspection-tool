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

            // The data collection logic will be updated in later stories
            const inspectorName = document.getElementById('inspector-name')?.value || 'N/A';
            const inspectionDate = document.getElementById('inspection-date')?.value || 'N/A';
            const equipmentId = document.getElementById('equipment-id')?.value || 'N/A';
            const notes = document.getElementById('notes')?.value || 'N/A';

            const doc = new jsPDF();

            doc.text("Inspection Certificate", 20, 20);
            doc.text(`Inspector Name: ${inspectorName}`, 20, 30);
            doc.text(`Inspection Date: ${inspectionDate}`, 20, 40);
            doc.text(`Equipment ID: ${equipmentId}`, 20, 50);
            doc.text(`Notes: ${notes}`, 20, 60);

            doc.save('inspection-certificate.pdf');
        });
    }
});