# Project Title: Currency Exchange Website

# Project Description:
This project was created for the final project of INST 377. Our webpage was created to inform and show people about currency exchange rates. The target audience for our system would be business travelers, tourists, people that wish to send money back home from another country, as well as, foreigners in other countries. We believed that our system would make the process very simple and easy to view currency exchange rates on one single site. This system will make the process of accessing currency exchange very straightforward and quick. 

# Target Browsers Description:
Our target browser would be desktop browsers because we believe that most people utilizing a money conversion service would also be searching up and researching other facts about the countries they are sending/converting their money to. 

# Developer Manual:
## How to install application and dependencies:

## Running your application on a server:
NodeJS + Express

## Backend API:

## Frontend API:
### URL Structure for the Standard API:
`https://v6.exchangerate-api.com/v6/${api-key}/latest/${ISO4217}`

#### Formats:
`api-key`

We have offered our own API key given through **ExchangeRate-API**'s free plan, but you can replace this within *currency_exchange_code.js* and get your own at `https://app.exchangerate-api.com/sign-up`.

`ISO4217`

This is the specified Three Letter Currency Code for your base currency (e.g. **USD** for US Dollars, etc.). We used **USD** for simplicity, but you're free to change it within *currency_exchange_code.js* to any base currency of your choosing.

### URL Structure for the Paired API:
`https://v6.exchangerate-api.com/v6/${api-key}/pair${fromCurrency}/${toCurrency}`

#### Formats:
`api-key`

Again, we have offered our own personal API key but you can replace this within *currency_exchange_code.js* and get your own at `https://app.exchangerate-api.com/sign-up`.

`fromCurrency`

`toCurrency`

## Future Development:
