//IMPORTAR LIBRERÍAS.
const jwt = require (`jsonwebtoken`); 

//RUTA PROTEGIDA. 
module.exports = (req, res, next) => {
	
	const  { authorization } = req.headers;
	
	if (!authorization) {
		return res.status(401).json({ msg: "Lo sentimos, acceso no autorizado "});
	}

	try {
		const [type, token] = authorization.split(" ");
		
		if (type === "Token" || type === "Bearer") {
			const openToken = jwt.verify(token, process.env.JWT_SECRET);
			req.user = openToken.user
			next();
		} else { 
			return res.status(401).json({ msg: "Lo sentimos, acceso no autorizado"});
		}
	} catch (error) {
		console.error(error);
        res.status(500).json({ message: `Ocurrió un error`});
	}
};