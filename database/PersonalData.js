// This file contains the functions that creates roles, users and organizations.
// The models of the roles, users and organizations can be found in folder "Models"
// In the server.js-file is a connection to the database and therefore the functions
// are called on from there

// ---- Function: createRoles() ------
// Create the Roles
async function createRoles() {
    const Role = require("../models/Personal/Role")

    try {
        const Patient = await Role.create({
            roleID: 1,
            name: "patient",
            type: "1"
    })
        const Physician = await Role.create({
            roleID: 2,
            name: "physician",
            type: "2"
    })
        const Researcher = await Role.create({
            roleID: 3,
            name: "researcher",
            type: "3"
    })
        const JuniorResearcher = await Role.create({
            roleID: 4,
            name: "junior researcher",
            type: "3"
    })
    
    await Patient.save()
    await Physician.save()
    await Researcher.save()
    await JuniorResearcher.save()

    console.log(Researcher)
    
    } catch(e) {
        console.log(e.message)
    }
}

// ----------------------------------

// ---- Function: createOrganizations() ------
// Create the Organizations

// @TODO: Write code

// ----------------------------------

// ----------------------------------

// ---- Function: createUsers() ------
// Create the Users
/*
INSERT INTO `User` (`userID`, `username`, `email`, `Role_IDrole`, `Organization`, `Lat`, `Long`) VALUES
(1, 'doc', 'doc@hospital.com', 2, 1, NULL, NULL),
(2, 'researcher', 'res@uni.se', 3, 2, NULL, NULL),
(3, 'patient1', 'x@gmail.com', 1, 1, 59.6567, 16.6709),
(4, 'patient2', 'y@happyemail.com', 1, 1, 57.3365, 12.5164);
*/
async function createUsers() {
    const User = require("../models/Personal/Users")

    try {
        const Patient1 = await User.create({
            
    })
    
    await Patient1.save()

    console.log(Patient1)
    
    } catch(e) {
        console.log(e.message)
    }
}

// @TODO: Write code

// ----------------------------------

// Export the functions to be able to access them in server.js-file
module.exports = {createRoles}