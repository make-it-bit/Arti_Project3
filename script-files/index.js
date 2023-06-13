import coincapSuccessfulResultHandler from './request-handlers/coincap-request-handler.js';
import coindeskSuccessfulRequestHandler from './request-handlers/coindesk-request-handler.js';
import coinstatSuccessfulRequestHandler from './request-handlers/coinstat-request-handler.js';
import { createTableRow, spinnerDisplayChanger, resultSectionDisplayChanger, unsuccessfulRequestHandler, clearResultsArticle } from './request-handlers/shared-scripts.js';
// setting display to none on results section
resultSectionDisplayChanger(false);

// handling the coincap form -- get crypto currency data
const coincapButton = document.getElementById("coincap_form_button");
const coincapForm = document.getElementById("coincap_form");

coincapForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (coincapForm.checkValidity()) {
    console.log("Coincap form called");

    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const coinName = document.getElementById("f1-1").value;
    fetch(`http://api.coincap.io/v2/assets/${coinName}`)
      .then((result) => result.json())
      .then((data) => coincapSuccessfulResultHandler(data))
      .catch((err) => unsuccessfulRequestHandler(err));
  } else {
    alert("Can't make a request with an empty form.");
  }
});

//handling the Coindesk form - get Bitcoins value in certain currency
const coindeskFormButton = document.getElementById("coindesk_form_button");
const coindeskForm = document.getElementById("coindesk_form");

coindeskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (coindeskForm.checkValidity()) {
    console.log("Coindesk form called");

    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const currencySelected = document.getElementById("f2-1").value;

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((result) => result.json())
      .then((data) => coindeskSuccessfulRequestHandler(data, currencySelected))
      .catch((error) => unsuccessfulRequestHandler(error));
  } else {
    alert("Can't make a request with an empty form.");
  }
});

//handling coinstats form
const coinstatFormButton = document.getElementById("coinstats_form_button");
const coinstatForm = document.getElementById("coinstats_form");

coinstatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (coindeskForm.checkValidity()) {
    console.log("Coinstat form called");

    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const coinName = document.getElementById("f3-1").value;
    const exchangeAmounts = document.querySelector(
      'input[name="amount_of_exchanges"]:checked'
    ).value;

    fetch(`https://api.coinstats.app/public/v1/markets?coinId=${coinName}`)
      .then((result) => result.json())
      .then((data) =>
        coinstatSuccessfulRequestHandler(data, exchangeAmounts, coinName)
      )
      .catch((error) => unsuccessfulRequestHandler(error));
  } else {
    alert("Can't make a request with an empty form.");
  }
});

