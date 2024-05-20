import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-home">🏠</i>
            </NavLink>
            <NavLink to="income-categories" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-categories">💰</i>
            </NavLink>
            <NavLink to="expense-categories" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-categories">💸</i>
            </NavLink>
            <NavLink to="incomes" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-incomes">📈</i>
            </NavLink>
            <NavLink to="expenses" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-expenses">📉</i>
            </NavLink>
            <NavLink to="wallet" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icon-wallet">👛</i>
            </NavLink>
        </div>
    );
};

export default Sidebar;
