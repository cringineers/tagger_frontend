import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { successNotification, errorNotification } from '../components/notification';
import axios from 'axios';

export default function LoginForm({ setJWTToken }) {
	const loginRef = useRef(null);
	const passwordRef = useRef(null);

	const login = (login, password) => {
		axios.post('/auth/login', { username: login, password: password })
			.then(res => {
				successNotification('Авторизация прошла успешно');
			})
			.catch(function (error) {
				if (error.response.status === 401) {
                    errorNotification('Неверный логин или пароль');
				}
				else {
                    errorNotification('Что-то пошло не так!');
					console.log(error.response);
				}
			});
	};

	const handleChange = e => {
	};


	const handleSubmit = e => {
		e.preventDefault();
		login(loginRef.current.value, passwordRef.current.value);
	};

	return (
		<div className="login-container">
			<form className="login-form">
				<div className="form-header">
					<img
						className="form-logo"
						src={process.env.PUBLIC_URL + '/logo.svg'}
						alt="Drive Logo"
					/>
					<h3 className="form-title">Авторизация</h3>
				</div>
				<TextField
					id="outlined-full-width login-email"
					label="Логин"
					placeholder="Логин"
					fullWidth
					margin="normal"
					InputLabelProps={{shrink: true}}
					autoComplete="off"
					variant="outlined"
					inputRef={loginRef}
					onChange={handleChange}
				/>
				<TextField
					id="outlined-full-width login-password"
					type="password"
					label="Пароль"
					placeholder="Пароль"
					fullWidth
					margin="normal"
					InputLabelProps={{shrink: true}}
					autoComplete="off"
					variant="outlined"
					inputRef={passwordRef}
					onChange={handleChange}
				/>

				<Button
					type="submit"
					variant="contained"
					size="medium"
					color="primary"
					onClick={handleSubmit}>Войти</Button>
			</form>
		</div>
	);
}