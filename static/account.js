document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(e.target);

    for (var pair of formData.entries()) {
        alert(pair[1])
        //console.log(pair[0] + ": " + pair[1]);
    }

})

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var formData = new FormData(e.target);

    for (var pair of formData.entries()) {
        alert(pair[1])
        //console.log(pair[0] + ": " + pair[1]);
    }

})