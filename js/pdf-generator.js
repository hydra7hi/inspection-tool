document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;

    const inspectionForm = document.getElementById('inspection-form');
    if (inspectionForm) {
        inspectionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const inspectorName = document.getElementById('inspector-name').value;
            const inspectionDate = document.getElementById('inspection-date').value;
            const equipmentId = document.getElementById('equipment-id').value;
            const notes = document.getElementById('notes').value;

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