
// $(document).ready(function(){
//     const settings = {
//         async: true,
//         crossDomain: true,
//         url: 'https://coingecko.p.rapidapi.com/simple/price?include_last_updated_at=true&include_market_cap=true&ids=ethereum&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true',
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': 'd7bb067274msh43e912162880965p1e7933jsn45e0ff9ff95e',
//             'x-rapidapi-host': 'coingecko.p.rapidapi.com'
//         }
//     };

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//     });
// }) 
$(document).ready(function () {

    $.getJSON('https://api.coincap.io/v2/assets', function (data) {
        const coins = data.data;
        const filteredCoins = coins.filter(coin => ['bitcoin', 'ethereum', 'litecoin'].includes(coin.id));
        $.each(filteredCoins, function (coin) {
            const coins = data.data;


            const btc = coins.find(coin => coin.id === 'bitcoin');
            const eth = coins.find(coin => coin.id === 'ethereum');
            const ltc = coins.find(coin => coin.id === 'litecoin');


            if (btc) {
                $('#btc_name').text(`${btc.name}`);
                //$('#btc_symbol').text(`(${btc.symbol})`)
                $('#btc_price').text(`$${parseFloat(btc.priceUsd).toFixed(2)}`);
            }


            if (eth) {
                $('#eth_name').text(`${eth.name}`);
                // $('#eth_symbol').text(`(${eth.symbol})`)
                $('#eth_price').text(`$${parseFloat(eth.priceUsd).toFixed(2)}`);
            }


            if (ltc) {
                $('#ltc_name').text(`${ltc.name}`);
                //$('#ltc_symbol').text(`(${ltc.symbol})`)
                $('#ltc_price').text(`$${parseFloat(ltc.priceUsd).toFixed(2)}`);
            }
        });
    }).fail(function () {
        console.error('Error fetching data from CoinCap API');
    });
});

// BTC Converter
$(document).ready(function () {
    let btcToUsdRate = 0;

    function fetchRate() {
        $.ajax({
            url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
            type: 'GET',
            success: function (data) {
                btcToUsdRate = data.bitcoin.usd;
            },
            error: function () {
                $('#usdAmount').val('Failed to fetch rate');
            }
        });
    }


    fetchRate();


    setInterval(fetchRate, 60000);


    $('#btcAmount').on('input', function () {
        let btcAmount = parseFloat($(this).val());

        if (isNaN(btcAmount) || btcAmount <= 0) {
            $('#usdAmount').val('');
            return;
        }

        let convertedAmount = btcAmount * btcToUsdRate;
        $('#usdAmount').val(convertedAmount.toFixed(2));
    });
});


// market

function getUrl(start = 0) {
    return `https://api.coinlore.com/api/tickers/?start=${start}`;
}

function getData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataIntoTable(data))
        .catch(err => console.error(err));
}

function loadDataIntoTable(data) {
    const tableBody = document.getElementById('crypto-table-body');
    tableBody.innerHTML = ''; // Clear the table body

    data.data.forEach((coin) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.rank}</td>
            <td>${coin.name} (${coin.symbol})</td>
            <td>$${coin.price_usd}</td>
            <td class="${coin.percent_change_24h > 0 ? 'green-text' : 'red-text'}">${coin.percent_change_24h}%</td>
            <td>$${coin.market_cap_usd}</td>
            <td>$${coin.volume24}</td>
        `;
        tableBody.appendChild(row);
    });
}
 
function init() {
    const url = getUrl();
    getData(url);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toUpperCase();
    const rows = document.querySelectorAll('#crypto-table-body tr');

    rows.forEach(row => {
        const coinName = row.cells[1].textContent || row.cells[1].innerText;
        const coinID = row.cells[0].textContent || row.cells[0].innerText;
        if (coinName.toUpperCase().indexOf(filter) > -1 || coinID.indexOf(filter) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Run the init function to load the data when the page loads
init();

 