document.addEventListener('DOMContentLoaded', function () {
    const accountName = document.getElementById("name");

    // Fetch account name from server
    fetch('/checkSession')
        .then(response => response.json())
        .then(data => {
            accountName.textContent = data.message;
        })
        .catch(error => console.error('Error:', error));


    document.getElementById("left").addEventListener("click", function() {
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var prevSlide = currentSlide.previousElementSibling || document.querySelector('input[name="slider"]:last-of-type');
        currentSlide.checked = false;
        prevSlide.checked = true;
    });

    document.getElementById("right").addEventListener("click", function() {
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var nextSlide = currentSlide.nextElementSibling || document.querySelector('input[name="slider"]:first-of-type');

        if (currentSlide.id === "slide3") {
            document.getElementById("slide1").checked = true;
        } else {
            currentSlide.checked = false;
            nextSlide.checked = true;
        }
    });

    function nextSlide() {
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var nextSlide = currentSlide.nextElementSibling || document.querySelector('input[name="slider"]:first-of-type');

        if (currentSlide.id === "slide3") {
            document.getElementById("slide1").checked = true;
        } else {
            currentSlide.checked = false;
            nextSlide.checked = true;
        }
    }

    setInterval(nextSlide, 5000);
});

  