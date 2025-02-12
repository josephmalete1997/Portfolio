function clearActiveSelectedAmount() {
  domElements.depositAmountOptions.forEach((item) => {
    item.classList.remove("active-deposit-amount");
  });
}

domElements.depositAmountOptions.forEach((item) => {
  item.addEventListener("click", () => {
    clearActiveSelectedAmount();
    item.classList.add("active-deposit-amount");
    domElements.depositAmount.value = parseInt(item.getAttribute("data-id"));
  });
});

domElements.depositAmount.addEventListener("input", () => {
  const depositAmountsArray = [5, 10, 20, 50, 100, 200];
  const currentValue = Number(domElements.depositAmount.value);
  if (!depositAmountsArray.includes(currentValue)) {
    clearActiveSelectedAmount();
  } else {
    domElements.depositAmountOptions.forEach((item, index) => {
      const currentAmount = Number(item.getAttribute("data-id"));
      if (currentValue === currentAmount) {
        clearActiveSelectedAmount();
        item.classList.add("active-deposit-amount");
      }
    });
  }
});

domElements.closeDepositPanel.addEventListener("click", () => {
  overLayer.style.display = "none";
  domElements.depositMethodsPanel.style.display = "none";
});

domElements.depositButton.addEventListener("click", () => {
  depositPanel.style.display = "none";
  domElements.depositMethodsPanel.style.display = "block";
});

//Methods

document
  .querySelectorAll(".payment-methods .method")[0]
  .addEventListener("click", () => {
    domElements.depositMethodsPanel.style.display = "none";
    domElements.currentPaymentMethodPanel.style.display = "flex";
  });

// Paypal

const paypalPay = document.querySelector(".paypal-form .deposit-now");
const cancelDeposit = document.querySelector(".paypal-form .cancel-deposit");
const Loader = document.querySelector(".loader");

paypalPay.addEventListener("click", () => {
  document.querySelector(".paypal-form").style.display = "none";
  Loader.style.display = "block";
  userObject.balance += 100;
  localStorage.setItem("balance", userObject.balance);
});

cancelDeposit.addEventListener("click", () => {
  domElements.currentPaymentMethodPanel.style.display = "none";
});
