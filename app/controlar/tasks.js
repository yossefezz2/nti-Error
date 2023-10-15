const TaskMoudle =require("../../db/moudels/task.modul")
class tasks{
    static async addTask(req, res) {
        try {
            const task = new TaskMoudle(req.body)
            await task.save()
            res.send({
                data: task
            })
        } catch (error) {
            res.send({
                error: error.message
            })
        }
    }
    
}
module.exports=tasks