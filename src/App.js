import React, { Component } from 'react';
import './App.css';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
  Pagination, PaginationItem, PaginationLink } from 'reactstrap';
class App extends Component {

  state = {
    currentPage: 1,
    recordsPage: null,
    records: [],
    lastPage: null
  };

  fetchRecords = () => {
    const API_KEY = '07ae8b40-1f8d-11e9-a7c1-350352fecd73';
    return fetch(`https://api.harvardartmuseums.org/object?size=5&page=${this.state.currentPage}&apikey=${API_KEY}`).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong with network request');
    }).then((response) => {
      this.setState({records: response.records,
        lastPage: response.info.pages,
        recordsPage: response.info.page})
    });
  }

  componentDidMount() {
    this.fetchRecords();
  }
  componentDidUpdate() {
    if (this.state.recordsPage !== this.state.currentPage) {
      this.fetchRecords();
    }
  }

  reducePage = () => {
    let currentPage = this.state.currentPage;
    currentPage = (currentPage === 0) ? currentPage : currentPage-1;
    this.setState({currentPage});
  }

  increasePage = () => {
    let currentPage = this.state.currentPage;
    currentPage++;
    this.setState({currentPage});
  }



  render() {
    return (
      <div className="App">
        <Pagination aria-label="Page navigation example">
          <PaginationItem key='prev'>
            <PaginationLink onClick={() => this.reducePage()}>
              Prev
            </PaginationLink>
          </PaginationItem>
          <PaginationItem key='next'>
            <PaginationLink onClick={() => this.increasePage()}>
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        {this.state.records && this.state.records.map(record => (
          <div key={record.classificationid}>
            <Card>
              <CardBody>
                <CardTitle>{record.title}</CardTitle>
                <CardImg top width='100px' src={record.primaryimageurl} alt="Card image cap" />
                <CardSubtitle>Credit Line: {record.creditline}</CardSubtitle>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
