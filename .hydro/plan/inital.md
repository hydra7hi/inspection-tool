# Task:
As a use, I want to have a simplistic website to generate PDF reports.

The website will use html js, and css.

The website will consist of the Following:
- A Landing page with some minimal Advertisement marketing about the website. With short description on how it works. 
- Login page with a mocked login feature. (Not Implemented yet). With a Button Continue as a guesat.
- SideBar with miltiple tabs. All empty pages for now:
  - Users.
  - Inspection Certificates.
  - Settings.
  - About.
- In the next steps we will support PDF generation from a prefilled inspection Document. A report uses a predefined template.

The stories are minimal. with very basic features, just to have a proof of concept.

Dir structure that will be easy to implement sequentially.
More effort / time for the PDF Generation, more on that soon.

---
# Plan:
- [x] **Phase 1: Foundational HTML & CSS Structure**
  - [x] **`/index.html`**: Create the public-facing landing page.
    - [x] Story: As a new visitor, I want to see a simple page explaining the tool with a "Continue as a guest" button.
  - [x] **`/app/dashboard.html`**: Create the main application page.
    - [x] Story: As a user, after clicking "Continue as a guest", I want to be taken to a dashboard page.
  - [x] **`/css/style.css`**: Create a single stylesheet for basic styling.
    - [x] Story: As a user, I want a clean and consistent layout across the landing page and the dashboard.
  - [x] **Sidebar (in `app/dashboard.html`)**: Implement the navigation within the main app page.
    - [x] Story: As a user, I want to see a sidebar on the dashboard with links for "Users", "Inspection Certificates", "Settings", and "About".

- [x] **Phase 2: PDF Generation with JavaScript**
  - [x] **`/app/inspection.html`**: Create the form page for certificate data entry.
    - [x] Story: As a user, I want a dedicated page with a form to enter inspection details.
  - [x] **`/js/pdf-generator.js`**: Implement the core PDF creation logic.
    - [x] Story: As a developer, I need to integrate a JavaScript library (like `jsPDF`) to handle PDF creation.
    - [x] Story: As a user, I want to click a "Generate PDF" button on the inspection form page.
    - [x] Story: As a user, when I click the generate button, I want the system to create and download a PDF based on the data I entered.

---

# Execution: