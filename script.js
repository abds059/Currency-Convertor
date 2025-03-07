document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const msg = document.querySelector(".msg");

  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent form submission

      let amount = document.querySelector("input").value;
      let fromCurrency = document.querySelector("select[name='from']").value;
      let toCurrency = document.querySelector("select[name='to']").value;

      if (!amount || isNaN(amount) || amount <= 0) {
          msg.innerText = "Please enter a valid amount.";
          return;
      }

      const apiKey = "972e935cf9d08243c8ee03ce";
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

      try {
          let response = await fetch(url);
          let data = await response.json();

          if (data.result === "success") {
              let exchangeRate = data.conversion_rates[toCurrency];
              let convertedAmount = (amount * exchangeRate).toFixed(2);
              msg.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
          } else {
              msg.innerText = "Error fetching exchange rates.";
          }
      } catch (error) {
          msg.innerText = "Something went wrong. Please try again.";
          console.error(error);
      }
  });
});

const dropdowns = document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change", (event)=>{
        updateFlag(event.target);
    });
}


const updateFlag = (Element) =>{
    currCode = Element.value;
    let countryCode = countryList[currCode];
    let newSRC = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSRC;
}


