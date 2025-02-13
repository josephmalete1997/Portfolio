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
    localStorage.setItem(
      "deposit-amount",
      Number(domElements.depositAmount.value)
    );
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

domElements.depositAmount.addEventListener("change", () => {
  localStorage.setItem(
    "deposit-amount",
    Number(domElements.depositAmount.value)
  );
});

domElements.closeDepositPanel.addEventListener("click", () => {
  overLayer.style.display = "none";
  domElements.depositMethodsPanel.style.display = "none";
});

domElements.depositButton.addEventListener("click", () => {
  depositPanel.style.display = "none";
  domElements.depositMethodsPanel.style.display = "flex";
});

//Methods

document
  .querySelectorAll(".payment-methods .method")[0]
  .addEventListener("click", () => {
    domElements.depositMethodsPanel.style.display = "none";
    domElements.currentPaymentMethodPanel.style.display = "flex";
    document.querySelector(".get-deposit-amount").innerHTML =
      localStorage.getItem("deposit-amount");
    document.getElementById("amount").value = Number(
      localStorage.getItem("deposit-amount")
    );
  });

// Paypal

const paypalPay = document.querySelector(".paypal-form .deposit-now");
const cancelDeposit = document.querySelector(".paypal-form .cancel-deposit");
const Loader = document.querySelector(".loader");

document.querySelector(".close-paypal-panel").addEventListener("click", () => {
  domElements.currentPaymentMethodPanel.style.display = "none";
  overLayer.style.display = "none";
});
