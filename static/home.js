
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

                    const li = document.createElement('li');
                    li.textContent = user.username;
                    userList.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    });
});