# Task:
As a user, I want to be able to download the generated PDF certificate.

---
# Plan:
- [x] In `/js/pdf-generator.js`, after the PDF has been fully generated in memory, trigger a download.
- [x] Use the `save()` method from the PDF library to prompt the user to save the file.
- [x] Give the downloaded file a descriptive name, such as `Inspection-Certificate-<certificate_no>.pdf`.
- [x] Perform a final review of the generated PDF to ensure all content, styling, and layouts are correct as per the requirements.

---

# Execution:
<intentionally left empty>
