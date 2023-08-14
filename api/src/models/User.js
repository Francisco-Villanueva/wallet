const { DataTypes } = require("sequelize");
const { hash, genSaltSync } = require("bcrypt");

module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,
    },
    userPw: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    userCvu: {
      type: DataTypes.BIGINT,
    },
    userAlias: {
      type: DataTypes.STRING,
    },
  });

  User.beforeCreate((user) => {
    const salt = genSaltSync(8);
    user.salt = salt;

    return hash(user.userPw, user.salt)
      .then((hash) => {
        user.userPw = hash;
        user.userCvu = 12348283;

        console.log("BEFORE CREATED! ", { user });
      })
      .catch((e) => console.log({ e }));
  });

  User.prototype.validatePassword = async function (loginPw) {
    console.log("la pw que entra es: ", { loginPw });
    try {
      const hashRes = await hash(loginPw, this.salt);
      return hashRes === this.userPw;
    } catch (err) {
      return console.log("se rompe el validate: ", err);
    }
  };
  return User;
};
