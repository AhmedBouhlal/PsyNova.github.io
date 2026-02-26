// Payment Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const protocolPrice = parseFloat(urlParams.get('price') || '49.99');
  const processingFee = 2.99;
  const totalAmount = protocolPrice + processingFee;

  // Update price displays
  document.getElementById('protocolPrice').textContent = `$${protocolPrice.toFixed(2)}`;
  document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
  document.getElementById('paymentAmount').textContent = `$${totalAmount.toFixed(2)}`;

  // Format card number input
  const cardNumberInput = document.getElementById('cardNumber');
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
  });

  // Format expiry date input
  const expiryInput = document.getElementById('expiry');
  expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  });

  // Only allow numbers for CVV
  const cvvInput = document.getElementById('cvv');
  cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });

  // Handle form submission
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    const email = document.getElementById('email').value;

    // Basic validation
    if (!validateCard(cardNumber, expiry, cvv, cardName, email)) {
      return;
    }

    // Show processing state
    const submitBtn = paymentForm.querySelector('.payment-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Processing...</span>';
    submitBtn.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
      // Show success message
      showPaymentSuccess(totalAmount);
    }, 2000);
  });
});

function validateCard(cardNumber, expiry, cvv, cardName, email) {
  // Remove spaces from card number for validation
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  
  // Basic card validation
  if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    showError('Please enter a valid card number');
    return false;
  }

  // Validate expiry
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) {
    showError('Please enter a valid expiry date (MM/YY)');
    return false;
  }

  // Check if card is expired
  const [month, year] = expiry.split('/');
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  const expiryYear = parseInt(year);
  const expiryMonth = parseInt(month);

  if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
    showError('Card has expired');
    return false;
  }

  // Validate CVV
  if (cvv.length < 3 || cvv.length > 4) {
    showError('Please enter a valid CVV');
    return false;
  }

  // Validate name
  if (cardName.trim().length < 3) {
    showError('Please enter the cardholder name');
    return false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return false;
  }

  return true;
}

function showError(message) {
  // Remove existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <span class="error-icon">⚠️</span>
    <span class="error-text">${message}</span>
  `;

  // Insert error message before the form
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.parentNode.insertBefore(errorDiv, paymentForm);

  // Remove error after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

function showPaymentSuccess(amount) {
  // Hide the form
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.style.display = 'none';

  // Show success message
  const successDiv = document.createElement('div');
  successDiv.className = 'payment-success';
  successDiv.innerHTML = `
    <div class="success-icon">✅</div>
    <h2>Payment Successful!</h2>
    <p>Thank you for your purchase of $${amount.toFixed(2)}</p>
    <p>Your PsyNova has been activated.</p>
    <p>A confirmation email has been sent to your address.</p>
    <div class="success-actions">
      <button onclick="window.location.href='index.html'" class="home-btn">
        Return to Home
      </button>
      <button onclick="window.location.href='reveal.html'" class="reveal-btn">
        View Your Kit
      </button>
    </div>
  `;

  // Replace the payment form with success message
  paymentForm.parentNode.appendChild(successDiv);

  // Store payment confirmation
  localStorage.setItem('paymentCompleted', 'true');
  localStorage.setItem('paymentAmount', amount.toString());
  localStorage.setItem('paymentDate', new Date().toISOString());
}
