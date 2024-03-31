
document.addEventListener('DOMContentLoaded', function () {

    const accountName = document.getElementById("name");
    
    fetch('/checkSession')
            .then(response => response.json())
            .then(data => {
                // Clear existing user list
                console.log(data)

                accountName.textContent = data.message

            })
            .catch(error => console.error('Error:', error));
    
    var intervalEnabled = true;

    document.getElementById("left").addEventListener("click", function() {
        intervalEnabled = false;
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var prevSlide = currentSlide.previousElementSibling || document.querySelector('input[name="slider"]:last-of-type');
        currentSlide.checked = false;
        prevSlide.checked = true;
        setTimeout(function() {
            intervalEnabled = false;
        }, 5000);
    });
    
    document.getElementById("right").addEventListener("click", function() {
        intervalEnabled = false;
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var nextSlide = currentSlide.nextElementSibling || document.querySelector('input[name="slider"]:first-of-type');
        
        if (currentSlide.id === "slide4") {
            document.getElementById("slide1").checked = true;
        } else {
            currentSlide.checked = false;
            nextSlide.checked = true;
        }
        setTimeout(function() {
            intervalEnabled = true;
        }, 10000);
    });
    
    function nextSlide() {
        if (!intervalEnabled) return;
        var currentSlide = document.querySelector('input[name="slider"]:checked');
        var nextSlide = currentSlide.nextElementSibling || document.querySelector('input[name="slider"]:first-of-type');
        
        if (currentSlide.id === "slide4") {
            document.getElementById("slide1").checked = true;
        } else {
            currentSlide.checked = false;
            nextSlide.checked = true;
        }
    }
    
    setInterval(nextSlide, 5000);
    
    
            
            
    });

