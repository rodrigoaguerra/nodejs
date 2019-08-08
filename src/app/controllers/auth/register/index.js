import User from 'app/models/user';
import { generateToken, validEmail } from '../_helpers';

export default async (req, res) => {
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
};
