import type { FC } from '../lib/teact/teact';
import React, { useEffect, useState } from '../lib/teact/teact';

import styles from './App.module.scss';

type LoginProps = {
  onLogin: () => void;
};

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>();
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Incorrect code');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>
          This is not an official version of Telegram. If you agree to continue, please enter the code 123:
        </h1>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="number"
          placeholder="Confirmation code"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>Login</button>
      </div>
    </div>
  );
};

export function withLogin<P extends AnyLiteral>(Component: FC<P>) {
  return function WithLogin(props: P) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('isLoggedIn'));

    useEffect(() => {
      const loggedInStatus = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!loggedInStatus);
    }, []);

    function handleLogin() {
      setIsLoggedIn(true);
    }

    if (!isLoggedIn) {
      // eslint-disable-next-line react/jsx-no-bind
      return <Login onLogin={handleLogin} />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} />;
  };
}

export default Login;
