# Task:
As a user, I want the application to prevent me from generating a PDF if required fields are empty.

---
# Plan:
- [x] In the HTML, add the `required` attribute to all mandatory form fields.
- [x] In `/js/pdf-generator.js`, before collecting the data, check if the form is valid.
- [x] If the form is invalid, display an alert or a message to the user and stop the PDF generation.
- [ ] Consider adding logic to auto-generate certificate/job numbers on the "Tracking" tab to reduce manual entry.

---

# Execution:
<intentionally left empty>
