/* eslint-disable no-undef */

import { login } from './login.js';

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value();
  const password = document.getElementById('password').value();
  login(email, password);
});
