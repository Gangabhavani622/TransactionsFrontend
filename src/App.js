import React, { Component } from "react";
import TransactionsStatistics from "./components/TransactionsStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";
import "./App.css";

class App extends Component {
  state = {
    transactions: [],
    selectedMonth: "03",
    searchText: "",
    currentPage: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { searchText, currentPage, selectedMonth } = this.state;
    const option = {
      method: "GET",
    };
    const url = `https://transactionbackend-vhvk.onrender.com/transactions/?search_q=${searchText}&page=${currentPage}&per_page=10&selectedMonth=${selectedMonth}`;
    try {
      const response = await fetch(url, option);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ transactions: data });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  handleMonthChange = (event) => {
    this.setState(
      { selectedMonth: event.target.value },
      this.fetchData
    );
  };

  handleSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, this.fetchData);
  };

  handleNextPage = () => {
    const { transactions } = this.state;
    if (transactions.length === 10) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1 }),
        this.fetchData
      );
    }
  };

  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState(
        (prevState) => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.fetchData
      );
    }
  };

  render() {
    const { selectedMonth, searchText, transactions, currentPage } = this.state;
    return (
     
           <div className="app">
        <div className="header">
          <h1 className="heading">Transactions Dashboard</h1>
        </div>
        <div className="query-section">
          <input
            type="text"
            placeholder="Search Transaction"
            value={searchText}
            onChange={this.handleSearchChange}
            className="input-element"
          />
          <div>
            <label htmlFor="month" className="label">
              Select Month:
            </label>
            <select
              id="month"
              onChange={this.handleMonthChange}
              value={selectedMonth}
              className="input-element"
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
        <div className="transactions-table-container">
          <h1 className="sub-title">Transaction Table</h1>
          <hr className="hr-line" />
          <table className="table-container">
            <thead className="table-header">
              <tr className="header-row">
                <th className="id">ID</th>
                <th className="title">Title</th>
                <th className="description">Description</th>
                <th className="price">Price</th>
                <th className="category">Category</th>
                <th className="id">Sold</th>
                <th className="image">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="row">
                    <td className="id">{transaction.id}</td>
                    <td className="title">{transaction.title}</td>
                    <td className="description">{transaction.description}</td>
                    <td className="price">{transaction.price}</td>
                    <td className="category">{transaction.category}</td>
                    <td className="id">{transaction.sold}</td>
                    <td className="image">
                      <img
                        src={transaction.image}
                        className="image-ele"
                        alt=""
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="below-container">
            <h1 className="label">Page No:{currentPage}</h1>
            <div>
              <button onClick={this.handlePreviousPage} className="btn">
                Previous
              </button>
              <button onClick={this.handleNextPage} className="btn">
                Next
              </button>
            </div>
            <h1 className="label">Per Page:10</h1>
          </div>
          <div className="sub-section">
            <h1 className="sub-title">Transaction Statistics</h1>
            <hr className="hr-line" />
          </div>
          <TransactionsStatistics selectedMonth={selectedMonth}/>
          <div className="sub-section">
            <h1 className="sub-title">Transactions Bar Chart</h1>
            <hr className="hr-line" />
          </div>
          <TransactionsBarChart selectedMonth={selectedMonth}/>
        </div>
      </div>  
    );
  }
}
export default App;
