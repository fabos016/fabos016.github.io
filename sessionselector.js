function switchPagesInitial(page, rowData) {
    sessionStorage.setItem("storedArr", JSON.stringify(rowData));

    switchPages(page);
}

function switchPages(page) {
    window.location.href = page;
}

var columnNames = ["Date", "Time", "Gym", "Class Capacity", "Class Type", "Trainer Name", "MMA Type"];

var activeHeader;

//Triggered by click on a column header/button
function sortColumn(index, tableData) {
    //Display which way sort
    if (activeHeader != index && activeHeader != null) {
        columnNames[activeHeader] = columnNames[activeHeader].slice(0, -2);
    }
    if (columnNames[index].slice(-1) == 'v') {
        columnNames[index] = columnNames[index].slice(0, -1) + '^';

        //Sort array ascending
        tableData.sort((a, b) => a[index].localeCompare(b[index]));
    } else {
        if (columnNames[index].slice(-1) == '^') {
            columnNames[index] = columnNames[index].slice(0, -1) + 'v';
        } else {
            columnNames[index] += ' v';
        }

        //Sort array descending
        tableData.sort((a, b) => b[index].localeCompare(a[index]));
    }

    activeHeader = index;

    createTable(tableData, true);
}

//Convert selected row into array
function selectSession(page, row) {
    var rowData = [];

    for (var i = 0; i < row.children.length; i++) {
        rowData.push(row.children[i].innerHTML);
    }

    switchPagesInitial(page, rowData);
}

function createTable(tableData, listenerNeeded) {
    //Update column rows
    var htmlCol = "";
    for (i = 0; i < columnNames.length; i++) {
        //Each table header is clickable
        if (listenerNeeded) {
            htmlCol += `<th scope="col" onclick="sortColumn(${i}, tableData)" style="cursor: pointer;">${columnNames[i]}</th>`;
        } else {
            htmlCol += `<th scope="col">${columnNames[i]}</th>`;
        }
    }

    var refHeader = document.getElementById("headerNames");
    refHeader.innerHTML = htmlCol;

    //Update table data
    var rowHTML = "";
    for (i = 0; i < tableData.length; i++) {
        if (listenerNeeded) {
            rowHTML += `<tr onclick="selectSession('booksession1.html', this)" style="cursor: pointer;">`;
        } else {
            rowHTML += `<tr>`;
        }
        
        //Add row
        for (j = 0; j < columnNames.length; j++) {
            rowHTML += `<td>${tableData[i][j]}</td>`;
        }
    }

    document.getElementById("tableRows").innerHTML = rowHTML;
}

function createTableCarryover() {
    var tableData = [];
    tableData.push(JSON.parse(sessionStorage.getItem("storedArr")));

    //Update column rows
    var htmlCol = "";
    for (i = 0; i < columnNames.length; i++) {
        htmlCol += `<th scope="col">${columnNames[i]}</th>`;
    }

    var refHeader = document.getElementById("headerNames");
    refHeader.innerHTML = htmlCol;

    //Update table data
    var rowHTML = "";
    for (i = 0; i < tableData.length; i++) {
        rowHTML += `<tr>`;

        //Add row
        for (j = 0; j < columnNames.length; j++) {
            rowHTML += `<td>${tableData[i][j]}</td>`;
        }
    }

    document.getElementById("tableRows").innerHTML = rowHTML;
}