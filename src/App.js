import { useState, useEffect } from 'react';
import firebase from './firebase.js'
import './App.css';

function App() {
  // storing our books into an array when we pull the book data out of the firebase data base
  // const [value, setValue] = useState();
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState('');

  // this function will store info about what the user is typing into the input
  // and will update our userInput state
  const handleChange = (event) => {
    // console.log(event.target.value);

    // the target of the event is the input field because we've also added onChange={handleChange} to the input in our JSX 
    setUserInput(event.target.value)
  }

  // this function is going to handle pushing the new books to firebase
  const handleClick = (event) => {
    // prevent the page from reloading
    event.preventDefault();
    // it will now console log 'clicked' because we've passed onClick={handleClick} to the button in JSX
    // console.log('clicked')

    // reference the database
    const dbRef = firebase.database().ref()
    // grab the userInput and push it to our database
    dbRef.push(userInput);

    // clear the input after the user clicks submit
    setUserInput('')

  }

  // this function will remove the book from the page and from our database
  const removeBook = (bookId) => {
    const dbRef = firebase.database().ref()

    // get the child of the database with the bookId
    // bookId will be whatever book is clicked on
    // remove that specific book using the firebase remove() method
    dbRef.child(bookId).remove()
  }

  useEffect(() => {
    // reference to firebase database
    const dbRef = firebase.database().ref()

    // .on() is the event listener that will fire everytime there's a change to the database
    dbRef.on('value', (response) => {
      // use this console log to check if it's getting your data from firebase. update your firebase to see make sure it's tracking the changes.
      // console.log(response.val());
      // then store it in a variable 
      const data = response.val();
      const newState = [];

      // use for in to loop through the data 
      // this loop will go through the data object
      // then push each book title into the newState array
      for (let key in data) {
        // this gets the value of the keys
        // keys = book1, book2, book3, book4....
        // data[key] = the value of those books (catcher in the rye, etc)
        // console.log(data[key]);
        // push the name of the books into our newState array

        // we changed newState.push(data[key]) to the below
        newState.push({key: key, name: data[key]});
        // the original array was only pushing strings into the array 
        // in order to be able to delete books from the list, we need a book ID 
        // so what we've done is we've turned the array into an array where every book is new object that has it's own unique key
      }

      // update state with setBooks and the newState array
      setBooks(newState);

    })
  }, []);

  return (
    <div className="App">
    <ul>
      {/* this is the JSX for how we're going to display the books on the page */}
      {
        books.map(book => {
          return (
            // passing the removeBook function
            <li key={book.key}><button onClick={() => removeBook(book.key)}>&times;</button>{book.name}</li>
          )
        })
      }
    </ul>
    <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input type="text" id="newBook" onChange={handleChange} value={userInput}/>
        <button onClick={handleClick}>Add Book</button>
    </form>
    </div>
  );
}

export default App;
