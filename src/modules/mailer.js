import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { host, port, user, pass } from "../config/mail.json";

// configurando o serviço de email
let transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
});

// trabalhando o corpo do e-mail
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));

module.exports = transport;