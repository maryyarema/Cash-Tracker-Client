import React, { useEffect, useState } from 'react';
import ExpenseService from '../services/ExpenseService';
import { Expense } from '../models/Expense';

const ExpenseList: React.FC = () => {
  const [categories, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
      try {
          const res = await ExpenseService.getExpenses();
          setExpenses(res.data);
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
      fetchExpenses();
  }, []);

  return (
      <div>
          <h2>Expense</h2>
          <ul>
              {categories.map(income => (
                  <li>{income.amount}{income.categoryId}{income.categoryId}{income.type}</li>
              ))}
          </ul>
      </div>
  );
};

export default ExpenseList;