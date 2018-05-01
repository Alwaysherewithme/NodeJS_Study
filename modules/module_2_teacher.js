var UserEmployee = require("./module_2_user");

function Teacher(eid, ename, eage) {
    UserEmployee.employee.apply(this, [eid, ename, eage]);  // Teacher继承UserEmployee
    this.teach = function(res) {
        res.write(this.ename + " is teaching...");
    }
}

module.exports = Teacher;