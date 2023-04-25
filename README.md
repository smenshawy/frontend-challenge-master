
# The solution

## Committing steps

* Creating a new repo with the resources provided with the challenge.
* Creating a React App  boilerplate that uses Babel for transpiling, Webpack for bundling, SCSS for styling, Jest and React Testing Library for testing.
* Creating the Wdiget
* Integrating the widget to the clinet's webpage.

## To run the widget

* Clone the repo locally.
* Run `npm install` and `npm start` in the api project to start the backend.
* Run `npm install` and `npm run build` in the financing-cost-widget project to bundle the app in `dist/bundle.js`.
* Open the `product-page.html` page in the browser.

## To distribute to clients

* Add 3 <script> tags in the HTML page before the enty point of the project, main.js in this case:
```
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="../financing-cost-widget/dist/bundle.js"></script>
```

* Place a root div, for the React widget to render inside, in the right spot in the client's layout: 

```
<div id="financing-cost-widget">Prototype will go here</div>
```

* Call the widget function every time the price changes passing the merchant name, elementID where the widget will render, price, currency and quantity, for example:

```
new FinancingCostWidget({
    merchant: "Merchant Test",
    elementId: "financing-cost-widget",
    price: parseInt($("#product-price")[0].innerText.replace(/\D/g, "")),
    currency: $("#product-price")[0].innerText.slice(-1),
    quantity: parseInt($(".section > div > input").val()),
  });
  
```

## Testing

* Did integration test that included the main component; FinancingCost.js including its children components and the api client utils.
* Did NOT write tests for the Modal and FinancingDetails components due to lack of time.

# Frontend coding challenge


This is the coding challenge for people who applied to a frontend developer position at SeQura. It's been designed to be a simplified version of the same problems we deal with.

## The challenge

SeQura provides e-commerce shops (merchants) a flexible payment method so their customers (shoppers) can purchase the goods paying in instalments. SeQura has analyzed, that this kind of payment method requires a biggest effort in promotion by part of the merchant to make a difference in purchases quantity and average amount.

The marketing team is now asking you to make a prototype of a widget that displays the financing cost for a given product for merchant's product page. They also ask you that they would want to know any shopper interaction with the widget to analyze if the widget has any impact.

We expect you to:

* Create the prototype for the mockups that the marketing team has given you (`mockups.pdf`)
  * Integrate the prototype with SeQura `CreditAgreementAPI` (`docs/credit_agreement_api.md`) to fetch financing information for a given product value.
  * Integrate the prototype with SeQura `EventsAPI` (`docs/events_api.md`) triggering an event for each shopper interaction.
* Integrate the prototype in the merchant sample site (`merchant-site/product-page.html`) so that every time the product price changes the financing value is updated.
* Write up a paragraph with the way you would distribute this prototype to all our merchants.

## Instructions

* Please read carefully the challenge and if you have any doubt or need extra info please don't hesitate to ask us before starting.
* You shouldn't spend more than 3h on the challenge.
* You should consider this code ready for production as it were a PR to be reviewed by a colleague. Also commit as if it were a real assignment.
* Design, test, develop and document the code. It should be a performant, clean and well structured solution. **Then send us a link or a zip with a git repo**.
* Remember you're dealing with resources that will be loaded on merchant's sites, so you should be careful with dependencies, styles and code clashing.
* Create a README explaining how to setup and run your solution and a short explanation of your technical choices, tradeoffs, ...
* You don't need to finish. We value quality over feature-completeness. If you have to leave things aside you can mention them on the README explaining why and how you would resolve them.
* You can code the solution in a language or framework of your choice.
* In order to use SeQura mocked APIs you need to start the environment found in folder `api`

**HAPPY CODING!!**
