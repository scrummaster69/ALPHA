
from flask import Flask, request, jsonify
from fhevm import Circuit

app = Flask(__name__)

@app.route('/compute', methods=['POST'])
def compute():
    data = request.json
    a, b = data['a'], data['b']

    # Load the deployed circuit
    circuit = Circuit.load('addition.circuit')

    # Encrypt inputs and execute
    encrypted_a = circuit.encrypt_input('a', a)
    encrypted_b = circuit.encrypt_input('b', b)
    encrypted_result = circuit.run(a=encrypted_a, b=encrypted_b)

    # Decrypt result
    result = circuit.decrypt_output('result', encrypted_result)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5000)

