# Project Title: Currency Exchange Website

# Project Description:
This project was created for the final project of INST 377. Our webpage was created to inform and show people about currency exchange rates. The target audience for our system would be business travelers, tourists, people that wish to send money back home from another country, as well as, foreigners in other countries. We believed that our system would make the process very simple and easy to view currency exchange rates on one single site. This system will make the process of accessing currency exchange very straightforward and quick. 

# Target Browsers Description:
Our target browser would be desktop browsers because we believe that most people utilizing a money conversion service would also be searching up and researching other facts about the countries they are sending/converting their money to. 

# Developer Manual:
## How to install application and dependencies:
API Database: `https://www.exchangerate-api.com/`
* Conversion rates for 161 countries
* Updated once every 24 hours
* Free and no limits on amount of rates 

To install, just download our code. We utilize **ExchangeRate-API**'s Standard and Pair Conversion API's. For more information, see our **API** section.

## Running your application on a server:

## API:
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
Our current application only shows the Three Letter Currency Codes since the currency name, display symbol, and associated region(s)/country/countries are only available with **ExchangeRate-API**'s paid plan. However, future development should pull this information from a different source and integrate it within the application, subscribe to **ExchangeRate-API**'s paid plan, or locate a different databse. Collectively, we believe the former or the last would be more challenging and fulfilling.