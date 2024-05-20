import { CategoryResponse } from '../models/CategoryResponse';
import React, { useEffect, useState } from 'react';
import CategorySelectModal from './CategoryExpensesSelectModal';
import CategoryService from '../services/CategoryServiсe';
import { ExpenseType } from '../models/Expense';
import ExpenseService from '../services/ExpenseService';

interface ExpenseFormProps {
    onExpenseAdded: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseAdded }) => {
    const [type, setType] = useState<ExpenseType>('cash');
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 16)); 
    const [amount, setAmount] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('Select Category');
    const [description, setDescription] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
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

    const onSubmit = async (e: React.FormEvent) => {
        console.log(date)
        e.preventDefault();
        const expenseData = {
            date: new Date(date).toISOString(),
            amount,
            type,
            categoryId,
            description,
        };

        try {
            await ExpenseService.addExpenses(expenseData);
            setType('cash');
            setDate(new Date().toISOString().substring(0, 16));
            setAmount(0);
            setCategoryId('');
            setCategoryName('Select Category');
            setDescription('');
            onExpenseAdded();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCategorySelect = (id: string, name: string) => {
        setCategoryId(id);
        setCategoryName(name);
        setShowModal(false);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as ExpenseType)}>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                </select>
            </div>
            <div>
                <label>Date</label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Category</label>
                <button type="button" onClick={() => setShowModal(true)}>
                    {categoryName}
                </button>
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Add Expense</button>
            {showModal && (
                <CategorySelectModal onSelect={handleCategorySelect} onClose={() => setShowModal(false)} />
            )}
        </form>
    );
};


export default ExpenseForm;