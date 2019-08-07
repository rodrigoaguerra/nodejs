import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // boa
  if (!authHeader) return res.status(401).send({ error: 'No token provided' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;
    return next();
  });
};

// nao usar module.exports se puder usar export (simples) ou export default
export default auth;

// massa, gostei da organização aqui, mas seria bom alguns comentários
