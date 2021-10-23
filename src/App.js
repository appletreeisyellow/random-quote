import React from 'react';
import './App.css';

const quote_url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      text: '',
      author: '',
    }
  }

  componentDidMount() {
    this.fetchQuote()
  }
  
  async fetchQuote() {
    try {
      const response = await fetch(quote_url);
      if (!response.ok) {
        // error
        throw new Error(`HTTP status: ${response.status}`);
      }
      const data = await response.json();
      // initialize first random quote
      const i = this.getRandomQuoteIndex(data.quotes);
      const text = data.quotes[i] ? data.quotes[i].quote : "";
      const author = data.quotes[i] ? data.quotes[i].author : "";
      this.setState({
        quotes: data.quotes,
        text,
        author
      })
    } catch(e) {
      console.log(e);
    }
  }
  
  getRandomQuoteIndex = (quotes) => {
    // generate random number
    const length = quotes.length;
    // randomIndex range from 0 to the length of quotes
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex
  }
  
  handleClick = () => {
    const i = this.getRandomQuoteIndex(this.state.quotes) 
    // set the text and author at this random index
    const text = this.state.quotes[i] ? this.state.quotes[i].quote : "";
    const author = this.state.quotes[i] ? this.state.quotes[i].author : "";
    this.setState({
      text,
      author
    });
  }

  render() {
    // generate a random color
    const color = Math.floor(Math.random() * colors.length)
    return (
      <div id="quote-box">
        <i id="quote-sign" class="fa fa-quote-left" style={{color: colors[color]}}></i>
        <div id="text-container">
          <p id="text" style={{color: colors[color]}}>
             {this.state.text}
          </p>
        </div>
        <p id="author" style={{color: colors[color]}}>
           - {this.state.author}
        </p>
        <button
          id="new-quote"
          style={{
            borderColor: colors[color],
            backgroundColor: colors[color]
          }}
          onClick={this.handleClick}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href="twitter.com/intent/tweet"
          target="_blank">
           Tweet quote
        </a>
      </div>
    );
  }
}

export default App;
