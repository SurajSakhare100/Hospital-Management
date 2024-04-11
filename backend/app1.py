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

@app.route('/api/attendance/data', methods=['GET'])
def get_students():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM attendance")
    students = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(students)

@app.route('/api/attendance/data', methods=['POST'])
def mark_attendance():
    data = request.json
    student_id = data['student_id']
    status = data['status']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance (id, status) VALUES (%s, %s)", (student_id, status))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Attendance marked successfully', 201

if __name__ == '__main__':
    app.run(debug=True, port=5001) 
