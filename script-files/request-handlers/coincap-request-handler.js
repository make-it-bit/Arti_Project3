import {
  createTableRow,
  spinnerDisplayChanger,
  unsuccessfulRequestHandler,
} from './shared-scripts.js';

const coincapSuccessfulResultHandler = (dataSentByServer) => {
  const resultsArticle = document.getElementById('results_article');
  const data = dataSentByServer.data;

  spinnerDisplayChanger(false);

  //adding a header
  let resultsHeader = document.createElement('h4');
  resultsHeader.innerText = `${data.name} (${data.symbol})`;
  resultsArticle.appendChild(resultsHeader);

  //adding a table
  let tableToDisplay = document.createElement('table');
  tableToDisplay.setAttribute('class', 'table_of_results');

  //adding rows
  const tableRow1 = createTableRow(
    'Price',
    `${Math.floor(data.priceUsd * 100) / 100} USD`
  );
  tableToDisplay.appendChild(tableRow1);

  const tableRow2 = createTableRow(
    'Supply',
    `${Math.floor(data.supply)} ${data.symbol}`
  );
  tableToDisplay.appendChild(tableRow2);

  const tableRow3 = createTableRow(
    'Price change',
    `${Math.round(data.changePercent24Hr * 1000) / 1000}%`
  );
  tableToDisplay.appendChild(tableRow3);

  resultsArticle.appendChild(tableToDisplay);
};

export default coincapSuccessfulResultHandler;
