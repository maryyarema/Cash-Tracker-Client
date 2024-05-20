import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeCategoryForm from '../components/IncomeCategoryForm';
import IncomeCategoryList from '../components/IncomeCategoryList';
import ExpenseCategoryList from '../components/ExpenseCategoryList';
import ExpenseCategoryForm from '../components/ExpenseCategoryForm';
import './CategoryPage.css';

const AddCategoryPage: React.FC = () => {
    const [incomeCategoriesUpdated, setIncomeCategoriesUpdated] = useState(0);
    const [expenseCategoriesUpdated, setExpenseCategoriesUpdated] = useState(0);
    const navigate = useNavigate();

    const handleIncomeCategoryAdded = () => {
        setIncomeCategoriesUpdated(prev => prev + 1);
    };

    const handleExpenseCategoryAdded = () => {
        setExpenseCategoriesUpdated(prev => prev + 1);
    };

    return (

        <div className="category-page">
            <h1>Income Categories</h1>
            <IncomeCategoryForm onCategoryAdded={handleIncomeCategoryAdded} />
            <IncomeCategoryList key={`income-${incomeCategoriesUpdated}`} />
            <button onClick={() => navigate('/incomes')}>Add Income</button>
            <h1>Expense Categories</h1>
            <ExpenseCategoryForm onCategoryAdded={handleExpenseCategoryAdded} />
            <ExpenseCategoryList key={`expense-${expenseCategoriesUpdated}`} />
            <button onClick={() => navigate('/expenses')}>Add Expense</button>
        </div>
    );
};

export default AddCategoryPage;
