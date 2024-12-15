from fhevm import Circuit, Context

# Example: Encrypted addition operation
def encrypted_addition():
    with Context():
        # Define inputs
        a = Circuit.input('a', dtype='int', shape=(1,))
        b = Circuit.input('b', dtype='int', shape=(1,))
        
        # Perform addition
        result = a + b
        
        # Output result
        Circuit.output('result', result)



