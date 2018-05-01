/*
function User(){
    this.id;
    this.name;
    this.age;
    this.enter = function() {
        console.log(this.name + " comes into library...");
    }
}

module.exports = User;
*/

module.exports = {
    user: function User(){
        this.id;
        this.name;
        this.age;
        this.enter = function() {
            console.log(this.name + " comes into library...");
        }
    },
    employee: function Employee(id, name, age){
        this.eid = id;
        this.ename = name;
        this.eage = age;
        this.work = function() {
            console.log(this.ename + " works in company...");
    }
}
}