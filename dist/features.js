var columnDefs = [
    // this row just shows the row index, doesn't use any data from the row
    {
        headerName: "Id",
        width: 40,
        suppressMenu: true,
        suppressSorting: true,
        cellStyle: {
            paddingLeft: '10px'
        },
        cellRenderer: function(params) {
            return params.node.id + 1;
        }

    }, {
        headerName: '#',
        width: 30,
        checkboxSelection: true,
        suppressSorting: true,
        suppressMenu: true
    }, {
        headerName: "Name",
        field: "Name",
        width: 350,
        sort: 'asc',
        cellStyle: {
            paddingLeft: '20px'
        }
    }, {
        headerName: "City",
        field: "City",
        width: 300,
        cellStyle: {
            paddingLeft: '20px'
        }
    }, {
        headerName: "Country",
        field: "Country",
        width: 300,
        cellStyle: {
            paddingLeft: '20px'
        }
    }
];

var pageSize = 15;

var gridOptions = {
    enableSorting: true,
    enableFilter: true,
    debug: true,
    rowSelection: 'multiple',
    enableColResize: true,
    columnDefs: columnDefs,
    rowModelType: 'pagination'
};

// Resizing Columns  
function sizeToFit() {
    gridOptions.api.sizeColumnsToFit();
}

function autoSizeAll() {
    var allColumnIds = [];
    columnDefs.forEach(function(columnDef) {
        allColumnIds.push(columnDef.field);
    });
    gridOptions.columnApi.autoSizeColumns(allColumnIds);
}

//  Select All
function selectAll() {
    gridOptions.api.selectAll();
}

//  Deselect All
function deselectAll() {
    gridOptions.api.deselectAll();
}

//  Hide Country
function hideCountry() {
    gridOptions.columnApi.hideColumn('Country', true);
}

//  Show Country
function showCountry() {
    gridOptions.columnApi.hideColumn('Country', false);
}


//  Search
function onFilterChanged(value) {
    gridOptions.api.setQuickFilter(value);
}

function onPageSizeChanged(newPageSize) {
    pageSize = new Number(newPageSize);
    createNewDatasource();
}

// when json gets loaded, it's put here, and  the datasource reads in from here.
// in a real application, the page will be got from the server.
var allOfTheData;

function createNewDatasource() {
    if (!allOfTheData) {
        // in case user selected 'onPageSizeChanged()' before the json was loaded
        return;
    }

    var dataSource = {
        //rowCount: ???, - not setting the row count, infinite paging will be used
        pageSize: pageSize, // changing to number, as scope keeps it as a string
        getRows: function(params) {
            // this code should contact the server for rows. however for the purposes of the demo,
            // the data is generated locally, a timer is used to give the experience of
            // an asynchronous call
            console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            setTimeout(function() {
                // take a chunk of the array, matching the start and finish times
                var rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
                // see if we have come to the last page. if we have, set lastRow to
                // the very last row of the last page. if you are getting data from
                // a server, lastRow could be returned separately if the lastRow
                // is not in the current page.
                var lastRow = -1;
                if (allOfTheData.length <= params.endRow) {
                    lastRow = allOfTheData.length;
                }
                params.successCallback(rowsThisPage, lastRow);
            }, 100);
        }
    };

    gridOptions.api.setDatasource(dataSource);
}

function setRowData(rowData) {
    allOfTheData = rowData;
    createNewDatasource();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://www.w3schools.com/website/Customers_MYSQL.php');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResponse = JSON.parse(httpRequest.responseText);
            setRowData(httpResponse);
        }
    };
});
