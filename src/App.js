import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerTable from './Components/CustomerTable/CustomerTable';
import CustomerGraph from './Components/CustomerGraph/CustomerGraph';

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
const [selectCustomer, setSelectCustomer] = useState(null);
  async function getCustomers() {
    let { data } = await axios.get("http://localhost:3001/customers");
    setCustomers(data);
    setFilteredCustomers(data);
    setSelectCustomer(data[0])
  }

  async function getTransactions() {
    let { data } = await axios.get("http://localhost:3001/transactions");
    setTransactions(data);
    setFilteredTransactions(data);
  }

  useEffect(() => {
    getCustomers();
    getTransactions();
  }, []);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setFilterType(filter);
    setFilterValue(''); // Reset filter value when filter type changes
    setFilteredTransactions(transactions);
    setFilteredCustomers(customers);
  };

  const handleFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);

    if (filterType === 'customerName') {
      const filteredTrans = transactions.filter(trans => {
        
        const  customer= customers.filter(cust => cust.id == trans.customer_id);
        // console.log(customer[0]);
        return customer[0] && customer[0].name.toLowerCase().includes(value.toLowerCase().trim());
      });
      setFilteredTransactions(filteredTrans);
    } else if (filterType === 'amount') {
      const filteredTrans = transactions.filter(trans => trans.amount.toString().includes(value.trim()));
      setFilteredTransactions(filteredTrans);
    } else {
      setFilteredTransactions(transactions);
    }
  };

const handleRowClick = (customer) => {
  setSelectCustomer(customer)
}

  return (
    <div className="container p-4">
      <div  className='row mt-4 justify-content-center'>
        <div className='col-md-8'>
          <CustomerGraph customer={selectCustomer} transactions={transactions.filter( trans => trans.customer_id == selectCustomer.id)} />
        </div>
      </div>
      <div className="row mb-4 mt-4 justify-content-center">
        <div className="col-2 ">
          <select className="form-select" value={filterType} onChange={handleFilterChange}>
            <option value="">Filter by</option>
            <option value="customerName">Customer Name</option>
            <option value="amount">Transaction Amount</option>
          </select>
        </div>
        <div className="col-4 ">
          <input
            type="text"
            className="form-control"
            placeholder={`Filter by ${filterType || '...'}`}
            value={filterValue}
            onChange={handleFilterValueChange}
            disabled={!filterType}
          />
        
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <CustomerTable customers={filteredCustomers} transactions={filteredTransactions} onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}
