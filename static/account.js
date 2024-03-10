document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();

        var regEmailAdd = document.getElementById("regEmailAdd").value
        var username = document.getElementById("username").value

        fetch('/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: regEmailAdd,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); // Log success message
            // Perform any further actions if needed
            alert("SUCCESS")
        })
        .catch(error => console.error('Error:', error));
    });

    
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
    
        var formData = new FormData(e.target);
    
        for (var pair of formData.entries()) {
            alert(pair[1])
            //console.log(pair[0] + ": " + pair[1]);
        }
    
    })
})

