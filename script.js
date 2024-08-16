function calculate() {
    let productPrice = parseFloat(document.getElementById('productPrice').value);
    let sustainabilityScore = parseFloat(document.getElementById('sustainabilityScore').value);
    let availableCP = parseFloat(document.getElementById('creditPoints').value);
    let applyCP = parseFloat(document.getElementById('applyCP').value);

    if (isNaN(productPrice) || isNaN(sustainabilityScore)) {
        alert("Please enter valid numbers for Price and Sustainability Score.");
        return;
    }

    // Apply constraint: can't apply more CP than available
    if (applyCP > availableCP) {
        applyCP = availableCP;
        document.getElementById('applyCP').value = applyCP.toFixed(2);
    }

    // Calculate earned credit points
    let earnedCP = (productPrice * sustainabilityScore) / 100;

    // Calculate discount and adjust if discount exceeds price
    let discount = applyCP / 100;
    if (discount > productPrice) {
        discount = productPrice;
        applyCP = productPrice * 100; // Use only the CP needed to make the price zero
    }

    let totalAfterDiscount = productPrice - discount;
    let newTotalCP = availableCP + earnedCP - applyCP;

    document.getElementById('creditPoints').value = newTotalCP.toFixed(2);
    document.getElementById('topCreditPoints').textContent = newTotalCP.toFixed(2);

    document.getElementById('result').innerHTML = `
        <p><strong>Product Price:</strong> $${productPrice.toFixed(2)}</p>
        <p><strong>Earned Credit Points:</strong> ${earnedCP.toFixed(2)} CP</p>
        <p><strong>Discount Applied:</strong> $${discount.toFixed(2)}</p>
        <p><strong>Total After Discount:</strong> $${totalAfterDiscount.toFixed(2)}</p>
        <p><strong>New Total Credit Points:</strong> ${newTotalCP.toFixed(2)} CP</p>
    `;

    // Update the maxCP placeholder
    document.getElementById('placeholderCP').textContent = `Max: ${availableCP.toFixed(2)} CP`;
    document.getElementById('maxCP').textContent = `(Max: ${availableCP.toFixed(2)} CP)`;
}

// Initialize the maxCP placeholder on page load
document.addEventListener('DOMContentLoaded', () => {
    let availableCP = parseFloat(document.getElementById('creditPoints').value);
    document.getElementById('placeholderCP').textContent = `Max: ${availableCP.toFixed(2)} CP`;
    document.getElementById('maxCP').textContent = `(Max: ${availableCP.toFixed(2)} CP)`;
    document.getElementById('topCreditPoints').textContent = availableCP.toFixed(2);

    // Set event listeners for input field
    const applyCPInput = document.getElementById('applyCP');
    const placeholderCP = document.getElementById('placeholderCP');

    applyCPInput.addEventListener('input', () => {
        if (applyCPInput.value.length > 0) {
            placeholderCP.style.opacity = 0;
        } else {
            placeholderCP.style.opacity = 0.5;
        }
    });
});
