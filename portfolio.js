var typed = new Typed('.text', {
    strings: ["Web Developer", "Frontend Developer"], 
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
});

// Hide all service details initially and add click event for "Read more" links
document.querySelectorAll("#services .details").forEach(function (details) {
    details.style.display = "none"; // Hide all details initially

    // Find the corresponding "Read more" link for each section
    var learnMore = details.nextElementSibling;

    learnMore.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior

        if (details.style.display === "none") {
            details.style.display = "inline"; // Show the details
            learnMore.textContent = "Hide details"; // Change the link text
        } else {
            details.style.display = "none"; // Hide the details
            learnMore.textContent = "Read more"; // Change the link text back
        }
    });
});

// Handle form submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbxVXyh0dtwxU7zRdRIjd5l8uOupT31cLCHvORWpb828DFEIm1Ku34Pwy4mpwdg2tjYo/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent Successfully!!";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

// Handle side menu opening and closing
var sidemenu = document.getElementById("sidemenu");

function openMenu() {
    sidemenu.style.right = "0";
}

function closeMenu() {
    sidemenu.style.right = "-200px";
}

// Handle tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function openTab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
