import bcrypt from 'bcryptjs';
import User from 'app/models/user';
import { generateToken } from '../_helpers';

export default async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  // usuário não encontrado
  if (!user) { return res.status(400).send({ error: 'Usuário não encontrado.' }); }

  // verifica senha
  if (!await bcrypt.compare(password, user.password)) { return res.status(401).send({ error: 'Senha inválida' }); }

  // remove o password do usuário para o retorno da requisição
  user.password = undefined;

  res.send({
    user,
    // definindo o token para o usuário
    token: generateToken({ id: user.id }),
  });
};
