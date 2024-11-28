function adjustScale() {
    var container = document.getElementById('scaled-container');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var scaleX = windowWidth / 1920;
    var scaleY = windowHeight / 1080;

    var scale = Math.min(scaleX, scaleY);

    container.style.transform = 'scale(' + scale + ')';

    // Set CSS variables for scaling other elements
    document.documentElement.style.setProperty('--scale-factor', scale);
}

// Adjust the scale when the page loads
window.onload = adjustScale;

// Adjust the scale when the window is resized
window.onresize = adjustScale;

let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('header-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

    document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    let isSidebarOpen = false;

    function toggleSidebar() {
        if (isSidebarOpen) {
        sidebar.classList.remove('sidebar-active');
    isSidebarOpen = false;
        } else {
        sidebar.classList.add('sidebar-active');
    isSidebarOpen = true;
        }
    }

    function closeSidebarOnClickOutside(event) {
        if (isSidebarOpen && !sidebar.contains(event.target) && !navbarToggler.contains(event.target)) {
        sidebar.classList.remove('sidebar-active');
    isSidebarOpen = false;
        }
    }

    // Open/close sidebar on hamburger icon click
    navbarToggler.addEventListener('click', toggleSidebar);

    // Close sidebar if clicking outside of it
    document.addEventListener('click', closeSidebarOnClickOutside);

    // Close sidebar if pressing the "Escape" key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isSidebarOpen) {
        sidebar.classList.remove('sidebar-active');
    isSidebarOpen = false;
        }
    });
});

