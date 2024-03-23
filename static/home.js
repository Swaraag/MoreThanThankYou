
document.addEventListener('DOMContentLoaded', function () {

    const userButton = document.getElementById('userButton');
    const userList = document.getElementById('userList');

    userButton.addEventListener('click', function () {
        fetch('/getUsers')
            .then(response => response.json())
            .then(data => {
                // Clear existing user list
                userList.innerHTML = '';
      
                // Populate user list
                data.forEach(user => {

                    const email = document.createElement('li');
                    email.textContent = "email: " + user.email;
                    userList.appendChild(email);

                    const username = document.createElement('li');
                    username.textContent = "username: " + user.username;
                    userList.appendChild(username);

                    const empty = document.createElement('li');
                    userList.appendChild(empty)

                    
                });
            })
            .catch(error => console.error('Error:', error));
    });
});