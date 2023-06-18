const resultSectionDisplayChanger = (toShowOrNot) => {
  const resultsSection = document.getElementById('results_section');
  if (toShowOrNot) {
    resultsSection.style.display = 'block';
  } else {
    resultsSection.style.display = 'none';
  }
};

const spinnerDisplayChanger = (toShowOrNot) => {
  const spinner = document.getElementById('spinner');
  if (toShowOrNot) {
    spinner.style.display = 'block';
  } else {
    spinner.style.display = 'none';
  }
};

const clearResultsArticle = () => {
  const resultsArticle = document.getElementById('results_article');
  while (resultsArticle.firstElementChild) {
    resultsArticle.firstElementChild.remove();
  }
};

const createTableRow = (tableHeaderContent, tableDataContent) => {
  let tableRow = document.createElement('tr');

  let tableHeader = document.createElement('th');
  tableHeader.innerText = tableHeaderContent;

  let tableData = document.createElement('td');
  tableData.innerText = tableDataContent;

  tableRow.appendChild(tableHeader);
  tableRow.appendChild(tableData);

  return tableRow;
};

const unsuccessfulRequestHandler = (error) => {
  const resultsArticle = document.getElementById('results_article');
  clearResultsArticle();
  spinnerDisplayChanger(false);

  let resultsHeader = document.createElement('h4');
  resultsHeader.innerText = 'Bad request!';

  //displaying a certain error if needed
  let resultsParagraphText =
    'Either the request failed because of a connection error or You entered invalid information.';
  if (error) resultsParagraphText = error;
  let resultsParagraph = document.createElement('p');
  resultsParagraph.innerText = resultsParagraphText;

  resultsArticle.appendChild(resultsHeader);
  resultsArticle.appendChild(resultsParagraph);
};

export {
  resultSectionDisplayChanger,
  spinnerDisplayChanger,
  createTableRow,
  unsuccessfulRequestHandler,
  clearResultsArticle,
};
