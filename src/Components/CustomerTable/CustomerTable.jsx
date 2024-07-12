import React from 'react';

export default function CustomerTable({ customers, transactions,onRowClick }) {
  return (
    <div>
      {customers.length > 0 && transactions.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr className="table-secondary">
              <th>Name</th>
              <th>Status</th>
              <th>Method</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(trans => {
           
             const  customer= customers.filter(cust => cust.id == trans.customer_id);

              return (
                <tr key={trans.id} onClick={() => onRowClick(customer[0])}>
                  <td>{customer[0].name}</td>
                  <td>{trans.status}</td>
                  <td>{trans.method}</td>
                  <td>{trans.date}</td>
                  <td>${trans.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-5x text-white"></i>
        </div>
      )}
    </div>
  );
}
