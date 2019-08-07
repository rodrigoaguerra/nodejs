// Gostei, muito bom!
// Como você faria para trocar os module.exports por exports?

// Tente refatorar a parte dos controllers:
// 1. Crie uma pasta para cada controller
// 2. Crie um index.js dentro de cada pasta, coloque as funções do controller lá
// 3. Renomeie este arquivo para authRoutes.js
// 4. Importe as funções da pasta auth (evite redundancia, chame a pasta de auth ao invés de authController)
// 5. Para cada função do controller, especifique as rotas, exemplo:
// router.post('/register', auth.register);
// router.post('/authenticate', auth.authenticate);

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../../modules/mailer';
import authConfig from '../../config/auth';
import User from '../models/user';

const router = express.Router();

function generateToken(parms = {}) {
  return jwt.sign(parms, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;

  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  try {
    // verifica se tem nome
    if (name === undefined) {
      return res.status(400).send({ error: 'Usuário sem nome' });
    }

    // verifica se o e-mail é valido
    if (!emailRegexp.test(email)) {
      return res.status(400).send({ error: 'Endereço de e-mail invalido' });
    }

    // verifica se e-mail o email já foi cadastrado
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'E-mail já cadastrado' });
    }

    // confirma a senha
    if (
      password === undefined ||
      password2 === undefined ||
      password !== password2
    ) {
      return res.status(401).send({ error: 'A senha não foi confirmada' });
    }

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
  if (!user) {
    return res.status(400).send({ error: 'Usuário não encontrado.' });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: 'Senha inválida' });
  }

  // remove o password do usuário para o retorno da requisição
  user.password = undefined;

  res.send({
    user,
    // definindo o token para o usuário
    token: generateToken({ id: user.id }),
  });
});

/**
 * Não implementado problema com a configuração do nodemailer-express-handlebars
 */
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: 'User not found' });

    // gera token
    const token = crypto.randomBytes(20).toString('hex');

    // tempo de expiração
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'contato@rodrigoalvesguerra.com.br',
        template: 'auth/forgot_password',
        context: { token },
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .send({ error: 'Cannot send forgot password email' });

        return res.send();
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Error on forgot password, try again' });
  }
});

module.exports = (app) => app.use('/auth', router);
