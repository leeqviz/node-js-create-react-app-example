import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";

import styles from './Login.module.scss';
import { fetchRegister, isAuthSelector } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: 'pidar',
      email: 'srbrb@test.db',
      password: 'govnuck'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
    else {
      alert('Auth was unsuccessful!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          { ...register('name', {required: 'Enter name'})} 
          fullWidth />
        <TextField 
          className={styles.field} 
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          { ...register('email', {required: 'Enter email'})} 
          fullWidth />
        <TextField 
          className={styles.field} 
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          { ...register('password', {required: 'Enter password'})} 
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
