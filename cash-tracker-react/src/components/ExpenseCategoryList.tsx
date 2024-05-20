import React, { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryServiсe';
import { CategoryResponse } from '../models/CategoryResponse';

const ExpenseCategoryList: React.FC = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    const fetchCategories = async () => {
        try {
            const res = await CategoryService.getExpenseCategories();
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Expense Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseCategoryList;