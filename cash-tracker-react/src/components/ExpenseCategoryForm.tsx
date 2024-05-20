import React, { useState } from 'react';
import CategoryService from '../services/CategoryServiсe';

interface ExpenseCategoryFormProps {
  onCategoryAdded: () => void;
}

const ExpenseCategoryForm: React.FC<ExpenseCategoryFormProps> = ({ onCategoryAdded }) => {
  const [name, setName] = useState<string>('');

  const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await CategoryService.addExpenseCategory(name);
          setName('');
          onCategoryAdded();
      } catch (err) {
          console.error(err);
      }
  };

  return (
      <form onSubmit={onSubmit}>
          <div>
              <label>Expense Category Name</label>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
          </div>
          <button type="submit">Add Expense Category</button>
      </form>
  );
};

export default ExpenseCategoryForm;