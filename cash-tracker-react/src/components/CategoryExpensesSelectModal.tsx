import React, { useState, useEffect } from 'react';
import { CategoryResponse } from '../models/CategoryResponse';
import IncomeService from '../services/IncomeService';
import CategoryService from '../services/CategoryServiсe';

interface CategoryExpensesSelectModalProps {
    onSelect: (categoryId: string, categoryName: string) => void;
    onClose: () => void;
}

const CategoryExpensesSelectModal: React.FC<CategoryExpensesSelectModalProps> = ({ onSelect, onClose }) => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.getExpenseCategories();
                
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Select Category</h2>
                <ul>
                    {categories.map(category => (
                        <li key={category.id} onClick={() => onSelect(category.id, category.name)}>
                            {category.name}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CategoryExpensesSelectModal;
