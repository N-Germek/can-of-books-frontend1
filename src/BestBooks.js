import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import bookImg from './libraryImage.jpg';
import axios from 'axios';
import { Container } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  componentDidMount = async () => {
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: './books'
      }

      const response = await axios(config);
      this.setState({
        books: response.data
      })
    } catch (error) {
      console.error('Error in BestBooks componentDidMount', error);
      this.setState({
        errorMessage: `Status Code: ${error.response.status}: ${error.response.data}`
      })
    }
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Container>

          {this.state.books.length ? (
            <Carousel id="carousel">
              {this.state.books.map(book => (
                <Carousel.Item key={book.title}>
                  <Image id="carousel-image"
                    className="w-100"
                    src={bookImg}
                    alt={book.title}
                  />
                  <Carousel.Caption id="carousel-text-box">
                    <h2>Library Carousel</h2>
                    <p className="carousel-text">{book.title}</p>
                    <p className="carousel-text">{book.description}</p>
                    <p className="carousel-text">Status: {book.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h3>No Books Found :(</h3>
          )}
        </Container>
      </>
    )
  }
}

export default BestBooks;
