from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample data (replace with your actual data source)
products = [
    {"name": "Product A", "price": "$10", "website": "Amazon"},
    {"name": "Product B", "price": "$20", "website": "Mercado Livre"},
    {"name": "Product C", "price": "$30", "website": "Shopee"},
]

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        text_input = request.form.get("text-input")
        selected_websites = request.form.getlist("websites[]")  # Get multiple selected websites

        if not text_input:
            return jsonify({"error": "Text input cannot be empty."}), 400
        if not selected_websites:
            return jsonify({"error": "Please select at least one website."}), 400

        # Process data (your Python logic here)
        results = [
            product for product in products
            if text_input.lower() in product["name"].lower() and product["website"] in selected_websites
        ]
        return jsonify({"results": results}) # Return JSON data
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)