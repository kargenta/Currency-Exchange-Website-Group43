const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser')
const express = require('express')
var {validateCurrencyCode} = require('validate-currency-code');

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))


// app.use(express.json());
// app.use(express.static('public'));

const supabaseUrl = 'https://mpltjqyussdapezeftxw.supabase.co' //change the url
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbHRqcXl1c3NkYXBlemVmdHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzA2NDQsImV4cCI6MjAzMTY0NjY0NH0.EAcDETL8tqY4wV3vaRgbPBEQ4Qh5LB67jUs6DiB6OJ8'
//change the key
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)


app.post('/conversions', async (req, res) => {
    console.log('Adding User Currency Exchange')
    var currencyFrom = req.body.from;
    var currencyTo = req.body.to;
    var amount = req.body.amount;
    var convertedAmt = req.body.convertedAmt;

    if(!validateCurrencyCode(currencyFrom)) {
        console.log(`Currency ${currencyFrom} is Invalid`)
        res.statusCode = 400
        res.header('Content-Type', 'application/json')
        var errorJson = {
            "message": `${currencyFrom} is not a Valid Currency`
        }
        res.send(JSON.stringify(errorJson))
        return;
    }

    if(!validateCurrencyCode(currencyTo)) {
        console.log(`Currency ${currencyTo} is Invalid`)
        res.statusCode = 400
        res.header('Content-Type', 'application/json')
        var errorJson = {
            "message": `${currencyTo} is not a Valid Currency`
        }
        res.send(JSON.stringify(errorJson))
        return;
    }

    const { data, error } = await supabase
        .from('conversions')
        .insert({ 'currency_from': currencyFrom, 'currency_to': currencyTo, 'amount': amount, 'result': convertedAmt })
        .select()

    if(error){
        console.log('Error')
        res.send(error)
    }else{
        res.send(data)
    }
});

app.get('/currencies', async (req, res) => {
    const { data, error } = await supabase
        .from('currencies')
        .select()

    if(error){
        console.log('Error')
        res.send(error)
    }else{
        res.send(data)
    }
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:3000:${port}`);
    console.log('APP IS ALIVEEE')
});

