import nodemailer from "nodemailer";
import {EMAIL, PASSWORD_EMAIL} from "../utils/config.js";

function checkEmail(email) {
    if(email == null){
        email = EMAIL;
    }
    return email;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: EMAIL,
        pass: PASSWORD_EMAIL,
    },
});

export class mailController {
    static async sendEmail(req, res) {
        let email = checkEmail(req.body.email);
        const info = await transporter.sendMail({
            from: `SolcitoWeb <${EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: req.body.subject, // Subject line
            text: "", // plain text body
            html: req.body.html, 
        });
        console.log("Message sent: %s", info.messageId);
        res.json(info);
    }
}

/*export class mailController {
    static async sendEmail(req, res) {
        const info = await transporter.sendMail({
            from: `SolcitoWeb <${EMAIL}>`, // sender address
            to: req.body.email, // list of receivers
            subject: "Tu pedido fue aceptado", // Subject line
            text: "Hello world?", // plain text body
            html: "<h1>Gracias por tu compra!</h1>" +
                   "<p>Tu pedido en Solcito - Ropa y accesorios fue aceptado, " +
                   "prepararemos tu pedido cuanto antes y te contactaremos a la brevedad!</p>", 
        });
        console.log("Message sent: %s", info.messageId);
    }
}*/