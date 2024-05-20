import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import your CSS file
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import ExpenseService from '../services/ExpenseService';
import IncomeService from '../services/IncomeService';
import { CategoryResponse } from '../models/CategoryResponse';
import CategoryIncomesSelectModal from './CategoryIncomesSelectModal';
import CategoryExpensesSelectModal from './CategoryExpensesSelectModal';
import CategoryService from '../services/CategoryServiсe';

const Dashboard: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formType, setFormType] = useState<'income' | 'expense' | null>(null);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [wallet, setWallet] = useState({ cash: 0, card: 0, total: 0 });
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 16));
    const [amount, setAmount] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('Select Category');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<'cash' | 'card'>('cash');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [categoryMap, setCategoryMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetchCategories();
        updateWallet();
        fetchIncomes();
        fetchExpenses();
    }, [formType]);

    const fetchCategories = async () => {
        try {
            const incomeCategories = await CategoryService.getIncomeCategories();
            const expenseCategories = await CategoryService.getExpenseCategories();
            const allCategories = [...incomeCategories.data, ...expenseCategories.data];
            const map = allCategories.reduce((acc, category) => {
                acc[category.id] = category.name;
                return acc;
            }, {} as { [key: string]: string });
            setCategoryMap(map);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchIncomes = async () => {
        try {
            const response = await IncomeService.getIncomes();
            setIncomes(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await ExpenseService.getExpenses();
            setExpenses(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const showForm = (type: 'income' | 'expense') => {
        setFormType(type);
        setFormVisible(true);
    };

    const hideForm = () => {
        setFormVisible(false);
        setFormType(null);
        clearForm();
    };

    const clearForm = () => {
        setDate(new Date().toISOString().substring(0, 16));
        setAmount(0);
        setCategoryId('');
        setCategoryName('Select Category');
        setDescription('');
        setType('cash');
    };

    const addIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        const incomeData = {
            date: new Date(date).toISOString(),
            amount,
            type,
            categoryId,
            description: description || 'Без опису',
        };

        try {
            const response = await IncomeService.addIncome(incomeData);
            setIncomes([...incomes, response.data]);
            updateWallet();
            hideForm();
        } catch (err) {
            console.error(err);
        }
    };

    const addExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        const expenseData = {
            date: new Date(date).toISOString(),
            amount,
            type,
            categoryId,
            description: description || 'Без опису',
        };

        try {
            const response = await ExpenseService.addExpenses(expenseData);
            setExpenses([...expenses, response.data]);
            updateWallet();
            hideForm();
        } catch (err) {
            console.error(err);
        }
    };

    const updateWallet = async () => {
        try {
            const response = await ExpenseService.getWalletData(); 
            setWallet(response.data);
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
        <div className="container">
            <div className="content">
                <div className="header">
                    <h1>Дошка витрат та доходів</h1>
                    <div className="profile-icon">
                        <i className="icon-user"></i>
                    </div>
                </div>
                <div className="main">
                    <div className="box">
                        <h3>Доходи</h3>
                        <div className="income-expense-list">
                            {incomes.map((income, index) => (
                                <div key={index} className="income-expense-item">
                                    <div className="details">
                                        <span>{new Date(income.date).toLocaleDateString()}</span>
                                        <span>Сума: {income.amount}</span>
                                        <span>Категорія: {categoryMap[income.categoryId] || income.categoryId}</span>
                                        <span>Тип: {income.type}</span>
                                        <span>Опис: {income.description || 'Без опису'}</span>
                                    </div>
                                    <div className="actions">
                                        <i className="icon-edit"></i>
                                        <i className="icon-delete"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="add-button" onClick={() => showForm('income')}>+ ДОДАТИ</button>
                    </div>
                    <div className="box">
                        <h3>Витрати</h3>
                        <div className="income-expense-list">
                            {expenses.map((expense, index) => (
                                <div key={index} className="income-expense-item">
                                    <div className="details">
                                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                                        <span>Сума: {expense.amount}</span>
                                        <span>Категорія: {categoryMap[expense.categoryId] || expense.categoryId}</span>
                                        <span>Тип: {expense.type}</span>
                                        <span>Опис: {expense.description || 'Без опису'}</span>
                                    </div>
                                    <div className="actions">
                                        <i className="icon-edit"></i>
                                        <i className="icon-delete"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="add-button" onClick={() => showForm('expense')}>+ ДОДАТИ</button>
                    </div>
                </div>
                <div className="sidebar-right">
                    <div className="calendar">
                        <h3>Календар</h3>
                        {/* Add calendar component here */}
                    </div>
                    <div className="wallet-summary">
                        <h3>Гаманець</h3>
                        <p>Готівка: ${wallet.cash}</p>
                        <p>Карта: ${wallet.card}</p>
                        <p>Загалом: ${wallet.total}</p>
                    </div>
                </div>
                <div className={`form-container ${isFormVisible ? 'active' : ''}`}>
                    <button className="close-button" onClick={hideForm}>×</button>
                    <h2>{formType === 'income' ? 'Додати Доходи' : 'Додати Витрати'}</h2>
                    <form onSubmit={formType === 'income' ? addIncome : addExpense}>
                        <div className="form-group">
                            <label>Сума*</label>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>З гаманця</label>
                            <select value={type} onChange={(e) => setType(e.target.value as 'cash' | 'card')}>
                                <option value="cash">Готівка</option>
                                <option value="card">Карта</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Дата</label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Категорія</label>
                            <button type="button" onClick={() => setShowModal(true)}>
                                {categoryName}
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Опис</label>
                            <textarea 
                                placeholder="Опис"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="submit-button" type="submit">
                            {formType === 'income' ? '+ ДОДАТИ ДОХОДИ' : '+ ДОДАТИ ВИТРАТИ'}
                        </button>
                    </form>
                    {showModal && formType === 'income' && (
                        <CategoryIncomesSelectModal onSelect={handleCategorySelect} onClose={() => setShowModal(false)} />
                    )}
                    {showModal && formType === 'expense' && (
                        <CategoryExpensesSelectModal onSelect={handleCategorySelect} onClose={() => setShowModal(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
