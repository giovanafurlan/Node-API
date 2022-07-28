const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));

// Connecting gfg-employees database to our express application

mongoose.connect(
"mongodb://localhost:27017/gfg-employees",
{ useNewUrlParser: true }
);

// Writing schema for employee-data collection
const employeeSchema = {
	employee_name: String,
	employee_department: String,
	employee_salary: Number
};

// Creating a model around employeeSchema
const EmployeeData = mongoose.model(
"EmployeeData", employeeSchema);

// Fetching all the employees
app.get("/employees", (req, res) => {
	EmployeeData.find((err, foundEmployees) => {
		if (!err) {
			res.send(foundEmployees)
		} else {
			res.send(err);
		}
	});
});

// Posting a new employee
app.post("/employees", (req, res) => {
	const newEmployee = new EmployeeData({
		employee_name: req.body.employee_name,
		employee_department: req.body.employee_department,
		employee_salary: req.body.employee_salary
	});

	// Saving the employee
	newEmployee.save(function(err) {
		if (!err) {
			res.send("Successfully added a new employee.");
		} else {
			res.send(err);
		}
	});
});

// Fetching a specific employee
app.get("/employees/:employee_name", function(req, res) {

	EmployeeData.findOne({ employee_name: req.params.employee_name },
						function(err, foundEmployees) {
		if (foundEmployees) {
			res.send(foundEmployees);
		} else {
			res.send("No employee matching that name was found.");
		}
	});
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});
