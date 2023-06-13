import { createTableRow, spinnerDisplayChanger, unsuccessfulRequestHandler, clearResultsArticle } from "./shared-scripts.js";

const coinstatSuccessfulRequestHandler = async (
    dataSentByServer,
    exchangeAmounts,
    coinName
    ) => {
    try {
        const resultsArticle = document.getElementById("results_article");
      //making sure the array returned has items
      if (dataSentByServer.length === 0) {
        unsuccessfulRequestHandler("Crypto currency name invalid");
      }
      spinnerDisplayChanger(false);
  
      let resultsHeader = document.createElement("h4");
      resultsHeader.innerText = `${exchangeAmounts} best exchange(s) for ${coinName}`;
      resultsArticle.appendChild(resultsHeader);
  
      let resultsParagraph = document.createElement("p");
      resultsParagraph.innerText = 'Various trading pairs, "unrelative value"';
      resultsArticle.appendChild(resultsParagraph);
  
      const arrayWithBestExchanges = [];
  
      let indexSlicedAt = 0;
      let i = 0;
      let j = 0;
  
      while (i < exchangeAmounts) {
        arrayWithBestExchanges[i] = dataSentByServer[j];
        while (j < dataSentByServer.length) {
          if (arrayWithBestExchanges[i].price > dataSentByServer[j].price) {
            arrayWithBestExchanges[i] = dataSentByServer[j];
            indexSlicedAt = j;
          }
          j++;
        }
        dataSentByServer.splice(indexSlicedAt, indexSlicedAt);
        j = 0;
        i++;
      }
  
      //looping them to the table
      i = 0;
      let tableToDisplay = document.createElement("table");
      while (i < arrayWithBestExchanges.length) {
        let tableRow = document.createElement("tr");
  
        let tableHeader = document.createElement("th");
        tableHeader.innerText = `${arrayWithBestExchanges[i].exchange}`;
        tableRow.appendChild(tableHeader);
  
        let tableData = document.createElement("td");
        tableData.innerText = `Pair: ${arrayWithBestExchanges[i].pair}; Price: ${arrayWithBestExchanges[i].price}`;
        tableRow.appendChild(tableData);
  
        tableToDisplay.appendChild(tableRow);
        i++;
      }
      resultsArticle.appendChild(tableToDisplay);
    } catch (e) {
      unsuccessfulRequestHandler(e);
    };
};

export default coinstatSuccessfulRequestHandler;