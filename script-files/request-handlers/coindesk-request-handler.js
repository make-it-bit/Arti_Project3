import { createTableRow, spinnerDisplayChanger, unsuccessfulRequestHandler, clearResultsArticle } from "./shared-scripts.js";

const coindeskSuccessfulRequestHandler = (dataSentByServer, currency) => {
    try {
      const resultsArticle = document.getElementById("results_article");
      spinnerDisplayChanger(false);
  
      const data = dataSentByServer.bpi[currency];
  
      let tableToDisplay = document.createElement("table");
      //tableToDisplay.setAttribute('class', 'table_of_results');
  
      const tableRow1 = createTableRow(
        "Price:",
        `${Math.floor(data.rate_float * 100) / 100} ${data.code}`
      );
  
      tableToDisplay.appendChild(tableRow1);
      resultsArticle.appendChild(tableToDisplay);
    } catch (e) {
      unsuccessfulRequestHandler(e);
    };
};

export default coindeskSuccessfulRequestHandler;