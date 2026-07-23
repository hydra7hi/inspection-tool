### Required Certificate Sections
*   **Client Information:** Details about the contracting establishment and location.
*   **Certificate Metadata:** Dates, certificate numbers, and job order tracking.
*   **Equipment Description:** Technical specifications and identification of the machine.
*   **Inspection Details & Checklist:** Testing procedures, safety checks, and functional tests.
*   **Final Assessment:** Load test results, final status (Pass/Fail), and authorized signatures.

### Variable Data (Requires Input Forms)
*   `client_name`, `contact_person`, `contact_phone`, `location`
*   `inspection_date`, `issue_date`, `next_inspection_date`
*   `certificate_no`, `job_order_no`, `sticker_no`, `dws_no`
*   `equipment_serial_no`, `equipment_id_no`, `manufacturing_date`
*   `checklist_responses` (Pass/Fail/NA for each item), `tested_load_kg`
*   `inspector_name`

### Fixed Data (Requires Dropdowns/Pre-fills)
*   `equipment_name` (e.g., FORKLIFT TRUCK)
*   `capacity`, `manufacturer`, `model` (e.g., 7 TONS, HELI, CPCD70)
*   `inspection_reference` (e.g., ANSI/ITSDF B56.1-2020)
*   `inspection_tools` (e.g., Digital calliper, Pressure Gauge)
*   `inspection_type` (e.g., Visual, Function & load Test)
*   `approver_name` (e.g., Fadi Alahmad)

### Recommended Website Structure (Tabs)
1.  **Client Tab:** Text inputs for client details and contact information.
2.  **Tracking Tab:** Date pickers for inspection dates and auto-generating fields for certificate/job numbers.
3.  **Equipment Tab:** Dropdowns for fixed data (Manufacturer, Model, Capacity) and text inputs for Serial/ID numbers.
4.  **Checklist Tab:** Categorized radio buttons (Pass/Fail/NA) for Visual, Hydraulic, Power, and Functional systems.
5.  **Review & Submit Tab:** Inputs for load test numbers, final result dropdown (Accepted/Rejected), and inspector selection.

### Workflow Steps
1. The inspector logs in (once that authentication fix is sorted out!) and clicks "New Certificate".
2. They simply go through the tabs sequentially to fill in the client, equipment, and checklist data.
3. After reviewing, they hit "Generate" to create the PDF and get redirected (after the routing issue is patched) to download it.

Create a code template for a 5-page PDF inspection certificate with the following visual layout and styling:

- **Global Style & Colors:** Use a clean, professional sans-serif font. The primary accent color is navy blue for main document headers and section dividers, with standard black text on a solid white background[cite: 1]. Use thin, solid borders for all tables and grids[cite: 1]. Align labels to the left and keep the padding tight.
- **Page 1 (Main Certificate):** Start with the company name and a centered title[cite: 1]. Use a 4-column grid structure (Label | Value | Label | Value) for the Client Information and tracking metadata[cite: 1]. Use the exact same 4-column grid for the "Equipment Description" section[cite: 1]. Below that, create a 2-column Q&A table for the Inspection Details, with the question on the left and the YES/NO answer on the right[cite: 1]. Add a signature block at the bottom for the Inspector and Approver, followed by a footer with a disclaimer, contact info, and document control numbers[cite: 1].
- **Page 2 (Attachments):** Add a simple header reading "Attached picture:" and provide a large, centered image placeholder covering most of the page[cite: 1]. Maintain the same footer as Page 1[cite: 1].
- **Pages 3 to 5 (Checklist):** Start with a compact 4-column summary grid at the top for client and equipment reference[cite: 1]. The main body is a full-width, 5-column table with headers: "Description", "Pass", "Fail", "N/A", and "Remark"[cite: 1]. The checkbox columns (Pass/Fail/N/A) must use standard square checkboxes (☑/☐)[cite: 1]. Group related rows using sub-headers (e.g., "Safety & Site Preparation", "Visual Structural Inspection") that span the entire width of the table with a light background or bold text[cite: 1]. 
- **Page 5 Bottom (Sign-off & Sticker):** Below the checklist, add a small 4-column table for "Load Test Details" (Load Centre, Lift Height, Rated Load, Tested Load)[cite: 1]. End the page with an inspector signature block and a generated "Sticker" design[cite: 1]. The sticker should be a compact square layout containing a QR code placeholder, company header, equipment serial numbers, and validity dates[cite: 1].

### Visual PDF Breakdown:
## Global Style & Colors
*   **Typography & Colors:** Clean sans-serif font, black text on a solid white background[cite: 1].
*   **Accents:** Navy blue for main document headers and section dividers[cite: 1].
*   **Tables & Alignment:** Thin, solid borders for all grids[cite: 1]. Labels aligned to the left with tight padding[cite: 1].

## Page 1 (Main Certificate)
*   **Layout:** Company name and centered title at the top[cite: 1].
*   **Data Grids:** 4-column grid (Label | Value | Label | Value) for Client Info, Metadata, and Equipment Description[cite: 1].
*   **Inspection Details:** 2-column Q&A table (Question on left, YES/NO on right)[cite: 1].
*   **Footer:** Signature block, disclaimer, contact info, and document control numbers[cite: 1].

## Page 2 (Attachments)
*   **Image Section:** Header reading "Attached picture:" with a large, centered image placeholder[cite: 1].
*   **Footer:** Matches Page 1 footer with disclaimer and doc numbers[cite: 1].

## Pages 3 to 5 (Checklist)
*   **Header:** Compact 4-column summary grid for client and equipment reference[cite: 1].
*   **Table Structure:** Full-width, 5-column table (Description, Pass, Fail, N/A, Remark)[cite: 1].
*   **Checkboxes:** Standard square checkboxes (☑/☐) for Pass/Fail/N/A columns[cite: 1].
*   **Grouping:** Sub-headers spanning full width with a light background or bold text[cite: 1].

## Page 5 Bottom (Sign-off & Sticker)
*   **Load Test:** Small 4-column table for Load Test Details[cite: 1].
*   **Signatures:** Inspector signature block[cite: 1].
*   **Sticker Design:** Compact square layout with a QR code, company header, serial numbers, and validity dates[cite: 1].