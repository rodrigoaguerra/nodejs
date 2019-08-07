import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { validEmail } from './helpers';
import authConfig from '../config/auth';

const router = express.Router();

function generateToken(parms = {}) {
  return jwt.sign(parms, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const {
    name, email, password, password2,
  } = req.body;

  try {
    // verifica se tem nome
    if (name === undefined) { return res.status(400).send({ error: 'Usuário sem nome' }); }

    // verifica se o e-mail é valido
    if (validEmail(email)) { return res.status(400).send({ error: 'Endereço de e-mail invalido' }); }

    // verifica se e-mail o email já foi cadastrado
    if (await User.findOne({ email })) { return res.status(400).send({ error: 'E-mail já cadastrado' }); }

    // confirma a senha
    if (password === undefined || password2 === undefined || password !== password2) { return res.status(401).send({ error: 'A senha não foi confirmada' }); }

    const user = await User.create(req.body);

    // remove o password do usuário para o retorno da requisição
    user.password = undefined;

    return res.send({
      user,
      // definindo o token para o usuário
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro.' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // usuário não encontrado
  if (!user) { return res.status(400).send({ error: 'Usuário não encontrado.' }); }

  if (!await bcrypt.compare(password, user.password)) { return res.status(401).send({ error: 'Senha inválida' }); }

  // remove o password do usuário para o retorno da requisição
  user.password = undefined;

  res.send({
    user,
    // definindo o token para o usuário
    token: generateToken({ id: user.id }),
  });
});

module.exports = app => app.use('/auth', router);
