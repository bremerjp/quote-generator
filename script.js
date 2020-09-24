const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote

function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author field is blank and replace with unknow
  if (quote.author) {
    authorText.innerText = `-${quote.author}`;
  } else {
    authorText.innerText = "-Unknown";
  }

  //check quote length to determine styling

  if (quote.text.length > 75) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote, hide loader
  quoteText.innerText = quote.text;
  complete();
}

// Get quote from API

async function getQuotes() {
  loading();
  const API_URL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(API_URL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuote();
    console.log("No quote found", error);
  }
}

// Tweet a quote

function tweetQuote() {
  const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
  window.open(TWITTER_URL, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load

getQuotes();
