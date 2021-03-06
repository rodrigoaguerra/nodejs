import jwt from 'jsonwebtoken';

// gera token cadastro de usuário
export const generateToken = (parms = {}) => (
  jwt.sign(parms, process.env.SECRET_API, {
    expiresIn: 86400,
  })
);

// valida email por regex
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const validEmail = email => (
  !emailRegexp.test(email)
);
