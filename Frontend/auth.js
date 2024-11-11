
document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");

    if (signInForm) {
        signInForm.addEventListener("submit", signInEvent);
    }
    if (signUpForm) {
        signUpForm.addEventListener("submit", signUpEvent);
    }
});

function signInEvent(event) {
    event.preventDefault();
    
    window.location.href = "http://localhost/database_javascript/project1/Frontend/index.html";
}

function signUpEvent(event) {
    event.preventDefault();

    // User data from input fields
    const userData = {
        username: document.querySelector('#username-input-signup').value,
        password: document.querySelector('#password-input-signup').value,
        firstname: document.querySelector('#firstname-input').value,
        lastname: document.querySelector('#lastname-input').value,
        salary: parseFloat(document.querySelector('#salary-input').value),
        age: parseInt(document.querySelector('#age-input').value),
        registerday: document.querySelector('#registerday-input').value,
    };


    alert("Successfully added in database!");


    fetch('http://localhost:5050/insert', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);

        document.getElementById('signInSection').style.display = 'block'; 
        document.getElementById('signUpSection').style.display = 'none'; 
    })
    .catch(error => {
        console.error('Error during sign up:', error);
        alert('An error occurred. Please try again later.');
    });
}