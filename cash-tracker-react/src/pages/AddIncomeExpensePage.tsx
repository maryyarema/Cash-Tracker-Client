import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import WalletList from '../components/WalletList';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
// import './CategoryPage.css';

const AddIncomePage: React.FC = () => {
    const [incomesUpdated, setIncomesUpdated] = useState(0);
    const [expenseCategoriesUpdated, setExpenseCategoriesUpdated] = useState(0);
    const navigate = useNavigate();

    const handleIncomeAdded = () => {
        setIncomesUpdated(prev => prev + 1);
    };

    const handleExpenseCategoryAdded = () => {
        setExpenseCategoriesUpdated(prev => prev + 1);
    };

    const [walletUpdated, setWalletUpdated] = useState(0);
    const handleWalletAdded = () => {
        setWalletUpdated(prev => prev + 1);
    };
    return (

        <div className="income-page">
            <h1>Income </h1>
            <IncomeForm onIncomeAdded={handleIncomeAdded} />
            <IncomeList key={`income-${incomesUpdated}`} />
            <button onClick={() => navigate('/income')}>Add Income</button>
            <h1>Wallet </h1>
            <WalletList key={`wallet-${walletUpdated}`} />
            <button onClick={() => navigate('/wallet')}>Awallet</button>
            <h1>Expense Categories</h1>
            <ExpenseForm onExpenseAdded={handleExpenseCategoryAdded} />
            <ExpenseList key={`expense-${expenseCategoriesUpdated}`} />
            <button onClick={() => navigate('/expense')}>Add Expense</button>
        </div>
    );
};

export default AddIncomePage;















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddExpense: React.FC = () => {
//     const [type, setType] = useState<string>('cash');
//     const [date, setDate] = useState<string>(new Date().toISOString());
//     const [amount, setAmount] = useState<number>(0);
//     const [categoryId, setCategoryId] = useState<string>('');
//     const [description, setDescription] = useState<string>('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await axios.post('/expenses', { type, date, amount, categoryId, description });
//             alert('Expense added successfully!');
//             navigate('/expense-categories');
//         } catch (error) {
//             console.error('Error adding expense', error);
//             alert('Failed to add expense');
//         }
//     };

//     return (
//         <div>
//             <h1>Add Expense</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Type</label>
//                     <input
//                         type="text"
//                         value={type}
//                         onChange={(e) => setType(e.target.value)}
//                         readOnly
//                     />
//                 </div>
//                 <div>
//                     <label>Date</label>
//                     <input
//                         type="datetime-local"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Amount</label>
//                     <input
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(parseFloat(e.target.value))}
//                     />
//                 </div>
//                 <div>
//                     <label>Category ID</label>
//                     <input
//                         type="text"
//                         value={categoryId}
//                         onChange={(e) => setCategoryId(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Description</label>
//                     <input
//                         type="text"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Add Expense</button>
//             </form>
//         </div>
//     );
// };

export {};
// default AddExpense;
