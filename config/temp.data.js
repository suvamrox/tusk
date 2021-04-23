const AdminModel = require("../model/admin.model");
const UserModel = require("../model/user.model")



exports.tempData = () => {
    UserModel.countDocuments((err, c) => {
        if (err) {
            console.error(err);
        } else if (c == 0) {
            this.addUser(1000)
        }
    });

    AdminModel.countDocuments((err, c) => {
        if (err) {
            console.error(err);
        } else if (c == 0) {
            this.addAdmin()
        }
    });
}



exports.addUser = (lm) => {
    let list = [];
    for (let i = 0; i < lm; i++) {
        list.push({
            name: `Suvam ${i}`,
            marks: i,
            subjects: [`sub1-${i}`, `sub1-${i}`, `sub1-${i}`, `sub1-${i}`, `sub1-${i}`],
            percent: i
        })
    }

    UserModel.collection.insertMany(list, function (err, docs) {
        if (err) {
            console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    });
}

exports.addAdmin = () => {
    let a = new AdminModel({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
    }).save((err, doc) => {
        console.log("Admin documents inserted to Collection");
    })
}