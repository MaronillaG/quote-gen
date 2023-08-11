import React from 'react';

function Quote({text, author, generateRandomQuote}) {
    return (
        <div id='quote-box'>
            <p className='text' id='text'>{text}</p>
            <p className='author' id='author'>- {author}</p>
            <div className='btn-container'>
                <button id='new-quote' className='btn' onClick={generateRandomQuote}>New Quote</button>
                <a 
                    href={`https://twitter.com/intent/tweet?text=${text}` }
                    target='_blank'
                    rel = "noopener noreferrer"
                    className='btn'>
                    Tweet
                </a>
            </div>
        </div>
    )
}

export default Quote;

