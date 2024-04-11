from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Replace these values with your actual database connection details
db_config = {
    'user': 'root',
    'password': 'suraj',
    'host': 'localhost',
    'database': 'hospital'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/api/hospital/patients', methods=['GET'])
def get_students():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patients")
    students = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(students)

@app.route('/api/hospital/patients', methods=['POST'])
def add_student():
    data = request.json
    patient_id = data['id']
    first_name = data['first_name']
    last_name = data['last_name']
    address = data['address']
    gender = data['gender']
    contact_number = data['contact_number']
    date_of_birth = data['date_of_birth']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO patients (patient_id, first_name, last_name , address , gender , contact_number , date_of_birth) VALUES (%s, %s, %s,%s, %s, %s,%s)", 
                   (patient_id, first_name, last_name , address , gender , contact_number , date_of_birth))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student added successfully', 201

@app.route('/api/students/data/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.json
    patient_id = data['id']
    first_name = data['first_name']
    last_name = data['last_name']
    address = data['address']
    gender = data['gender']
    contact_number = data['contact_number']
    date_of_birth = data['date_of_birth']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("UPDATE patients SET patient_id = %s, first_name = %s,  last_name = %s , address = %s , gender = %s , contact_number = %s , date_of_birth = %s WHERE id = %s", (patient_id, first_name, last_name , address , gender , contact_number , date_of_birth))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student updated successfully'

@app.route('/api/students/data/<int:id>', methods=['DELETE'])
def delete_student(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM patients WHERE id = %s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student deleted successfully'

if __name__ == '__main__':
    app.run(debug=True)
