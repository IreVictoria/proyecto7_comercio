// CONFIGURACIÓN DE PAYPAL. 
const client = require(`../config/paypal`); 
const paypal =require(`../config/paypal`); 

//A. FUNCIÓN PARA CREAR UNA TRANSACCIÓN DE PAGO QUE EL USUARIO NECESITO APROBAR EN LA PAGINA DE PAYPAL.

exports.createPayment = async (req, res) => {
    const { amount } = req.body; // OBTENER MONTO DEL FRONTEND.
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: `CAPTURE`,
        purchase_units: [{
            amount: {
                currency_code: `USD`,
                value: amount // usar el monto dinamico 
            }
        }]
    }); 
    try {
        const order = await client().execute(request);
        res.status(200).json({
            orderID: order.result.id 
        });
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error al crear el pago`});
    }
}; 
//B. FUNCION PARA PROCESAR EL PAGO DESPUES DE QUE EL USUARIO APRUEBA EL PAGO EN PAYPAL.
exports.executePayment = async (req, res) => {
    const orderId = req.body.orderID; // OBTENER ID DE LA ORDEN. 

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try{
        const capture = await client().execute(request); // CAPTURAR EL PAGO 
        const captureId = capture.result.purchase_units[0].payments.captures[0].id;
        res.status(200).json({
            captureId: captureId,
            status: capture.result.status // ESTADO DEL PAGO. 
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al ejecutar el pago`}); 
    }
}; 
