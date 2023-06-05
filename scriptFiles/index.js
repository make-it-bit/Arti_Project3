// setting display to none on results section
const resultsSection = document.getElementById('results_section');

const resultSectionDisplayChanger = (toShowOrNot) => {
    if (toShowOrNot) {
        resultsSection.style.display = 'block';
    } else {
        resultsSection.style.display = 'none';
    };
};
resultSectionDisplayChanger(false);

//adding other display/etc handlers
const spinner = document.getElementById('spinner');

const spinnerDisplayChanger = (toShowOrNot) => {
    if (toShowOrNot) {
        spinner.style.display = 'block';
    } else {
        spinner.style.display = 'none';
    };
};

const resultsArticle = document.getElementById('results_article');

const clearResultsArticle = () => {
    while(resultsArticle.firstElementChild) {
        resultsArticle.firstElementChild.remove();
    };
};

//table row creater

const createTableRow = (tableHeaderContent, tableDataContent) => {
    let tableRow = document.createElement('tr');

    let tableHeader = document.createElement('th');
    tableHeader.innerText = tableHeaderContent;

    let tableData = document.createElement('td');
    tableData.innerText = tableDataContent

    tableRow.appendChild(tableHeader);
    tableRow.appendChild(tableData);

    return tableRow;
};

// handling the coincap form
const coincapButton = document.getElementById('coincap_form_button');
const coincapForm = document.getElementById('coincap_form');

coincapButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (coincapForm.checkValidity()) {
        console.log("Coincap form called");

        resultSectionDisplayChanger(true);
        spinnerDisplayChanger(true);

        const coinName = document.getElementById('f1-1').value;
        fetch(`http://api.coincap.io/v2/assets/${coinName}`)
        .then(result => result.json())
        .then(data => coincapSuccessfulResultHandler(data))
        .catch(err => console.log(err)); 
    };
});

const coincapSuccessfulResultHandler = (dataSentByServer) => {
    const data = dataSentByServer.data;
    console.log("Adding data to results:", data);

    clearResultsArticle();
    spinnerDisplayChanger(false);

    //adding a header 
    let resultsHeader = document.createElement('h4');
    resultsHeader.innerText = `${data.name} (${data.symbol})`;
    resultsArticle.appendChild(resultsHeader);

    //adding a table
    let tableToDisplay = document.createElement('table');
    tableToDisplay.setAttribute('class', 'table_of_results');

    //adding rows
    const tableRow1 = createTableRow('Price', `${Math.floor(data.priceUsd * 100) / 100} USD`);
    tableToDisplay.appendChild(tableRow1);

    const tableRow2 = createTableRow('Supply', `${Math.floor(data.supply)} ${data.symbol}`)
    tableToDisplay.appendChild(tableRow2);

    const tableRow3 = createTableRow('Price change', `${Math.round(data.changePercent24Hr * 1000) / 1000}%`);
    tableToDisplay.appendChild(tableRow3);

    resultsArticle.appendChild(tableToDisplay);
};

