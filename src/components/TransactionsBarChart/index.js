import {Component} from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from  "recharts"

class TransactionsBarChart extends Component{
    state={barChartData:[]}

    componentDidMount() {
        this.fetchTransactionBarChartData();
      }
    
      componentDidUpdate(prevProps) {
    
        if (this.props.selectedMonth !== prevProps.selectedMonth) {
            console.log('selectedMonth prop changed. Fetching statistics...');
          this.fetchTransactionBarChartData();
        }
    }
    
    fetchTransactionBarChartData = async () => {
        const { selectedMonth } = this.props;
        console.log(selectedMonth)
        const option = {
          method: "GET",
        };
    
        const url = `https://transactionbackend-vhvk.onrender.com/bar-chart/?selectedMonth=${selectedMonth}`;
        try {
          const response = await fetch(url, option);
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          this.setState({ barChartData: data });
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

       DataFormatter = (number) => {
        if (number > 1000) {
          return `${(number / 1000).toString()}k`;
        }
        return number.toString();
      };

    render(){
        const{barChartData}=this.state
        
        return(<div>
            <ResponsiveContainer width="80%" height={400}>
        <BarChart data={barChartData} margin={{ top: 5 }}>
          <XAxis
            dataKey="priceRange"
            tick={{
              stroke: "gray",
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={this.DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="itemCount" name="Item Count" fill="#23ccc4" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
        </div>)
    }
}

export default TransactionsBarChart