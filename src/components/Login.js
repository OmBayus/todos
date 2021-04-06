import React, { useState } from 'react';
import styles from './styles/login.module.css';
import { useHistory } from 'react-router-dom';
const Login = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const handleFormSubmit = () => {
    localStorage.setItem('nameSurname', name + ' ' + surname);
    history.push('/');
  };
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'surname') {
      setSurname(e.target.value);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.formSection} onSubmit={handleFormSubmit}>
        <div className={styles.inputs}>
          <label htmlFor="first_name" className={styles.labels}>
            İsim
          </label>
          <input
            type="text"
            placeholder="John"
            className={styles.textInput}
            value={name}
            onChange={handleChange}
            name="name"
            required
          />
        </div>
        <div className={styles.inputs}>
          <label htmlFor="last_name" className={styles.labels}>
            Soyisim
          </label>
          <input
            type="text"
            placeholder="Doe"
            className={styles.textInput}
            value={surname}
            onChange={handleChange}
            name="surname"
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
