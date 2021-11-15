const { surveyAnswer, surveyQuestion } = require('../model/survey')

class Controller {
    static async read(req, res) {
        try {
            let survey = await surveyAnswer.find({ respond_id: req.params.id })
            console.log(survey, "<<<????")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({ msg: err })
        }
    }

    static async admin(req, res) {
        try {
            let survey = await surveyAnswer.find({ survey_id: req.params.id })
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({ msg: err })
        }
    }

    static async readId(req, res) {
        try {
            let survey = await surveyAnswer.findById(req.params.id)
            console.log(survey, "<<??")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({ msg: err })
        }
    }

    static async create(req, res) {
        try {
            console.log(req.body.body, "<<<?")
            const data = await surveyAnswer.create(req.body.body)
            res.status(200).json(data)
        } catch (err) {
            console.log(err, "<<<?")
            res.status(400).json({ msg: err })
        }
    }

    static async update(req, res) {
        try {
            const result = await surveyAnswer.findByIdAndUpdate(id, body)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            res.status(200).json(result)
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            res.status(400).json({ msg: err })
        }
    }

    static async delete(req, res) {
        try {
            const result = await surveyAnswer.findByIdAndRemove(id, body)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            res.status(200).json({ msg: "sukses" })
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            res.status(400).json({ msg: err })
        }
    }

    static async recap(req, res) {
        try {
            let result = []
            const color = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ]
            const question = await surveyQuestion.find({ survey_id: req.params.id })
            for (let i = 0; i < question.length; i++) {
                let label = []
                for (let j = 0; j < question[i].answer.length; j++) {
                    label.push(question[i].answer[j].answer)
                }
                let obj = {}
                obj.labels = label
                obj.datasets = [
                    {
                        label: '# of Votes',
                        data: [],
                        backgroundColor: [],
                        borderColor: [],
                        borderWidth: 1,
                    },
                ]

                const answer = await surveyAnswer.find({ question: question[i].title }).exec()
                // console.log(answer, "????")
                if (question[i].type == 1) {
                    let tempArr = []
                    for (let k = 0; k < answer.length; k++) {
                        obj.datasets[0].backgroundColor.push(color[k])
                        obj.datasets[0].borderColor.push(color[k])
                        for (let n = 0; n < answer[k].respond.length; n++) {
                            tempArr.push(answer[k].respond[n])   
                        }
                    }
                    const counts = {};
                    let hasil = []
                    tempArr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                    console.log(counts)
                    for (let p = 0; p < label.length; p++) {
                        const name = label[p]
                        for (const x in counts) {
                            if (x === name) {
                                hasil.push(counts[x])
                            }
                        }
                    }
                    obj.datasets[0].data = hasil
                } else {
                    // console.log(answer, i)
                    for (let k = 0; k < answer.length; k++) {
                        obj.datasets[0].backgroundColor.push(color[k])
                        obj.datasets[0].borderColor.push(color[k])
                    }
                    let tempArr = []
                    for (let k = 0; k < answer.length; k++) {
                        tempArr.push(answer[k].respond[0])
                    }
                    const counts = {};
                    tempArr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                    let hasil = []
                    for (let p = 0; p < label.length; p++) {
                        const name = label[p]
                        for (const x in counts) {
                            if (x === name) {
                                hasil.push(counts[x])
                            }
                        }
                    }
                    obj.datasets[0].data = hasil
                }
                result.push(obj)
            }
            res.status(200).json(result)
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            res.status(400).json({ msg: err })
        }
    }
}

module.exports = Controller