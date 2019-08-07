// Ué, pq esse esquema existe 2x? ver ./user.js
import mongoose from '../../database';
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
    // timestamps
    timestamps: true,
  }
);

// encriptografa a senha com bcryptjs
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

// O primeiro argumento de mongoose.model() deve ser único!
// não podem existir dois esquemas com o mesmo nome
const User = mongoose.model('User', UserSchema);

// não usar module.exports
module.exports = User;
