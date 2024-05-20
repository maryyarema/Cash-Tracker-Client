import React, { useEffect, useState } from 'react';
import IncomeService from '../services/IncomeService';
import { Income } from '../models/Income';

const IncomeList: React.FC = () => {
  const [categories, setIncomes] = useState<Income[]>([]);

  const fetchIncomes = async () => {
      try {
          const res = await IncomeService.getIncomes();
          setIncomes(res.data);
      } catch (err) {
          console.error(err);
      }
  };

  useEffect(() => {
      fetchIncomes();
  }, []);

  return (
      <div>
          <h2>Income</h2>
          <ul>
              {categories.map(income => (
                  <li>{income.amount}{income.categoryId}{income.categoryId}{income.type}</li>
              ))}
          </ul>
      </div>
  );
};

export default IncomeList;