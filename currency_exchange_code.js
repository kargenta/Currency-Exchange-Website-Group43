let supportedPairs = [];
async function fetchCurrencies() {
    try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/d56e314bee9151ab29d0903d/latest/USD');
    const data = await response.json();
    const currencyCodes = Object.keys(data.conversion_rates);

    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    currencyCodes.forEach(code => {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');
        optionFrom.value = optionTo.value = code;
        optionFrom.text = optionTo.text = code;
        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
        currencyCodes.forEach(otherCode => {
            if (code !== otherCode) {
                supportedPairs.push(`${code}${otherCode}`);
            }
        });
    });
    console.log('Currencies fetched and dropdowns populated.');
} catch (error) {
    console.error('Error fetching currencies:', error);
    document.getElementById('resultDisplay').textContent = "Error: Unable to populate currency options.";
}
}
async function fetchExchangeRate(fromCurrency, toCurrency, amount) {
    try {
        const pair = `${fromCurrency}${toCurrency}`;
        if (!supportedPairs.includes(pair)) {
            throw new Error("Unsupported currency pair selected.");
        }

        const queryParams = new URLSearchParams("pairs=" + {pair});
        const response = await fetch(`https://www.freeforexapi.com/api/live?${queryParams}`);
        const data = await response.json();

        console.log('API Response:', data);

        if (data.rates && data.rates[pair] && data.rates[pair].rate) {
            const rate = data.rates[pair].rate;
            const convertedAmount = rate * amount;
            document.getElementById('resultDisplay').textContent = `Amount: ${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            throw new Error("Invalid exchange rate data or unsupported currency pair.");
        }
    } catch (error) {
        document.getElementById('resultDisplay').textContent = "Error: " + error.message;
        console.error('Error fetching exchange rate:', error);
    }
}



document.getElementById('exchangeRateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const fromCurrency = document.getElementById('from').value.trim();
    const toCurrency = document.getElementById('to').value.trim();
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    console.log(`Form submitted. From: ${fromCurrency}, To: ${toCurrency}, Amount: ${amount}`);
    fetchExchangeRate(fromCurrency, toCurrency, amount);
});

document.addEventListener('DOMContentLoaded', fetchCurrencies);
console.log('Script loaded and event listeners added.');
