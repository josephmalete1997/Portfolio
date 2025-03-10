const slipTable = document.querySelector(".slip-table");
const searchInput = document.getElementById("slip-id");
const searchButton = document.querySelector(".bet-search-button");

searchButton.addEventListener("click", () => {
  searchBet(searchInput.value);
});

JSON.parse(localStorage.getItem("bet-slip")).forEach((item, index) => {
  const newItem = document.createElement("tr");
  if (index % 2 !== 0) newItem.className = "odd";
  newItem.innerHTML = `
                <td>${item.id}</td>
                <td>R${item.stake}</td>
                <td>${item.numbers[0]}</td>
                <td>${item.numbers[1] || ""}</td>
                <td>${item.numbers[2] || ""}</td>
                <td>${item.numbers[3] || ""}</td>
                <td>${item.numbers[4] || ""}</td>
                <td>${item.numbers[5] || ""}</td>
                <td>R${item.payout}</td>
                <td>Lost</td>
    `;
  slipTable.append(newItem);
});

function searchBet(slipID) {
  document.querySelector("#resulting-slip-id").innerHTML = slipID;
  JSON.parse(localStorage.getItem("bet-slip")).forEach((item, index) => {
    const newItem = document.createElement("tr");
    if (Number(item.id) === Number(slipID)) {
      //if (index % 2 !== 0) newItem.className = "odd";
      slipTable.innerHTML = ` <tr style="background: black;color:white;border: 1px solid black;">
      <td>Bet ID</td>
      <td>Stake</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Payout</td>
      <td>Status</td>
    </tr>`;
      newItem.innerHTML = `
                      <td>${item.id}</td>
                      <td>R${item.stake}</td>
                      <td>${item.numbers[0]}</td>
                      <td>${item.numbers[1] || ""}</td>
                      <td>${item.numbers[2] || ""}</td>
                      <td>${item.numbers[3] || ""}</td>
                      <td>${item.numbers[4] || ""}</td>
                      <td>${item.numbers[5] || ""}</td>
                      <td>R${item.payout}</td>
                      <td>Lost</td>
          `;
      slipTable.append(newItem);
    } else if (Number(item.id) !== Number(slipID)) {
      slipTable.innerHTML = "No results found!";
    }
  });
}
