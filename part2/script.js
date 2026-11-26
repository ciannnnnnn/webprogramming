let statusHeading = document.getElementById("status-heading");
let brownBtn = document.getElementById("brownBtn");
let pinkBtn = document.getElementById("pinkBtn");
let greenBtn = document.getElementById("greenBtn");

brownBtn.addEventListener("click", function () {
    document.body.style.background = "green";
    statusHeading.textContent = "The background now is green";
    alert("Green");
});

pinkBtn.addEventListener("click", function () {
    document.body.style.background = "yellow";
    statusHeading.textContent = "The background now is yellow";
    alert("Yellow");
});

greenBtn.addEventListener("click", function () {
    document.body.style.background = "pink";
    statusHeading.textContent = "The background now is pink";
    alert("Pink");
});