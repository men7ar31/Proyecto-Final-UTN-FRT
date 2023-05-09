const { Router } = require("express");
const materiasRoute = require('./Noticias_route')
const router = Router();

router.use('/tasks', materiasRoute)
const Materias = require("../models/materias");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, lastName, carrera, email, password } = req.body;

  const newUser = new User({ name, lastName, carrera, email, password });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, "secretKey");
  res.status(201).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("El correo no existe");
  if (user.password !== password) return res.status(401).send("Mal contraseña");

  const token = jwt.sign({ _id: user._id }, "secretKey");
  res.status(201).json({ token });
});

router.get("/inicio", verifyToken, async (req, res) => {
  let _id = req.userId;
  let usuario = await User.findOne({ _id });
  res.json({ usuario });
});



router.get("/materias",verifyToken, async (req, res) => {
  try {
    let user = req.userId;
    // Obtener los datos de la base de datos
    const datos = await Materias.find({userId: user});
    // Enviar los datos como respuesta
    res.json(datos);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos" });
  }
});

router.post("/create-registro", verifyToken, async (req, res) => {
  try {
    // Obtener los datos de la nueva tarea del body de la solicitud
    const { name, plan, ano } = req.body;

    const userId = req.userId;

    // Crear una nueva instancia del modelo de Tarea con los datos obtenidos
    const nuevaRegistro = new Materias({
      name,
      plan,
      ano,
      userId,
    });

    // Guardar la nueva tarea en la base de datos
    const materiaGuardada = await nuevaRegistro.save();

    // Devolver la tarea guardada como respuesta
    res.status(201).json(materiaGuardada);
  } catch (err) {
    // Manejar errores
    console.error(err);
    res.status(500).json({ mensaje: "Error al crear un nuevo registro " });
  }
});

router.delete("/materias/:id",verifyToken, async (req, res) => {
  try {
    const materiaEliminada = await Materias.findByIdAndDelete(req.params.id);
    if (!materiaEliminada) {
      return res.status(404).send({ error: 'No se encontró la tarea' });
    }
    res.send(materiaEliminada);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});



router.get("/profile", verifyToken, async (req, res) => {
  
  const datos = await User.findById(req.userId)

  res.json(datos)
});

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauhtorized Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauhtorized Request");
    }

    const payload = await jwt.verify(token, "secretKey");
    if (!payload) {
      return res.status(401).send("Unauhtorized Request");
    }
    req.userId = payload._id;
    next();
  } catch (e) {
    //console.log(e)
    return res.status(401).send("Unauhtorized Request");
  }
}
module.exports = router;
