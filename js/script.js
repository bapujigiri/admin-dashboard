// Update date and time
function updateDateTime() {
    const now = new Date();

    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = dateString;

    // Format time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('current-time').textContent = timeString;
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Admin Login Modal
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLoginModal = document.getElementById('adminLoginModal');
const closeModal = document.getElementById('closeModal');
const adminLoginForm = document.getElementById('adminLoginForm');

// Open modal when admin login button is clicked
adminLoginBtn.addEventListener('click', () => {
    adminLoginModal.style.display = 'flex';
});

// Close modal when X is clicked
closeModal.addEventListener('click', () => {
    adminLoginModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === adminLoginModal) {
        adminLoginModal.style.display = 'none';
    }
});

// Handle form submission
// adminLoginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Simple validation (in a real app, this would be a server-side check)
//     if (username && password) {
//         alert(`Admin login successful! Welcome, ${username}. Redirecting to admin panel...`);
//         adminLoginModal.style.display = 'none';
//         adminLoginForm.reset();

//         // In a real application, you would redirect to admin panel
//         // window.location.href = '/admin-panel';
//     } else {
//         alert('Please enter both username and password.');
//     }
// });

// Replace the form submission handler in the existing script
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username && password) {
        // Store admin credentials (in a real app, this would be server-side validation)
        localStorage.setItem('adminUsername', username);
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminRole', 'Administrator');

        // Show success message
        alert(`Login successful! Welcome, ${username}. Redirecting to admin panel...`);
        adminLoginModal.style.display = 'none';
        adminLoginForm.reset();

        // Redirect to dashboard.html
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        alert('Please enter both username and password.');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight current day in weather forecast
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date().getDay();
const forecastDays = document.querySelectorAll('.forecast-day');

if (forecastDays.length > 0) {
    // Remove any existing highlight
    forecastDays.forEach(day => {
        day.classList.remove('today');
    });

    // Highlight today
    if (forecastDays[today]) {
        forecastDays[today].classList.add('today');
        forecastDays[today].style.backgroundColor = 'rgba(198, 40, 40, 0.1)';
        forecastDays[today].style.padding = '5px';
        forecastDays[today].style.borderRadius = '4px';
    }
}