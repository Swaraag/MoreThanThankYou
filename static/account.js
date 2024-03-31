document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        
        e.preventDefault();

        var regEmailAdd = document.getElementById("regEmailAdd").value
        var username = document.getElementById("username").value
        var password = document.getElementById("regPassword").value

        fetch('/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: regEmailAdd,
                password: password,
            })
        })
        .then(response => {
            if (!response.ok) {
                alert("Failed to add user.")
                throw new Error('Failed to add user');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); // Log success message
            // Perform any further actions if needed
            window.location.href = "/index.html"
        })
        .catch(error => console.error('Error:', error));
    });

    
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
    
        var userEmail = document.getElementById("logEmailAdd").value
        var userPW = document.getElementById("logPassword").value
        console.log(userEmail)
        console.log(userPW)
        fetch('/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: userEmail,
                userPW: userPW,
            })
        })
        .then(response => {
            if (!response.ok) {
                alert("Failed to login user. Ensure sure your email and password are correct.")
                throw new Error('Failed to login user');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); // Log success message
            // Perform any further actions if needed
            window.location.href = "/index.html"
        })
        .catch(error => console.error(error));
    });
    
    })


