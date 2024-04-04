import nodemailer from "nodemailer";
import {EMAIL, PASSWORD_EMAIL} from "../utils/config.js";

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
        const info = await transporter.sendMail({
            from: '"SolcitoWeb" <elielbejar12@gmail.com>', // sender address
            to: "elubejar66@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
    }
}