const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

async function getUsers(req, res) {
  try {
    const users = await User.find().select({ password: 0 });
    res.status(200).send({
      ok: true,
      message: "Usuarios obtenidos correctamente",
      users,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al obtener los usuarios",
      error,
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select({ password: 0 });
    if (!user) {
      return res.status(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Usuario obtenido correctamente",
      user,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al obtener el usuario",
      error,
    });
  }
}

async function postUser(req, res) {
  try {
    if (req.user?.role !== "ADMIN_ROLE") {
      req.body.role = "CLIENT_ROLE";
    } // Si el usuario no es admin, no puede crear un admin
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User(req.body);
    if (req.file?.filename) {
      user.image = req.file.filename;
    }
    const newUser = await user.save();
    newUser.password = undefined; // Evitamos que llegue al front el password
    res.status(201).send({
      ok: true,
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al crear el usuario",
      error,
    });
  }
}

async function putUser(req, res) {
  try {
    const id = req.params.id;
    if (req.user.role !== "ADMIN_ROLE" && req.user._id !== id) {
      return res.status(403).send({
        ok: false,
        message: "No tienes permisos para editar este usuario",
      });
    }
    const newData = req.body;
    if (req.file?.filename) {
      newData.image = req.file.filename;
    } else {
      delete newData.image;
    }
    newData.password = await bcrypt.hash(newData.password, saltRounds);
    if (req.user.role !== "ADMIN_ROLE") {
      newData.role = "CLIENT_ROLE";
    } // Si el usuario no es admin, no puede cambiar el rol
    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Usuario actualizado correctamente",
      // user: updatedUser
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al actualizar el usuario",
      error,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Usuario eliminado correctamente",
      // user: deletedUser
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al eliminar el usuario",
      error,
    });
  }
}

async function login(req, res) {
  try {
    const email = req.body.email?.toLowerCase();
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).send({
        ok: false,
        message: "Email y contraseña son requeridos",
      });
    }
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    if (!user) {
      return res.status(404).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send({
        ok: false,
        message: "Datos incorrectos",
      });
    }
    user.password = undefined;
    const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
    res.status(200).send({
      ok: true,
      message: "Sesión iniciada correctamente",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: "Error al iniciar sesión",
      error,
    });
  }
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  login,
};
