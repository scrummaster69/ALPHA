import UIKit

class ChatViewController: UIViewController {
    @IBOutlet weak var userInputField: UITextField!
    @IBOutlet weak var chatDisplay: UITextView!
    
    let backendURL = "http://your-backend-url/eliza" // Replace with your server URL
    
    @IBAction func sendMessage(_ sender: UIButton) {
        guard let userInput = userInputField.text, !userInput.isEmpty else { return }
        
        // Send user input to the backend
        let request = URLRequest(url: URL(string: backendURL)!)
        var urlRequest = request
        urlRequest.httpMethod = "POST"
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let messageData = ["userInput": userInput]
        guard let httpBody = try? JSONSerialization.data(withJSONObject: messageData, options: []) else { return }
        urlRequest.httpBody = httpBody
        
        URLSession.shared.dataTask(with: urlRequest) { (data, response, error) in
            if let error = error {
                print("Error sending message: \(error.localizedDescription)")
                return
            }
            
            guard let data = data else { return }
            
            if let jsonResponse = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
               let elizaResponse = jsonResponse["elizaResponse"] as? String {
                DispatchQueue.main.async {
                    // Update chat display with Eliza's response
                    self.chatDisplay.text += "\nYou: \(userInput)\nEliza: \(elizaResponse)"
                }
            }
        }.resume()
    }
}