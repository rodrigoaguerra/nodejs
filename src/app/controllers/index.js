/* procure não user require e module.exports a menos que seja extremamente necessário */

// const fs = require('fs');
// const path = require('path');

import fs from 'fs';
import path from 'path';

// corrigindo para não ser necessário usar o export,
// assim o código fica mais organizado e sabemos exatamente o que
// a função está fazendo
const fileLoader = (app) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => require(path.resolve(__dirname, file))(app));
};

export default fileLoader;

// Essa solução que você implementou é bastante legal.
// Eu já havia tentado implementar, mas desisti pq acabou me confundindo.
// Isso aqui é bastante válido para, por exemplo, carregar todas as models do mongo/mongoose,
// entretanto, isso acaba confundindo quando o projeto é maior, pq por exemplo,
// eu queria saber onde os controlles
