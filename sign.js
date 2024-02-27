function submit() {
    if (document.getElementById("login").value == "" || document.getElementById("password").value == "" || document.getElementById("email").value == ""){
        alert("Please enter the required fields");
    }
    else{
        validateForm();
    }
}

function validateForm() {
    var email = document.getElementById("email").value;
    if (isValidEmail(email)) {
        localStorage.setItem("email", email);
        localStorage.setItem("username", document.getElementById("login").value);
        localStorage.setItem("password", document.getElementById("password").value);
        document.getElementById("login").value = "";
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
    } else {
        alert("Invalid email address!")
    }
}

function isValidEmail(email) {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
}