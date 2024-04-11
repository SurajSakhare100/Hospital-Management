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
    'database': 'college'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/api/students/data', methods=['GET'])
def get_students():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(students)

@app.route('/api/students/data', methods=['POST'])
def add_student():
    data = request.json
    name = data['name']
    age = data['age']
    grade = data['grade']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO students (name, age, grade) VALUES (%s, %s, %s)", (name, age, grade))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student added successfully', 201

@app.route('/api/students/data/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.json
    name = data['name']
    age = data['age']
    grade = data['grade']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("UPDATE students SET name = %s, age = %s, grade = %s WHERE id = %s", (name, age, grade, id))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student updated successfully'

@app.route('/api/students/data/<int:id>', methods=['DELETE'])
def delete_student(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM students WHERE id = %s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Student deleted successfully'

if __name__ == '__main__':
    app.run(debug=True)
