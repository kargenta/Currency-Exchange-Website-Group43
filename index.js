const supabaseClient = require('@supabase/supabase-js')
const express = require('express')
var bodyParser = require('body-parser')
const { isValidStateAbbreviation } = require("usa-state-validator")

const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = ''
const supabaseKey = ''
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/home_page.html', { root: __dirname})
})