var host = window.location.origin;
console.log(host)

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
    await getCodes();
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

async function convertedAmt() {
  let fromCurrency = document.getElementById("from").value;
  let toCurrency = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  await fetch(`https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/pair/${fromCurrency}/${toCurrency}`)
    .then(res => res.json())
    .then((res) => {
      //let convertedAmt = res.conversion_rate*amount;
      let convertedAmtOnly = (res.conversion_rate*amount).toFixed(2);
      return convertedAmtOnly;
    })
}

async function createExchange() {
  console.log('Creating Conversion')
  await fetch(`${host}/conversion`, {
    method: 'POST',
    body: JSON.stringify({
      "from": `${document.getElementById('from').value}`,
      "to": `${document.getElementById('to').value}`,
      "amount": `${document.getElementById('amount').value}`,
      "convertedAmt": `${convertedAmt}`
    }),
    headers: {
      "Content-type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((res) =>  {
  })

  await makeChart();// update charts!!
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
  var allCodesTo = {};
  var allCodesFrom = {};
  await fetch(`${host}/conversions`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((conversion) => {
        const from_code = conversion.currency_from;
        const to_code = conversion.currency_to;

        console.log("curr from code:", from_code)
        console.log("curr from code:", to_code)
        if (allCodesTo[to_code]) {
          allCodesTo[to_code]++;
        } else {
          allCodesTo[to_code] = 1;
        }
        if (allCodesFrom[from_code]) {
          allCodesFrom[from_code]++;
        } else {
          allCodesFrom[from_code] = 1;
        }
      })
    })
    .catch((error) => {
      console.error('Error fetching currency codes:', error);
    })
  return [allCodesTo, allCodesFrom];
}

function randomColorGenerator(num) {
  const colors = []
  for (let i = 0; i<num;i++) {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    colors.push(color)
  }
  return colors;
}

// Chart:
async function makeChart() { // need to get user Info here
  document.getElementById('chartDiv').style.visibility = 'visible';
  const ctx1 = document.getElementById('myChart1');
  const ctx2 = document.getElementById('myChart2');

  const [allCodesTo, allCodesFrom] = await getCodes();
  
  // conversions to [currency] chart data
  const toLabels = Object.keys(allCodesTo);
  const toData = Object.values(allCodesTo);
  const toColors = randomColorGenerator(toLabels.length);

  // conversions from [currency] chart data
  const fromLabels = Object.keys(allCodesFrom);
  const fromData = Object.values(allCodesFrom);
  const fromColors = randomColorGenerator(fromLabels.length);

  let status1 = Chart.getChart('myChart1');
  if (status1 != undefined) {
    status1.destroy();
  }

  let status2 = Chart.getChart('myChart2')
  if (status2 != undefined) {
    status2.destroy();
  }

  new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: toLabels, // currency codes or names
      datasets: [{
        label: 'Number of Conversions',
        data: toData, // get number per currencies
        backgroundColor: toColors,
        hoverOffset: 4
        }]
    }
  }) 

  new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: fromLabels, // currency codes or names
      datasets: [{
        label: 'Number of Conversions',
        data: fromData, // get number per currencies
        backgroundColor: fromColors,
        hoverOffset: 4
        }]
    }
  }) 
}

window.onload = getCurrencies;
