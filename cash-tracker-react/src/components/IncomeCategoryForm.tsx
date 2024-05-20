import React, { useState } from 'react';
import CategoryService from '../services/CategoryServiсe';

interface IncomeCategoryFormProps {
    onCategoryAdded: () => void;
}

const IncomeCategoryForm: React.FC<IncomeCategoryFormProps> = ({ onCategoryAdded }) => {
    const [name, setName] = useState<string>('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await CategoryService.addIncomeCategory(name);
            setName('');
            onCategoryAdded();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Income Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <button type="submit">Add Income Category</button>
        </form>
    );
};

export default IncomeCategoryForm;