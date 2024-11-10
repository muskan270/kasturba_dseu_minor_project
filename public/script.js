fetch("http://localhost:3000/submit_form", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    full_name: fullName,
    email: email,
    contact: contact,
    dob: dob,
    education: education,
    branch: branch,
    marks: marks,
    subject: subject,
    experience: experience,
    phd: phd,
  }),
})
  .then((response) => response.text())
  .then((data) => (document.getElementById("formFeedback").innerText = data))
  .catch((error) => console.error("Error:", error));
function showPreview(input, previewId) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewElement = document.getElementById(previewId);
      const img = previewElement.querySelector("img");
      img.src = e.target.result;
      img.style.display = "block"; // Show the image once it's loaded
    };
    reader.readAsDataURL(file); // Read the image file as a data URL
  }
}

function showResumePreview(input) {
  const file = input.files[0];
  const fileName = file ? file.name : "";
  document.getElementById("resume-file-name").innerText = fileName;
}
function generateOTP() {
  // Generates a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000);
}

function showDetails() {
  document.getElementById("details-modal").style.display = "block";
}

function closeDetails() {
  document.getElementById("details-modal").style.display = "none";
}

// Close the modal when clicking outside of the modal
window.onclick = function(event) {
  const modal = document.getElementById("details-modal");
  if (event.target === modal) {
      modal.style.display = "none";
  }
}
