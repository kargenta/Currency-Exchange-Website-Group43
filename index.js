const { createClient } = require('@supabase/supabase-js');
const express = require('express')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))


app.use(express.json());
app.use(express.static('public'));

const supabaseUrl = 'https://mpltjqyussdapezeftxw.supabase.co' //change the url
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbHRqcXl1c3NkYXBlemVmdHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzA2NDQsImV4cCI6MjAzMTY0NjY0NH0.EAcDETL8tqY4wV3vaRgbPBEQ4Qh5LB67jUs6DiB6OJ8'
//change the key
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)



app.post('/conversions', async (req, res) => {
    const { currency_from, currency_to, amount, result } = req.body;
    const { data, error } = await supabase
        .from('conversions')
        .insert({ 'currency_from': currencyFrom, 'currency_to': currencyTo, 'amount': amount, 'result': result })
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
        .select('*')

    if(error){
        console.log('Error')
        res.send(error)
    }else{
        res.send(data)
    }
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:3000/${port}`);
});

app.listen(port, () => {
    console.log('APP IS ALIVEEE')
})