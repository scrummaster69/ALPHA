import UIKit

class ComputeViewController: UIViewController {
    @IBOutlet weak var inputFieldA: UITextField!
    @IBOutlet weak var inputFieldB: UITextField!
    @IBOutlet weak var resultLabel: UILabel!

    let backendURL = "http://your-backend-url/compute"

    @IBAction func computeButtonPressed(_ sender: UIButton) {
        guard let aText = inputFieldA.text, let bText = inputFieldB.text,
              let a = Int(aText), let b = Int(bText) else { return }

        // Prepare the request
        let requestURL = URL(string: backendURL)!
        var request = URLRequest(url: requestURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let requestBody = ["a": a, "b": b]
        request.httpBody = try? JSONSerialization.data(withJSONObject: requestBody, options: [])

        // Send the request
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error.localizedDescription)")
                return
            }

            if let data = data, let response = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
               let result = response["result"] as? Int {
                DispatchQueue.main.async {
                    self.resultLabel.text = "Result: \(result)"
                }
            }
        }.resume()
    }
}

