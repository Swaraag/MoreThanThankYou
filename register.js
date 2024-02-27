function submit(){
    if (document.getElementById("login").value == "" || document.getElementById("password").value == ""){
        alert("Please enter the required fields")
    }
    else{
        localStorage.setItem("username", document.getElementById("login").value);
        localStorage.setItem("password", document.getElementById("password").value);
        document.getElementById("login").value = "";
        document.getElementById("password").value = "";
    }
}
