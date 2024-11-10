// user.js

// Function to handle form submission
document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data
    const formData = new FormData(this);
  
    // Create an object to store form data
    const userData = {
        fullName: formData.get('fullName'),
        gender: formData.get('gender'),
        dob: formData.get('dob'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        photo: formData.get('photo'),
        signature: formData.get('signature'),
        educationDetails: {
            tenth: {
                stream: formData.get('stream10th'),
                board: formData.get('board10th'),
                year: formData.get('passingYear10th'),
                percentage: formData.get('percentage10th'),
                document: formData.get('document10th')
            },
            twelfth: {
                stream: formData.get('stream12th'),
                board: formData.get('board12th'),
                year: formData.get('passingYear12th'),
                percentage: formData.get('percentage12th'),
                document: formData.get('document12th')
            },
            graduation: {
                stream: formData.get('streamGraduation'),
                board: formData.get('boardGraduation'),
                year: formData.get('passingYearGraduation'),
                percentage: formData.get('percentageGraduation'),
                document: formData.get('documentGraduation')
            }
        }
    };
  
    // Save the user data in localStorage (or another storage method)
    localStorage.setItem('userData', JSON.stringify(userData));
  
    // Display success message to the user
    alert('Form Submitted Successfully! Your registration has been successful.');
  
    // Optionally clear the form after submission
    this.reset();
  
    // Reset to the first section
    document.querySelectorAll('.form-section').forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById('section-1').classList.add('active');
  });
  
  // Function to load saved data from localStorage (for review or editing)
  function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Fill the form with saved data (example for some fields)
        document.getElementById('fullName').value = userData.fullName;
        document.getElementById('gender').value = userData.gender;
        document.getElementById('dob').value = userData.dob;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
  
        // Add more fields as needed
    }
  }
  
  // Load user data on page load (if available)
  window.onload = loadUserData;
  