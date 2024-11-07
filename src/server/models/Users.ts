import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DataTypes, type Sequelize } from "sequelize";

const userSequelizer = (sequelize: Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER({ length: 10 }),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.findByEmail = async function (email) {
    return await User.findOne({ where: { email: email } });
  };

  User.findById = async function (id: string) {
    return await User.findOne({ where: { id: id } });
  };

  User.findByUsername = async function (username: string) {
    return await User.findOne({ where: { username: username } });
  };

  User.createNewUser = async function (
    email: string,
    username: string,
    password: string
  ) {
    // validate inputs
    let { emailMessage, usernameMessage, passwordMessage } =
      await this.validateInput(email, username, password);
    if (emailMessage || usernameMessage || passwordMessage) {
      throw {
        success: false,
        emailMessage,
        usernameMessage,
        passwordMessage,
      };
    }

    //check if username or email already exists in the database
    const findEmail = await this.findByEmail(email);
    const findUsername = await this.findByUsername(username);
    if (findEmail || findUsername) {
      emailMessage = findEmail
        ? "Email is already registered to an account"
        : "";
      usernameMessage = findUsername ? "Username is already in use" : "";
      throw {
        success: false,
        emailMessage,
        usernameMessage,
      };
    }
    //hashes and salts the password then creating a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    await User.create({ email, username, password });
    return {
      success: true,
      message: "Registration Success",
    };
  };

  User.loginUser = async function (userInput) {
    if (!userInput.username) {
      throw {
        success: false,
        usernameMessage: "Username cannot be empty",
      };
    }
    if (!userInput.password) {
      throw {
        success: false,
        passwordMessage: "Password cannot be empty",
      };
    }
    const userFromDB = await this.findByUsername(userInput.username);
    //check if username exists
    if (!userFromDB) {
      throw {
        success: false,
        usernameMessage: "No such user exists",
      };
    }
    const match = await bcrypt.compare(userInput.password, userFromDB.password);
    //check if password matches
    if (!match) {
      throw {
        success: false,
        passwordMessage: "Password is incorrect",
      };
    }

    const token = jwt.sign(
      { id: userFromDB.id },
      "changethissecretandstoreindotenvfile",
      { expiresIn: "2h" }
    );
    return {
      success: true,
      id: userFromDB.id,
      token,
    };
  };

  User.validateInput = function (email, username, password) {
    let emailMessage = null;
    let usernameMessage = null;
    let passwordMessage = null;
    //validate email
    if (!email) {
      emailMessage = "Email cannot be empty";
    }
    if (!/^[\w]+@[\w]+\.[\w][\w]+$/.test(email)) {
      emailMessage = "Email is not a valid address";
    }
    //validate username
    if (!username) {
      usernameMessage = "Username cannot be empty";
    }
    if (username.length <= 5) {
      usernameMessage = "Username must be 5 or more characters long";
    }
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(username)) {
      usernameMessage = "Username must not start with numbers";
    }
    if (!/^[A-Za-z0-9]+$/.test(username)) {
      usernameMessage =
        "Username must not contain spaces or special characters";
    }
    //validate password

    if (!password) {
      passwordMessage = "Password cannot be empty";
    }
    if (password.length <= 7) {
      passwordMessage = "Password must be 8 or more characters long";
    }
    if (!/^[a-zA-Z\d#?!@$%^&*()-]+$/.test(password)) {
      passwordMessage = "Invalid character input";
    }

    return { emailMessage, usernameMessage, passwordMessage };
  };
  return User;
};

export default userSequelizer;
