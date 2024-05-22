import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "..";
import './LoginForm.css'; // Використовуємо той самий CSS файл

const Signup: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const navigate = useNavigate(); // Хук для навігації

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // Запобігаємо перезавантаженню сторінки при submit форми
        try {
            await store.signup(email, password, name);
            navigate('/login'); // Перенаправлення до сторінки входу після успішної реєстрації
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h1>Трекер бюджету</h1>
            </div>
            <div className="right">
                <form className="form" onSubmit={handleSignup}>
                    <h2>Створення акаунта</h2>
                    <p>Заповніть форму, щоб створити новий акаунт</p>
                    <input 
                        onChange={e => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Ім'я"
                    />
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
                    <button type="submit"><a href="/login">Зареєструватися</a></button>
                    <div className="links">
                        <a href="/login">Вже маєте акаунт? Увійти</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
