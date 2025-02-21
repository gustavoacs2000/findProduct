function addItem(value) {
  const multiValueInput = document.getElementById("multi-value-input");
  const items = multiValueInput.querySelectorAll(".item span"); // Get all existing item spans
  const values = Array.from(items).map((span) => span.textContent); // Extract their text content

  if (values.includes(value)) {
    alert("Website already selected, please choose a different one");
    return; // Item already exists, do nothing
  }

  const item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `<span>${value}</span><button onclick="removeItem(this)">X</button>`;
  multiValueInput.appendChild(item);
}

function removeItem(button) {
  const item = button.parentNode;
  const multiValueInput = document.getElementById("multi-value-input");
  multiValueInput.removeChild(item);
}

function validateForm() {
  const textInput = document.getElementById("text-input"); // Replace 'text-input' with the actual ID of your text input
  const multiValueInput = document.getElementById("multi-value-input"); // Replace 'multi-value-input' with the actual ID

  if (textInput.value.trim() === "") {
    // Check for empty or whitespace-only text input
    alert("Text input cannot be empty.");
    textInput.focus(); // Set focus back to the text input
    return false; // Prevent form submission
  }

  if (multiValueInput.children.length === 0) {
    // Check if no items are selected in multi-value input
    alert("Please select at least one option.");
    multiValueInput.click();
    return false; // Prevent form submission
  }

  return true; // Allow form submission if both inputs are valid
}

// Sample data (replace with actual data from your server)
const searchResults = [
  { name: "Product A", price: "$10", website: "Amazon" },
  { name: "Product B", price: "$20", website: "Mercado Livre" },
  { name: "Product C", price: "$30", website: "Shopee" },
];

const form = document.getElementById("product-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    const formData = new FormData(form); // Use FormData to easily collect form data

    fetch("/", {
      // Send data to your Flask route
      method: "POST",
      body: formData, // Send the form data
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          }); // Throw error for non-2xx responses
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        displayResults(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during the search.");
      });
  }
});

// Function to display results (call this after successful form submission)
function displayResults(results) {
  const resultsContainer = document.getElementById("results-container");
  const resultsContent = document.getElementById("results-content");

  resultsContent.innerHTML = ""; // Clear previous results

  if (results && results.length > 0) {
    results.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Website: ${product.website}</p>
          <hr>
        `;
      resultsContent.appendChild(productDiv);
    });
  } else {
    resultsContent.innerHTML = "<p>No results found.</p>";
  }

  resultsContainer.style.display = "block"; // Show the results container
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  if (validateForm()) {
    // If validation passes
    // Simulate an asynchronous request (replace with your actual fetch or AJAX call)
    setTimeout(() => {
      // Replace this with your actual data fetching logic
      displayResults(searchResults); // Display the results
    }, 500); // Simulate a 0.5-second delay
  }
});
