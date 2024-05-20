const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser')
const express = require('express')
var validateCurrencyCode = require('validate-currency-code');

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://acgmelhqtxqqgsqtypgr.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZ21lbGhxdHhxcWdzcXR5cGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwODMwNzIsImV4cCI6MjAzMTY1OTA3Mn0.fA1kfok82zI1dmZ_R6fN3mYYCxKxRDjI5aWMaQRNyl0'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', async (req, res) => {
    res.sendFile('public/home_page.html', {root: __dirname})
})

// adding new conversion
app.post('/conversion', async (req, res) => {
    console.log('Adding User Currency Exchange')
    var currencyFrom = req.body.from;
    var currencyTo = req.body.to;
    var amount = req.body.amount;
    var convertedAmt = req.body.convertedAmt;
    console.log("result", convertedAmt)

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
        console.log('Error adding new conversion: ', error)
        res.send(error)
    }else{
        res.send(data)
    }
});

// get user currency codes
app.get('/conversions', async (req, res) => {
    console.log('Attempting to GET all conversions')

    const { data, error } = await supabase
        .from('conversions')
        .select()

    if (error) {
        console.log('Error fetching currency codes:', error);
        res.send(error);
    } else {
        res.send(data);
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit_contact_form', async (req, res) => {
    var Name = req.body.name;
    var Email = req.body.email;
    var Message = req.body.message;

    const { data, error } = await supabase
        .from('outreach')
        .insert({ 'name': Name, 'email': Email, 'message': Message })
        .select()

    if (error) {
        console.log('Error getting the message:', error);
        res.send(error);
    } else {
        res.send(data);
    }
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
    console.log('APP IS ALIVEEE')
});

