import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  state = {
    articles: [],
    loading: false,
    page: 1,
  };

  async fetchNews(searchTerm = "") {
    const { country, category, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b4328ef44e0c431591b6e2c4128abbaf&page=1&pageSize=${pageSize}`;

    if (searchTerm) {
      url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=b4328ef44e0c431591b6e2c4128abbaf&page=1&pageSize=${pageSize}`;
    }

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchNews();
    }
  }

  handlePrevClick = async () => {
    const { country, category, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b4328ef44e0c431591b6e2c4128abbaf&page=${
      this.state.page - 1
    }&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    const { country, category, pageSize } = this.props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b4328ef44e0c431591b6e2c4128abbaf&page=${
      this.state.page + 1
    }&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    const { articles, page, totalResults, loading } = this.state;

    return (
      <div className="container my-3">
        <h2>Latest Headlines</h2>
        {loading && <Spinner />}
        <div className="row">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={
                    !element.title
                      ? ""
                      : element.title.length < 40
                      ? element.title
                      : element.title.slice(0, 40)
                  }
                  description={
                    !element.description
                      ? ""
                      : element.description.length < 80
                      ? element.description
                      : element.description.slice(0, 80)
                  }
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://imgs.search.brave.com/f1LPmkaa1gwcpIxox1c_eA1Yr0EvIJ915OgrUORnIXo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5saWNkbi5jb20v/ZG1zL2ltYWdlL0M0/RDEyQVFGQ3o1dTNk/MlhRWkEvYXJ0aWNs/ZS1jb3Zlcl9pbWFn/ZS1zaHJpbmtfNzIw/XzEyODAvMC8xNTg4/OTE5MTIxMjA5P2U9/MjE0NzQ4MzY0NyZ2/PWJldGEmdD1zbzc2/TnZ1ZS1xNlNwdmI4/V1ZFTG5XYVhWdGhj/enVQRGVPNXptc3VP/R1ZR"
                  }
                  newsurl={element.url}
                />
              </div>
            ))}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={page <= 1}
              onClick={this.handlePrevClick}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={page + 1 > Math.ceil(totalResults / 20)}
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
