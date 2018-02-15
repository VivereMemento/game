// let txtName = document.getElementById("txtName");
// let txtSurname = document.getElementById("txtSurname");

// function Person(name, surname) {
// 	this.name = name;
// 	this.surname = surname;
// };

class Binder {
	bindTo(dataSourceObj, dataSourceProperties, dataTargetList) {
		var bindHandler = {
			set: function(target, property, newValue) {
				var i = dataSourceProperties.indexOf(property);
					if (i >= 0) {
					target[dataSourceProperties[i]] = newValue;
					dataTargetList[i].obj[dataTargetList[i].prop] =
					newValue;
				}
			}
		};
	return new Proxy(dataSourceObj, bindHandler);
	}
}

// var person = new Person("John", "Smith");
// var binder = new Binder();
// var proxiedPerson = binder.bindTo(person,
// 									["name", "surname"],
// 									[	{obj: txtName, prop: "value"},
// 										{obj: txtSurname, prop: "value"}
// 									]);
// setTimeout(function() {
//   proxiedPerson.name = "Mario";
//   proxiedPerson.surname = "Rossi";
// }, 1000);

module.exports = Binder;