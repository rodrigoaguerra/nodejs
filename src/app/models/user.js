// não há necessidade de importar o mongoose de um
// modulo/arquivo que você fez, poderia ter feito a importação
// direto do pacote, exemplo:
/*import mongoose from 'mongoose';*/
import mongoose from '../../database';
// o problema dessa abordagem é que quando você mexer numa
// aplicação grande, começa a ficar bastante complicado usar o
// caminho relativo do arquivo do banco de dados! Imagine que um dia pode acontecer assim:
// ../../../../../../database
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    role: {
      type: String,
      default: 'cliente',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // boa garoto
    // timestamps
    timestamps: true,
  }
);

// muito interessante o uso do hook do mongoose, legal mesmo
// isso é bastante útil para muitas situações,
// mas veja que talvez você precise reutilizar essa função de
// criptografia em outros módulos da sua aplicação,
// então recomendo criar ela como um helper

// encriptografa a senha com bcryptjs
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

// não usar module.exports!
export default User;
