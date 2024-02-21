import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { createHash } from "../utils.js";
import passport from "passport";

export const router = Router()

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/failregister'
}), async (req, res) => {

    res.send({ status: "success", message: "User registered" });
})

router.get('/failregister', async (req, res) => {
    res.send({ error: 'failed' })
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incomplete Values" });

    req.session.user = {
        name: req.user.first_name + " " + req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }

    res.send({ status: "success", payload: req.user });
})

router.get('/faillogin', async (req, res) => {
    res.send({ error: 'failed' })
})

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: "Logout ERROR", body: err })
        }
        res.send("Logout Ok")
    })
})

router.get("/current", (req, res) => {
    if (req.user) {
        res.json({ status: "scuccess", user: req.user })
    } else {
        res.json({status: "error", error: "Not logued user"})
    }
})

router.post('/restartPassword', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete Values" });
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ status: "error", error: "Not user found" });
    const newHashedPassword = createHash(password);
    await userModel.updateOne({ _id: user._id }, { $set: { password: newHashedPassword } });
    res.send({ status: "success", message: "Contraseña restaurada" });
})