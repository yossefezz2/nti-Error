const userMoudle = require("../../db/moudels/user.modul")
const bycrypt = require("bcrypt")
class users {
    static test(req, res) {
        res.send({
            massage: "users"
        })
    }
    static async signUp(req, res) {
        try {
            const user = new userMoudle(req.body)
            await user.save()
            res.send({
                data: user
            })
        } catch (error) {
            res.send({
                error: error.message
            })
        }
    }
    static async showAll(req, res) {
        try {
            let allUsers = await userMoudle.find()
            res.send({ allUsers: allUsers })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async deleteOne(req, res) {
        try {
            let deletedUser = await userMoudle.findByIdAndDelete(req.params.id)
            res.send({ deletedUser: deletedUser })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    static async deleteAll(req, res) {
        try {
            let deletedUser = await userMoudle.deleteMany({})
            res.send({ deletedUser: deletedUser })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async single(req, res) {
        try {
            let allUsers = await userMoudle.findById(req.params.id)

            res.send({ allUsers: allUsers })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async UpdateOne(req, res) {
        try {
            let allUsers = await userMoudle.findByIdAndUpdate(req.params.id, req.body)

            res.send({ allUsers: allUsers })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async login(req, res) {
        try {
            const user = await userMoudle.login(req.body.email, req.body.password)
            await user.genTokens()
            res.send({ user: user })
        } catch (error) {
            res.status(500).send({ error: error.message, x: error })
        }
    }
    static async logout(req, res) {
        try {
            let user = await userMoudle.filter(t => {
                return t.tokens.token != req.token
            })
            await user.save()
            res.send({ user: user })
        } catch (error) {
            res.status(500).send({ error: error.message, x: error })
        }
    }
    static async logoutAll(req, res) {
        try {
            let user = await userMoudle.findByIdAndUpdate(req.user._id, { tokens: [] })

            await user.save()
            res.send({ user: user })
        } catch (error) {
            res.status(500).send({ error: error.message, x: error })
        }
    }
    static async showAllAdresse(req, res) {
        try {
            let user = await userMoudle.findById(req.user._id)
            res.send({ user: user.address })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async deleteAddress(req, res) {
        try {
            let userAddr = req.user.address
            userAddr.splice(req.params.idAddress, 1)

        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async changePassword(req, res) {
        try {
            const oldPasswordSaved = req.user.password
            const oldPasswordSend = req.body.oldPassword
            const newPassword = req.body.newPassword
            console.log(oldPasswordSaved)
            if (await bycrypt.compare(oldPasswordSaved, oldPasswordSend)) {
                const user = await userMoudle.findByIdAndUpdate(req.user._id, { password: newPassword })
                user.save()
                res.send({ user: user , message:"done"})
            }else{
                throw new Error("Couldn't change password")
            }
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }

}
module.exports = users