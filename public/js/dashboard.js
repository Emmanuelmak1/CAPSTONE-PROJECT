
// Function to handle logout
function logout() {
    // Send a GET request to the logout route
    fetch('/logout', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
    })
    .then(response => {
        // Redirect to the homepage after logout
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Logout failed:', error);
    });
}

// Add an event listener to the logout button
document.addEventListener('DOMContentLoaded', function() {
    const logoutForm = document.getElementById('logout-form');
    logoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        logout(); // Call the logout function
    });
});
