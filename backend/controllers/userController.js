// IMPORTAR LIBRERÍAS. 
const bcryptjs = require(`bcryptjs`); 
const jwt = require(`jsonwebtoken`); 
const User = require(`../models/userModel`); 

// A. REGISTRAR USUARIO. 
exports.registerUser = async (req, res) => {
    //Obtener usuario, email y password de la petición.
    const { name, email, password} = req.body
    try{  
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        //crear usuario con password encriptada.
        const newUser = await User.create({
            name, 
            email,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error al crear el usuario`})
    }

}; 

//B. INICIAR SESIÓN DEL USUARIO. 
exports.loginUser = async (req, res) => {
    //OBTENER EMAIL Y PASSWORD DE LA PETICIÓN
    const { email, password } = req.body; 
    try{
        //BUSCAR USUARIO.
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: `Credenciales incorrectas`});
        }
        //SI ENCUENTRA AL USUARIO, SE EVALUA SI LA CONTRASEÑA ES CORRECTA.
        const passwordCorrect = await bcryptjs.compare(password, user.password);
        //SI LA CONTRASEÑA ES INCORRECTA SE REPORTA.
        if (!passwordCorrect) {
            return res.status(400).json({ message: `Credenciales incorrectas`});
        }
        // SI TODO ES CORRECTO, SE GENERA UN JSON WEB TOKEN.
        //1. EL PAYLOAD SERÁ UN OBJETO QUE CONTENDRA EL ID DEL USUARIO.
        const payload = {user: {id: user.id }};
        //2. FIRMA DEL JWT   
        jwt.sign(
            payload,
            // SE USA LA PALABRA SECRETA PARA DECIFRAR LA FIRMA ELECTRONICA DEL TOKEN.
            process.env.JWT_SECRET,
            {
                expiresIn: 3_600_000 // EXPIRACIÓN DEL TOKEN QUE DURA 1 HRA.
            },
            (error, token) => {
                if(error) throw error;
                res.status(200).json({token});
            }
        );
            
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error al iniciar sesión, intentelo nuevamente`});
    }
}; 

//C. VERIFICAR TOKEN. 
exports.verifyToken = async (req, res) => {
    try{
        const foundUser = await User.findById(req.user.id).select(`-password`);
        res.json({foundUser})
    }catch (error){
        //EN CASO DE ERROR SE DEVUELVE UN MENSAJE.
        res.status(500).json({
            message: `Lo sentimos, hubo un error`,
            error: error.message
        });
        
    }

}; 

//D. OBTENER A TODOS LO USUARIOS. // MODIFICAR PARA RECIRBIR DATOS POR ID DEL USUARIO. 
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params; // EXTRAER EL ID DESDE LOS PARAMETROS DE LA RUTA.
        const user = await User.findById(id).select('-password'); // BUSCA AL USUARIO POR ID Y EXCLUYE EL PASSWORD.
        if (!user) {
            return res.status(404).json({
                message: `Lo sentimos, usuario no encontrado`
            });
        }
        res.json({user}) ; //DEVUELVE EL USUARIO ENCONTRADO.
        
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener los usuarios",
            error: error.message
        });
    }
};

//E. ACTUALIZAR UN USUARIO. 
exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        updates.password = hashedPassword;
    }

    try {
        const updateUser = await User.finByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true,
            select: '-password'
        });

        if (!updateUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }
        res.json(updateUser);

    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar el usuario",
            error: error.message
        });

    }
};




