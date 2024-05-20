import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { store } from "./index";
import Login from "./pages/Login";
import AddCategoryPage from "./pages/AddCategoryPage";
import Dashboard from "./components/Dashboard";
import WalletList from './components/WalletList';
import AddIncomeExpensePage from './pages/AddIncomeExpensePage';
import Sidebar from "./components/Sidebar"; // Import the Sidebar component
import './App.css'; // Make sure to import your CSS here if you haven't
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                {store.isAuth && <Sidebar />} {/* Conditionally render Sidebar */}
                <div className="content-container">
                    <Routes>
                        <Route path="/login" element={store.isAuth ? <Navigate to="/" /> : <Login />} />
                        <Route path="/" element={store.isAuth ? <DashboardLayout /> : <Navigate to="/login" />}>
                            <Route index element={<Dashboard />} />
                            <Route path="income-categories" element={<AddCategoryPage />} />
                            <Route path="expense-categories" element={<AddCategoryPage />} />
                            <Route path="incomes" element={<AddIncomeExpensePage />} />
                            <Route path="wallet" element={<WalletList />} />
                            <Route path="expenses" element={<AddIncomeExpensePage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const DashboardLayout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default observer(App);
