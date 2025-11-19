// Show popup function
function showSuccessPopup() {
    const modal = document.getElementById("payment-success-modal");
    modal.style.display = "flex";

    // Auto close after 3 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}

document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("payment-success-modal").style.display = "none";
});

// When clicking "Pay with Cash"
document.getElementById("cashBtn").addEventListener("click", function () {
    showSuccessPopup();
});
