import { createTableRow, spinnerDisplayChanger } from './shared-scripts.js';

const coindeskSuccessfulRequestHandler = ({
  data: dataSentByServer,
  currencySelected: currency,
}) => {
  const resultsArticle = document.getElementById('results_article');
  spinnerDisplayChanger(false);

  const currencyData = dataSentByServer.bpi[currency];

  let tableToDisplay = document.createElement('table');
  //tableToDisplay.setAttribute('class', 'table_of_results');

  const tableRow1 = createTableRow(
    'Price:',
    `${Math.floor(currencyData.rate_float * 100) / 100} ${currencyData.code}`
  );

  tableToDisplay.appendChild(tableRow1);
  resultsArticle.appendChild(tableToDisplay);
};

export default coindeskSuccessfulRequestHandler;
