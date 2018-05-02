var UserEmployee = require("./module_2_user");

function Teacher(eid, ename, eage) {
    UserEmployee.employee.apply(this, [eid, ename, eage]);  // Teacher继承UserEmployee.employee

    this.teach = function(res) {  // Teacher自身的方法teach()
        res.write(this.ename + " is teaching...");
    }
}

module.exports = Teacher;