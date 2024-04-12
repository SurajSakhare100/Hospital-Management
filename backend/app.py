from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import json
from datetime import datetime,timedelta
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
def get_patients():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM patients")
        patients = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(patients)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hospital/patients', methods=['POST'])
def add_patient():
    try:
        data = request.json
        # Ensure all required fields are present in the JSON payload
        required_fields = ['first_name', 'last_name', 'address', 'gender', 'contact_number', 'date_of_birth']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO patients (first_name, last_name, address, gender, contact_number, date_of_birth) VALUES (%s, %s, %s, %s, %s, %s)",
                       (data['first_name'], data['last_name'], data['address'], data['gender'], data['contact_number'], data['date_of_birth']))
        connection.commit()
        cursor.close()
        connection.close()
        return 'Patient added successfully', 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hospital/patients/<int:id>', methods=['PUT'])
def update_patient(id):
    try:
        data = request.json
        # Ensure all required fields are present in the JSON payload
        required_fields = ['first_name', 'last_name', 'address', 'gender', 'contact_number', 'date_of_birth']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        connection = get_db_connection()
        cursor = connection.cursor()
        update_query = "UPDATE patients SET first_name = %s, last_name = %s, address = %s, gender = %s, contact_number = %s, date_of_birth = %s WHERE patient_id = %s"
        cursor.execute(update_query, (data['first_name'], data['last_name'], data['address'], data['gender'], data['contact_number'], data['date_of_birth'], id))
        connection.commit()
        cursor.close()
        connection.close()
        return 'Patient updated successfully'
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hospital/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM patients WHERE patient_id = %s", (id,))
        connection.commit()
        cursor.close()
        connection.close()
        return 'Patient deleted successfully'
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/api/hospital/doctors', methods=['GET'])
def get_doctors():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM doctors")
    doctors = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(doctors)

@app.route('/api/hospital/doctors', methods=['POST'])
def add_doctor():
    data = request.json
    doctor_id = data['id']
    first_name = data['first_name']
    last_name = data['last_name']
    specialization = data['specialization']
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO doctors (doctor_id, first_name, last_name, specialization) VALUES (%s, %s, %s, %s)", 
                   (doctor_id, first_name, last_name, specialization))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Doctor added successfully', 201

@app.route('/api/hospital/doctors/<int:id>', methods=['PUT'])
def update_doctor(id):
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    specialization = data['specialization']
    connection = get_db_connection()
    cursor = connection.cursor()
    update_query = "UPDATE doctors SET first_name = %s, last_name = %s, specialization = %s WHERE doctor_id = %s"
    cursor.execute(update_query, (first_name, last_name, specialization, id))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Doctor updated successfully'

@app.route('/api/hospital/doctors/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM doctors WHERE doctor_id = %s", (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return 'Doctor deleted successfully'


@app.route('/api/hospital/appointments', methods=['GET'])
def get_appointments():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM appointments")
    appointments = cursor.fetchall()
    cursor.close()
    connection.close()
    
    # Return appointments as JSON response
    return jsonify(appointments)



@app.route('/api/hospital/medical_records', methods=['GET'])
def get_medical_records():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM medical_records")
    medical_records = cursor.fetchall()
    cursor.close()
    connection.close()
    
    # Return appointments as JSON response
    return jsonify(medical_records)

@app.route('/api/hospital/patient/count', methods=['GET'])
def get_patient_count():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM patients")
        count = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return jsonify({'count': count})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/api/hospital/doctor/count', methods=['GET'])
def get_docter_count():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM doctors")
        count = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return jsonify({'count': count})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/hospital/appointment/count', methods=['GET'])
def get_appointment_count():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM appointments")
        count = cursor.fetchone()[0]
        cursor.close()
        connection.close()
        return jsonify({'count': count})
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)
