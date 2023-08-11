import React, { useState, useEffect } from 'react';
import Quote from './Quote';
import './App.css';

function App() {
  const [quote, setQuote] = useState({quote: '', author: ''});
  const [quotesData, setQuotesData] = useState([]); 
  const generateRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
  };


  useEffect(() => {
    fetch('/proxy')
    .then( response => response.json())
    .then (data => {
      setQuotesData(data);
      const randomIndex = generateRandomIndex(data.length)
      console.log(data[randomIndex].q,data[randomIndex].a)
      setQuote({
        quote: data[randomIndex].q,
        author: data[randomIndex].a
      })
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
    })
  }, []);
  
const generateRandomQuote = () => {
  const randomIndex = generateRandomIndex(quotesData.length);
  setQuote({
    quote : quotesData[randomIndex].q,
    author: quotesData[randomIndex].a
  })
}

const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetch('/background-image')
      .then(response => response.json())
      .then(data => {
        setBackgroundImage(data.backgroundImage);
      })
      .catch(error => {
        console.error('Error fetching background image:', error);
      });
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`}}>

      <Quote text={quote.quote} author={quote.author} generateRandomQuote={generateRandomQuote} />
    </div>
  );
}

export default App;
