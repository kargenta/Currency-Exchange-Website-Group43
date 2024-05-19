var host = window.location.origin;
//console.log(host)

// Populate Currency Form
async function getCurrencies() {
    let fromCurrency = document.getElementById("from");
    let toCurrency = document.getElementById("to");

    await fetch("https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/latest/USD")
        .then((res) => res.json())
        .then((res) => {
            for(const [key, value] of Object.entries(res.conversion_rates)) {
                const option = document.createElement('option');
                option.value = key;
                option.text = key;
                fromCurrency.add(option);
                toCurrency.add(option.cloneNode(true));
            }
        })
}
function updateConvertedDiv(content) {
  const convertedDiv = document.getElementById("converted");
  if (content) {
      convertedDiv.innerHTML = content;
      convertedDiv.style.display = 'block';
  } else {
      convertedDiv.innerHTML = '';
      convertedDiv.style.display = 'none';
  }
}

async function addText() {
  let fromCurrency = document.getElementById("from").value;
  let toCurrency = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  if (fromCurrency === toCurrency) {
    alert("You cannot convert to and from the same currency!");
    return;
  } else {
    await fetch(`https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then((res) => {
       //let convertedAmt = res.conversion_rate*amount;
        let convertedAmt = (res.conversion_rate*amount).toFixed(2);
        updateConvertedDiv(`${amount} ${fromCurrency} is equal to ${convertedAmt} ${toCurrency}`);
        })
  }
}

async function loadUserData() {
  await fetch(`${host}/conversions`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      
    })
}

// get all currency codes:
async function getCodes() {
  var allCodes = [];
  await fetch(`${host}/currency-codes`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((currency) => {
        const code = currency.currency_code.value;
        console.log("curr code:", code)
        if (!allCodes.includes(code)) {
          allCodes.push(code)
        }
      })
    })
    .catch((error) => {
      console.error('Error fetching currency codes:', error);
    })
  return allCodes;
}

// Chart:
async function makeChart(codeArray=getCodes(), ) { // need to get user Info here
  document.getElementById('chartDiv').style.visibility = 'visible';
  const ctx = document.getElementById('myChart');
  let status = Chart.getChart('myChart');
  if (status != undefined) {
    status.destroy();
  }
  // code here
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: codeArray, // currency codes or names
      datasets: [{
        label: 'Number of Conversions',
        data: [], // get number per currencies
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        }]
    }

  }) 
}
// function getTopCurrencies() {
//   const today = new Date();
//   const startDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000)); // 30 days ago
//   console.log(`${startDate.toISOString().slice(0, 10)}`)
//   console.log(`${today.toISOString().slice(0, 10)}`)

//   const url = `https://api.currencyapi.com/v3/historical?apikey=d56e314bee9151ab29d0903d&base_currency=USD&start_date=${startDate.toISOString().slice(0, 10)}&end_date=${today.toISOString().slice(0, 10)}`;

//   fetch(url)
//     .then(res => res.json())
//     .then(res => {
//       console.log(res); // Log the full response to see what it looks like
//       if (!res.data || !res.data[0] || !res.data[0].rates) {
//         throw new Error("Invalid response structure");
//       }

//       const topCurrencies = Object.keys(res.data[0].rates).slice(0, 5);
//       const historicalData = {};
//       topCurrencies.forEach(currency => {
//         historicalData[currency] = [];
//         for (const day of Object.values(res.data)) {
//           historicalData[currency].push(day.rates[currency]);
//         }
//       });

//       const ctx = document.getElementById('topCurrenciesChart').getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: Array.from({ length: 30 }, (_, i) => new Date(today.getTime() - (i * 24 * 60 * 60 * 1000)).toISOString().slice(5, 10)),
//           datasets: topCurrencies.map(currency => ({
//             label: currency,
//             data: historicalData[currency],
//             borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
//             fill: false
//           }))
//         },
//         options: {
//           scales: {
//             x: {
//               type: 'category',
//               reverse: true
//             },
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching top currencies:', error);
//       document.getElementById("converted").innerHTML = `Failed to load currency data: ${error.message}. Please try again later.`;
//     });
// }

window.onload = function(){
  getCurrencies();
  //getTopCurrencies();
}
