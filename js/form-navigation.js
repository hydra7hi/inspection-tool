document.addEventListener('DOMContentLoaded', function () {
    const tabNavButtons = document.querySelectorAll('.tab-nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const form = document.getElementById('inspection-form');

    // Tab switching logic
    tabNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    function switchTab(targetTab) {
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(targetTab).classList.add('active');

        tabNavButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.tab-nav-btn[data-tab="${targetTab}"]`).classList.add('active');
    }

    // Navigation button logic
    form.addEventListener('click', function(e) {
        if (e.target.classList.contains('next-btn')) {
            handleNext(e.target);
        }
        if (e.target.classList.contains('back-btn')) {
            handleBack(e.target);
        }
    });

    function handleNext(nextButton) {
        const currentTab = nextButton.closest('.tab-content');
        if (validateTab(currentTab)) {
            const nextTabId = getNextTabId(currentTab.id);
            if (nextTabId) {
                switchTab(nextTabId);
            }
        }
    }

    function handleBack(backButton) {
        const currentTab = backButton.closest('.tab-content');
        const prevTabId = getPrevTabId(currentTab.id);
        if (prevTabId) {
            switchTab(prevTabId);
        }
    }

    function getNextTabId(currentTabId) {
        const currentNavButton = document.querySelector(`.tab-nav-btn[data-tab="${currentTabId}"]`);
        const nextNavButton = currentNavButton.nextElementSibling;
        return nextNavButton ? nextNavButton.getAttribute('data-tab') : null;
    }

    function getPrevTabId(currentTabId) {
        const currentNavButton = document.querySelector(`.tab-nav-btn[data-tab="${currentTabId}"]`);
        const prevNavButton = currentNavButton.previousElementSibling;
        return prevNavButton ? prevNavButton.getAttribute('data-tab') : null;
    }

    function validateTab(tab) {
        const inputs = tab.querySelectorAll('input[required], select[required], textarea[required]');
        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }
});