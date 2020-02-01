module.exports = (app, User, Song) => {
    // GET
    app.get("/api/users", (req, res) => {
        User.find((err, users) => {
            if (err) return res.status(500).send({ error: "database failure" });

            res.json(users);
        });
    });

    // id -> _id(몽고디비 시스템적 아이디) , user_id -> 사용자가 지정한 아이디
    app.get("/api/users/:id", (req, res) => {
        User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) return res.status(500).send({ error: err });

            if (!user) return res.status(404).send({ error: "user not found" });
            res.json(user);
        });
    });

    // 회원가입 시 중복아이디 체크 화원가입 시에만 체크하는걸로
    // app.get("/api/users/:user_id", (req, res) => {
    //     User.findOne({ _id: req.params.user_id }, (err, user) => {
    //         if (err) return res.status(500).send({ error: err });

    //         if (!user) return res.status(404).send({ error: "user not found" });
    //         res.json(user);
    //     });
    // });

    // POST
    app.post("/api/users", (req, res) => {
        let user = new User();
        user.id = req.body.id;
        user.password = req.body.password;
        user.name = req.body.name;
        user.song = [];

        user.save(err => {
            if (err) {
                console.log(err);
                res.json({ result: 0 });
                return;
            }

            res.json({ result: 1 });
        });
    });

    //PUT
    app.put("/api/users/:id", (req, res) => {
        User.upadte(
            { _id: req.parmas.id },
            { $set: req.body },
            (err, output) => {
                if (err)
                    return res.status(500).send({ error: "database failure" });
                if (!output.n)
                    return res.status(404).send({ error: "user not found" });

                console.log(output);
                res.json({ message: "user upload" });
            }
        );
    });

    //DELETE
    app.delete("/api/users/:id", (req, res) => {
        User.remove({ _id: req.params.id }, (err, output) => {
            if (err) return res.status(500).send({ error: "database failure" });
            if (!output.n)
                return res.status(404).send({ error: "user not found" });

            res.json({ message: "user deleted" });
            res.status(204).end();
        });
    });
};
