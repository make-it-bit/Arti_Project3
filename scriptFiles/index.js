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

//reject request handler
const unsuccessfulRequestHandler = (error) => {
    clearResultsArticle();
    spinnerDisplayChanger(false);
    
    let resultsHeader = document.createElement('h4');
    resultsHeader.innerText = 'Bad request!';
    
    let resultsParagraph = document.createElement('p');
    resultsParagraph.innerText = 'Either the request failed because of a connection error or You entered invalid information.'
    
    resultsArticle.appendChild(resultsHeader);
    resultsArticle.appendChild(resultsParagraph);

    //alert(error);
};


// handling the coincap form -- get crypto currency data
const coincapButton = document.getElementById('coincap_form_button');
const coincapForm = document.getElementById('coincap_form');

coincapButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (coincapForm.checkValidity()) {
        console.log("Coincap form called");

        resultSectionDisplayChanger(true);
        clearResultsArticle();
        spinnerDisplayChanger(true);

        const coinName = document.getElementById('f1-1').value;
        fetch(`http://api.coincap.io/v2/assets/${coinName}`)
        .then(result => result.json())
        .then(data => coincapSuccessfulResultHandler(data))
        .catch((err) => unsuccessfulRequestHandler(err)); 
    } else {
        alert("Can't make a request with an empty form.");
    };
});

const coincapSuccessfulResultHandler = (dataSentByServer) => {
    const data = dataSentByServer.data;
    console.log("Adding data to results:", data);

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

//handling the Coindesk form - get Bitcoins value in certain currency
const coindeskFormButton = document.getElementById('coindesk_form_button');
const coindeskForm = document.getElementById('coindesk_form');

coindeskFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (coindeskForm.checkValidity()) {
        console.log("Coindesk form called");

        resultSectionDisplayChanger(true);
        clearResultsArticle();
        spinnerDisplayChanger(true);

        const currencySelected = document.getElementById('f2-1').value;

        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((result) => result.json())
        .then((data) => coindeskSuccessfulRequestHandler(data, currencySelected))
        .catch((error) => unsuccessfulRequestHandler(error));
    } else {
        alert("Can't make a request with an empty form.");
    };
});

const coindeskSuccessfulRequestHandler = (dataSentByServer, currency) => {
    spinnerDisplayChanger(false);
    
    const data = dataSentByServer.bpi[currency];

    let tableToDisplay = document.createElement('table');
    //tableToDisplay.setAttribute('class', 'table_of_results');

    const tableRow1 = createTableRow("Price:", `${Math.floor(data.rate_float * 100) / 100} ${data.code}`);

    tableToDisplay.appendChild(tableRow1);
    resultsArticle.appendChild(tableToDisplay);
};

//handling coinstats form 
const coinstatFormButton = document.getElementById('coinstats_form_button');
const coinstatForm = document.getElementById('coinstats_form');

coinstatFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (coindeskForm.checkValidity()) {
        console.log("Coinstat form called");

        resultSectionDisplayChanger(true);
        clearResultsArticle();
        spinnerDisplayChanger(true);

        const coinName = document.getElementById('f3-1').value;
        const exchangeAmounts = document.querySelector('input[name="amount_of_exchanges"]:checked').value;

        fetch(`https://api.coinstats.app/public/v1/markets?coinId=${coinName}`)
        .then((result) => result.json())
        .then((data) => coinstatSuccessfulRequestHandler(data, exchangeAmounts, coinName))
        .catch((error) => unsuccessfulRequestHandler(error));
    } else {
        alert("Can't make a request with an empty form.");
    };
});

const coinstatSuccessfulRequestHandler = async (dataSentByServer, exchangeAmounts, coinName) => {
    console.log(dataSentByServer);

    //making sure the array returned has items
    if (dataSentByServer.length === 0) {
        unsuccessfulRequestHandler("Crypto currency name invalid");
    };  
    spinnerDisplayChanger(false);

    let resultsHeader = document.createElement('h4');
    resultsHeader.innerText = `${exchangeAmounts} best exchange(s) for ${coinName}`;
    resultsArticle.appendChild(resultsHeader);

    let resultsParagraph = document.createElement('p');
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
            };
            j++;
        };
        dataSentByServer.splice(indexSlicedAt, indexSlicedAt);
        j = 0;
        i++;
    };
    
    //looping them to the table
    i = 0;
    let tableToDisplay = document.createElement('table');
    while (i < arrayWithBestExchanges.length) {
        let tableRow = document.createElement('tr');
        
        let tableHeader = document.createElement('th');
        tableHeader.innerText = `${arrayWithBestExchanges[i].exchange}`;
        tableRow.appendChild(tableHeader);

        let tableData = document.createElement('td');
        tableData.innerText = `Pair: ${arrayWithBestExchanges[i].pair}; Price: ${arrayWithBestExchanges[i].price}`;
        tableRow.appendChild(tableData);

        tableToDisplay.appendChild(tableRow);
        i++
    };
    resultsArticle.appendChild(tableToDisplay);
};
