const userMoudle = require("../../db/moudels/user.modul")
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
    static async single(req,res){
        try {
            let allUsers = await userMoudle.findById(req.params.id)
    
            res.send({ allUsers: allUsers })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async UpdateOne(req,res){
        try {
            let allUsers = await userMoudle.findByIdAndUpdate(req.params.id,req.body)
    
            res.send({ allUsers: allUsers })
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
    static async login(req,res){
        try {
            const user = await userMoudle.login(req.body.email,req.body.password)
            await user.genTokens()
            res.send({ user: user })
        } catch (error) {
            res.status(500).send({ error: error.message,x: error})
        }
    }
}
module.exports = users