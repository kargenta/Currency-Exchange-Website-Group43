# Project Title: Currency Exchange Website

# Project Description:
This project was created for the final project of INST 377. Our webpage was created to inform and show people about currency exchange rates. The target audience for our system would be business travelers, tourists, people that wish to send money back home from another country, as well as, foreigners in other countries. We believed that our system would make the process very simple and easy to view currency exchange rates on one single site. This system will make the process of accessing currency exchange very straightforward and quick. 

# Target Browsers Description:
Our target browser would be desktop browsers because we believe that most people utilizing a money conversion service would also be searching up and researching other facts about the countries they are sending/converting their money to. 

# Developer Manual:
## How to install application and dependencies:
### Installing Application:
Clone repository: `https://github.com/kargenta/Currency-Exchange-Website-Group43.git`
Make sure to set/change the directory as well if needed and that you have Node.js installed.

### Installing Dependencies:
Make sure you have already installed the following dependencies through the terminal:
- Node Package Manager: `npm install` 
- Nodemon: `npm install nodemon`
- Express: `npm install express`
- Supabase :`npm install @supabase/supabase-js`
- Body-parser: `npm install body-parser`
- validate-currency-code: `npm install validate-currency-code`

## Running your application on a server:
Start the server using Node.js and Express:
    `npm start`

## API:
### Base API:
`http://127.0.0.1:3000`
The server runs locally on your machine. 

### API EndPoints:
`/`: serves the home page (`home_page.html`)
- GET

`/conversion`: adds user's new currency conversion to the database for reference for the pie charts.
- POST
- **Success**: returns inserted conversion data
    - example:
        {
            "from": "USD",
            "to": "EUR",
            "amount": "100",
            "convertedAmt": "84.50"
        }
- **Error**: returns an error and sends an error message to console depending if the currency code is invalid or there is a database error

`/conversions`: fetches all conversion from the database
- GET
- **Success**: returns list of all conversions made
- **Error**: returns an error and sends an error message "Error fetching currency codes:" along with the error to the cnosole

`/submit_contact_form`: adds form information from the contact form on `help_page.html` to database "outreach" containing all user's requiring help or more information
- POST
- **Success**: sends user inquiry information to 'outreach' database
    - example:
        {
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "message": "hello world"
        }
- **Error**: returns an error and sends an error message "Error getting the message:" along with the error into the console

## Future Development:
- **Full Currency Names**: develop database with the full currency names and utilize within website for better understandability
- **React**: move frontend to React to allow for more dynamic updates
- **Mobile Optimization**: optimize website for mobile devices to broaden usability
- **User Authentication**: implement user authentication to save user preferences and conversion history
- **Historical Data**: integrate historical exchange rate information for users to analyze currency exchange over time
- **Additional APIs**: explore additional APIs for more accurate and comprehensive exchange rate data