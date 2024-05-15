// Populate Currency Form
function getCurrencies() {
    let fromCurrency = document.getElementById("from");
    let toCurrency = document.getElementById("to");

    fetch("https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/latest/USD")
        .then((res) => res.json())
        .then((res) => {
            for(const [key, value] of Object.entrries(res.conversion_rates)) {
                const option = document.createElement('option');
                option.value = key;
                option.text = key;
                fromCurrency.add(option);
                toCurrency.add(option.cloneNode(true));
            }
        })
}

function addText() {
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;

    if (fromCurrency === toCurrency) {
        alert("You cannot convert to and from the same currency!");
        return;
    } else {
        fetch(`https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/pair/${fromCurrency}/${toCurrency}`)
            .then(res => res.json())
            .then((res) => {
                let convertedAmt = res.conversion_rate*amount;
                document.getElementById("converted").innerHTML = `${amount} ${fromCurrency} is equal to ${convertedAmt} ${toCurrency}`
            })
    }
}

window.onload = getCurrencies;