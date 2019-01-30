import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    articles: []
  }

 renderedList = () => {
   this.state.articles.map()
 }

handleScrape = e => {
  e.preventDefault();
  axios.get ("/scrape").then((data) => {
    console.log(data);
    this.setState({
      articles: data.data
    })
  })
}
// . map through this.state.data

  render() {
    return (
      <div>
        {this.renderedList}
        <button onClick="handleScrape">scrape</button>


      </div>
    );
  }
}

export default App;
