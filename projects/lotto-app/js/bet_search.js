const slipTable = document.querySelector(".slip-table");

JSON.parse(localStorage.getItem("bet-slip")).forEach((item, index) => {
  const newItem = document.createElement("tr");
  if (index % 2 !== 0) newItem.className = "odd";
  newItem.innerHTML = `
    <td>2535874</td>
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
