const quoteContainer = document.getElementById('quote--container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get quote from api
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if author is blanl, add 'unknown'
        if (data.quoteAuthor === '') {
            authorText.innerHTML = 'Unknown'
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }

        // reduce font size for quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerHTML = data.quoteText;

        // stop loader , show quote
        removeLoadingSpinner();
    } catch (error) {
        for (let i = 0; i <= 5; i++) {
            getQuote();
            console.log("this is the error :" + error)
        }
    }
}


// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerHTML;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=' + quote + ' - ' + author;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load
getQuote();
