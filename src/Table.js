import React from 'react';
import './Table.css';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewData: [],
      numOfReviews: 0,
      count: 0
    }
  }

  fetchFirstTenReviews() {
    const fetchReviewData = async () => {
      await fetch("reviews.json").then(res => res.json()).then(reviews => {
        console.log(reviews); // array of response objects

        this.setState({ numOfReviews: reviews.length });

        reviews.slice(0, 10).forEach(review => {
          this.setState({ reviewData: [...this.state.reviewData, review] });
        });

        this.setState({ count: this.state.count + 1 });

      });

      console.log(this.state.reviewData.length);
      console.log("!!!!!!");
      console.log(this.state.count);
      console.log(this.state.numOfReviews);
    }

    fetchReviewData();
  }

  fetchMoreReviews() {
    const fetchMoreReviewData = async () => {
      await fetch("reviews.json").then(res => res.json()).then(reviews => {

        this.setState({ numOfReviews: reviews.length });

        reviews.slice(10 * this.state.count, 10 * (this.state.count + 1)).forEach(review => {
          this.setState({ reviewData: [...this.state.reviewData, review] });
        });

        this.setState({ count: this.state.count + 1 });
      });
    }

    if (this.state.count <= Math.ceil(this.state.numOfReviews / 10)) {
      fetchMoreReviewData();
    }
  }

  componentDidMount() {
    this.fetchFirstTenReviews();
  }

  renderTableHeader() {
    return (
      <tr>
        <td>Rating</td>
        <td>Review Title</td>
        <td>Review Text</td>
        <td>Customer Name</td>
      </tr>
    )
  }

  renderTableRow() {
    return this.state.reviewData.map((review, index) => {
      const { "RATING": RatingNumber, "REVIEW_TITLE": ReviewTitle, "REVIEW_TEXT": ReviewText, "CUSTOMER_NAME": CustomerName } = review;
      return (
        <tr key={index}>
          <td>{RatingNumber}</td>
          <td>{ReviewTitle}</td>
          <td>{ReviewText}</td>
          <td>{CustomerName}</td>
        </tr>
      )
    })
  }

  renderLoadMoreButton() {
    return (
      <a onClick={() => this.fetchMoreReviews()}>load more</a>
    )
  }

  sortByLowestRating() {

    // let myData = [...this.state.reviewData];
    // // let myData = [].concat(this.state.reviewData);

    // this.setState({reviewData: []});
    // this.state.reviewData.length = 0;

    const myData = [].concat(this.state.reviewData).sort((a, b) => a.RATING - b.RATING);

    console.log("@@@@@@@@");
    console.log(myData);
    console.log(myData.length);

    this.setState({ reviewData: myData });

  }

  sortByHighestRating() {
    const myData = [].concat(this.state.reviewData).sort((a, b) => b.RATING - a.RATING);
    this.setState({ reviewData: myData });
  }

  sortByNewest() {
    const myData = [].concat(this.state.reviewData).sort((a, b) => { return new Date(b.SUBMISSION_DATE) - new Date(a.SUBMISSION_DATE); });
    this.setState({ reviewData: myData });
  }

  renderDropdown1() {
    return (
      // <select>
      //   <option value="">--sort by: --</option>
      //   <option value="">highest rating</option>
      //   <option value="">lowest rating</option>
      //   <option value="">newest</option>
      // </select>

      <a onClick={() => this.sortByLowestRating()}>lowest rating</a>
    )
  }

  renderDropdown2() {
    return (
      <a onClick={() => this.sortByHighestRating()}>highest rating</a>
    )
  }

  renderDropdown3() {
    return (
      <a onClick={() => this.sortByNewest()}>newest</a>
    )
  }

  render() {
    return (
      <div>
        <table class='product-reviews'>
          <tbody>
            {this.renderTableHeader()}
            {this.renderTableRow()}
          </tbody>
        </table>

        <br />
        {this.renderLoadMoreButton()}
        <br /><br />
        <h4>sort by: </h4>
        {this.renderDropdown1()}
        <br /><br />
        {this.renderDropdown2()}
        <br /><br />
        {this.renderDropdown3()}
      </div>
    )
  }
}

export default Table;