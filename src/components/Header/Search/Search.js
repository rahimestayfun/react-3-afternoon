import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
  }
  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };
  handleSearch = () => {
    const { searchInput } = this.state;
    this.props.filterPostFn(searchInput);
    this.setState({ searchInput: "" });
    // console.log(searchInput)
  };

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            placeholder="Search Your Feed"
            value={this.state.searchInput}
            onChange={this.handleSearchInput}
          />

          <SearchIcon id="Search__icon" onClick={() => this.handleSearch()} />
        </div>
      </section>
    );
  }
}
