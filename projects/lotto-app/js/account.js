{
  /* <div class="deposit-panel">
      <div class="close-deposit-panel"><i class="fa-solid fa-times"></i></div>
      <button class="deposit">Deposit</button>
      <button class="withdraw">Withdraw</button>
    </div>
    <div class="over-layer"></div> */
}

const balancePanel = document.querySelector(".balance");
const closeDepositPanel = document.querySelector(".close-deposit-panel");
const depositPanel = document.querySelector(".deposit-panel");
const overLayer = document.querySelector(".over-layer");

depositPanel.style.display = "none";
overLayer.style.display = "none";

balancePanel.addEventListener("click", () => {
  depositPanel.style.display = "flex";
  overLayer.style.display = "block";
});

closeDepositPanel.addEventListener("click", () => {
  depositPanel.style.display = "none";
  overLayer.style.display = "none";
});
