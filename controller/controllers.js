const Student = require('../models/student.js');
const { v4: uuidv4 } = require('uuid');

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        
            // messaage: "Students fetched successfully",
            // data: students
            res.json(Array.isArray(students) ? students : []);
        
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({  message: "Internal server error", error: err });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { name, age, gender, department, email } = req.body;

        if (!name || !age || !gender || !department || !email) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (age < 0 || age > 50) {
            return res.status(400).json({ message: "Age must be between 0 and 50" });
        }

        // Convert email and department to lowercase for consistency
        const normalizedEmail = email.toLowerCase();
        const normalizedDepartment = department.toLowerCase();

        // Check if email already exists
        const existingStudent = await Student.findOne({ where: { email: normalizedEmail } });

        if (existingStudent) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Check if the same email already has the same department
        const departmentExists = await Student.findOne({ 
            where: { email: normalizedEmail, department: normalizedDepartment } 
        });

        if (departmentExists) {
            return res.status(400).json({ message: "This email is already associated with this department" });
        }

        // Create new student
        const student = await Student.create({ 
            name, 
            age, 
            gender, 
            department: normalizedDepartment, 
            email: normalizedEmail 
        });

        res.status(201).json({
            message: "Student created successfully",
            data: student
        });

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


// exports.updateStudent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, age, gender, department, email } = req.body;

//         const updateStudent = await Student.update({
//             name, age, gender, department, email}, { where: { id: id }});
 

//         if (!updateStudent) {
//             return res.status(404).json({
//                 message: "Student not found"
//             });
//         }          

//         res.status(200).json({
//             message: "Student updated successfully",
//             data: updateStudent
//         });  
//     } catch (error) {
//         console.error("Error updating student:", error);
//         res.status(500).json({ message: "Internal server error", error: error });
//     }
// };     


exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, department, email } = req.body;

        // Check if the request body is empty
        if (!Object.keys(req.body).length) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const updateStudent = await Student.update(
            { name, age, gender, department, email },
            { where: { id: id } }
        );

        // Check if the update was successful
        if (!updateStudent || updateStudent[0] === 0) {
            return res.status(404).json({ message: "Student not found or no changes made" });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({ where: { id: id } });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            data: student
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};