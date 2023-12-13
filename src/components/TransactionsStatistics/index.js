import { Component } from "react";
import "./index.css";

class TransactionsStatistics extends Component {
  state = {
    statistics: {},
  };

  componentDidMount() {
    this.fetchTransactionStatistics();
  }

  componentDidUpdate(prevProps) {

    if (this.props.selectedMonth !== prevProps.selectedMonth) {
        console.log('selectedMonth prop changed. Fetching statistics...');
      this.fetchTransactionStatistics();
    }
}

  fetchTransactionStatistics = async () => {
    const { selectedMonth } = this.props;
    console.log(selectedMonth)
    const option = {
      method: "GET",
    };

    const url = `https://transactionbackend-vhvk.onrender.com/statistics/?selectedMonth=${selectedMonth}`;
    try {
      const response = await fetch(url, option);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ statistics: data });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  render() {
    const { statistics } = this.state;
    const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = statistics;
    return (
      <div className="statistics-section">
        <div className="contatiner-ele">
          <h1 className="statistics-label">Total sale</h1>
          <p className="statistics-value">{totalSaleAmount}</p>{" "}
        </div>
        <div className="contatiner-ele">
          <h1 className="statistics-label">Total sold item</h1>
          <p className="statistics-value">{totalSoldItems}</p>
        </div>
        <div className="contatiner-ele">
          <h1 className="statistics-label">Total not sold item</h1>
          <p className="statistics-value">{totalNotSoldItems}</p>{" "}
        </div>
      </div>
    );
  }
}

export default TransactionsStatistics;
