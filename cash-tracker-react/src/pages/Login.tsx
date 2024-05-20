import React, { FC, useState } from "react";
import { Context, store } from "..";
import './LoginForm.css'; // Import your CSS file

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const {} = useState(Context);

    return (
        <div className="container">
            <div className="left">
                <h1>Трекер бюджету</h1>
            </div>
            <div className="right">
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Ласкаво просимо</h2>
                    <p>Введіть дані свого облікового запису, щоб продовжити</p>
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                    />
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Пароль"
                    />
                    <button onClick={() => store.login(email, password)}>Увійти</button>
                    <div className="links">
                        <a href="/forgot-password">Забули пароль? Змінити пароль</a>
                        <a href="/signup">Досі не маєш акаунта? Створити акаунт</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
