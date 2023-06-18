import coincapSuccessfulResultHandler from './request-handlers/coincap-request-handler.js';
import coindeskSuccessfulRequestHandler from './request-handlers/coindesk-request-handler.js';
import coinstatSuccessfulRequestHandler from './request-handlers/coinstat-request-handler.js';
import {
  spinnerDisplayChanger,
  resultSectionDisplayChanger,
  unsuccessfulRequestHandler,
  clearResultsArticle,
} from './request-handlers/shared-scripts.js';
// setting display to none on results section
resultSectionDisplayChanger(false);

// handling the coincap form -- get crypto currency data
const coincapForm = document.getElementById('coincap_form');

coincapForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!coincapForm.checkValidity())
    return alert("Can't make a request with an empty form.");
  try {
    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const coinName = document.getElementById('f1-1').value;

    const res = await fetch(`http://api.coincap.io/v2/assets/${coinName}`);
    const data = await res.json();

    //if the coin wasnt found, the error shall be handled here
    if (data.error)
      return unsuccessfulRequestHandler(`Error 404, coin ${data.error}`);

    coincapSuccessfulResultHandler(data);
  } catch (e) {
    unsuccessfulRequestHandler(
      'An Error occured. Data sent by the server was faulty.'
    );
  }
});

//handling the Coindesk form - get Bitcoins value in certain currency
const coindeskForm = document.getElementById('coindesk_form');

coindeskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (
    !coindeskForm.checkValidity() ||
    document.getElementById('f2-1').value === ''
  )
    return alert("Can't make a request with an empty form.");
  try {
    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const currencySelected = document.getElementById('f2-1').value;

    const res = await fetch(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    const data = await res.json();

    coindeskSuccessfulRequestHandler({
      data,
      currencySelected,
    });
  } catch (e) {
    unsuccessfulRequestHandler(e);
  }
});

//handling coinstats form
const coinstatForm = document.getElementById('coinstats_form');

coinstatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!coindeskForm.checkValidity())
    return alert("Can't make a request with an empty form.");
  try {
    resultSectionDisplayChanger(true);
    clearResultsArticle();
    spinnerDisplayChanger(true);

    const coinName = document.getElementById('f3-1').value;
    const exchangeAmounts = document.querySelector(
      'input[name="amount_of_exchanges"]:checked'
    ).value;

    //making the query string
    const queryObj = {
      coinId: coinName,
    };
    const query = new URLSearchParams(queryObj);

    const res = await fetch(
      `https://api.coinstats.app/public/v1/markets?${query.toString()}`
    );
    const data = await res.json();

    //if the server doesnt find any relevant data, handling the error here
    if (data.length === 0)
      return unsuccessfulRequestHandler(
        `Error 404, coin ${coinName} wasn't found.`
      );

    coinstatSuccessfulRequestHandler(data, exchangeAmounts, coinName);
  } catch (e) {
    unsuccessfulRequestHandler(e);
  }
});
