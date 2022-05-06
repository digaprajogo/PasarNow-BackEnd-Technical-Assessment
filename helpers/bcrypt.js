const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (plainPassword, hash) => {
    return bcrypt.compareSync(plainPassword, hash);
  },
};
