import fs from 'fs';

/**
 * Lê todos os arquivos .js de um diretorio,
 * ignorando o index.js e subdiretorios
 * @param {*} app 
 */
const fileLoader = (app) => {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file.indexOf(".js") > -1 && file !== 'index.js')
    .forEach(async function(file) {
      const importedModule  = await import(__dirname + "/" + file);
      importedModule.default(app);
    });
};

export default fileLoader;
