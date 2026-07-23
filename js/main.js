document.addEventListener('DOMContentLoaded', function() {
    const dashboardContainer = document.querySelector('.dashboard-container');

    if (!dashboardContainer) {
        return;
    }

    if (!dashboardContainer.querySelector('.sidebar')) {
        const sidebarMarkup = `
            <div class="sidebar">
                <div class="sidebar-header">
                    <img src="../assets/app_logo.svg" alt="Hydro Inspection Tool Logo" class="sidebar-logo">
                    <h2>Hydro <br> Inspection Platform</h2>
                </div>
                <ul class="sidebar-menu">
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="users.html">Users</a></li>
                    <li><a href="inspection.html">Inspection Certificates</a></li>
                    <li><a href="settings.html">Settings</a></li>
                    <li><a href="about.html">About</a></li>
                </ul>
                <div class="sidebar-footer">
                    <div class="sidebar-info">
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p class="privacy-notice">Your data is safe. This application runs entirely on your local machine.</p>
                    </div>
                    <p>&copy; 2024 Hydra 7H!</p>
                </div>
            </div>`;

        dashboardContainer.insertAdjacentHTML('afterbegin', sidebarMarkup);
    }

    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});