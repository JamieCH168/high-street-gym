import mysql from "mysql2/promise"

export const  db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456root",
    database:"high_street_gym"
})