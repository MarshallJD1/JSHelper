// app.js
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll('li[data-example]');
  const container = document.getElementById("example-container");

  // Handle navigation item clicks
  navItems.forEach(item => {
    item.addEventListener("click", (event) => {
      event.preventDefault();  // Prevent default link behavior

      const example = item.dataset.example;  // Get the example ID
      console.log(`Example ID: ${example}`);  // Log the example ID for debugging

      // Call the loadExample function and pass the example ID and container
      loadExample(example, container);
    });
  });

  // Handle collapsible array links separately to prevent conflict
  const arraysLink = document.querySelector('li[data-example="6"]');
  const collapseLinks = document.querySelectorAll('#arrays-collapse a');

  arraysLink.addEventListener("click", () => {
    const collapse = document.getElementById('arrays-collapse');
    collapse.classList.toggle("collapse");
  });

  collapseLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();  // Prevent the collapse toggle
    });
  });

  function loadExample(exampleId, container) {
    switch (exampleId) {
      case "1":
        setupExample1();
        break;
      case "2":
        setupExample2();
        break;
      case "3":
        setupExample3();
        break;
      case "4":
        setupExample4();
        break;
      case "5":
        setupExample5();
        break;
      case "6":
        setupArraysConcepts(container); // New case for Arrays
        break;
      case "7":
        setupExample7(container);
        break;
      case "8":
        setupExample8(container);
       break;
      case "9":
        container.innerHTML = `<h2>Objects</h2><p>This is where the content for Example 9 will go.</p>`;
        break;
      case "10":
        container.innerHTML = `<h2>Drag & Drop</h2><p>This is where the content for Example 10 will go.</p>`;
        break;
      default:
        // Handle default case if needed
        break;
    }
  }
  

  // Example 1 - Event Listeners & DOM Manipulation
  function setupExample1() {
    container.innerHTML = `
      <h2>Event Listeners & DOM Manipulation</h2>
      <p>This example demonstrates how event listeners work and how we can manipulate elements with JavaScript.</p>

      <!-- Color Picker Input -->
      <label for="color-picker">Choose a color:</label>
      <input type="color" id="color-picker" name="color-picker" value="#ff0000">

      <!-- Box to change color -->
      <div id="color-box" style="background-color: #ff0000; width: 200px; height: 200px;"></div>

      <!-- Button to trigger color change -->
      <button id="change-color">Change Color</button>

      <h3>How It Works</h3>
      <p>This example demonstrates the use of an <strong>event listener</strong> to detect a button click, and <strong>DOM manipulation</strong> to change the background color of a div element.</p>
      <p>When you click the "Change Color" button, the event listener triggers the function that changes the color of the box. You can also select a custom color using the color picker.</p>

      <!-- Display the JavaScript code -->
      <pre id="code-output"></pre>
    `;

    // Once content is injected, now add the JavaScript functionality
    const button = document.getElementById("change-color");
    const box = document.getElementById("color-box");
    const colorPicker = document.getElementById("color-picker");
    const codeOutput = document.getElementById("code-output");

    button.addEventListener("click", () => {
      const currentColor = box.style.backgroundColor;
      const newColor = colorPicker.value;

      // Code to be displayed in the output
      const jsCode = [
        `const box = document.getElementById("color-box");`,
        `const newColor = "${newColor}";`,
        `box.style.backgroundColor = newColor;`,
      ];

      // Render code with line numbers
      codeOutput.innerHTML = jsCode
        .map((line, index) => `<span class="code-line" data-line="${index}">${line}</span>`)
        .join("\n");

      // Highlight each line sequentially and add visual feedback for box selection
      const lines = document.querySelectorAll(".code-line");
      let i = 0;

      function highlightLine() {
        if (i > 0) {
          lines[i - 1].classList.remove("highlight");

          // Remove border from the box after the first line
          if (i - 1 === 0) {
            box.classList.remove("selected-box");
          }
        }

        if (i < lines.length) {
          lines[i].classList.add("highlight");

          // Add a border to the box when the first line is highlighted
          if (i === 0) {
            box.classList.add("selected-box");
          }

          i++;
          setTimeout(highlightLine, 1000); // Delay for each highlight
        }
      }
      highlightLine();

      // Add the color transition before applying the new color
      setTimeout(() => {
        // Set transition for the color change
        box.style.transition = "background-color 1s ease";

        // Animate color change by updating the background color
        box.style.backgroundColor = newColor;

        // Highlight the final code line after transition is applied
        setTimeout(() => {
          // Reset transition after change
          box.style.transition = "";
        }, 1000); // Delay for 1 second (duration of the color transition)
      }, 2000); // Wait for 2 seconds to highlight the color change code first
    });
  }

  // Example 2 - Loops & List Creation
  function setupExample2() {
    container.innerHTML = `
      <h2>Loops, List Creation, and Dynamic DOM Manipulation</h2>
      <p>This example demonstrates how to dynamically create a list with JavaScript and remove items using a delete button. You'll learn how to use loops, create DOM elements, and add event listeners to manipulate the DOM in real-time.</p>
      <label for="item-input">Enter item:</label>
      <input type="text" id="item-input" name="item-input">
      <button id="add-item">Add Item</button>
      <ul id="item-list"></ul>
      <h3>How It Works</h3>
      <p>We use a <strong>for loop</strong> to iterate over a set of data and generate HTML content. The <strong>createElement()</strong> and <strong>appendChild()</strong> methods are used to add new items to the list, while an event listener is used to delete an item when the "Delete" button is clicked.</p>
      <pre id="code-output"></pre>
    `;

    const button = document.getElementById("add-item");
    const input = document.getElementById("item-input");
    const list = document.getElementById("item-list");
    const codeOutput = document.getElementById("code-output");

    button.addEventListener("click", () => {
      const itemText = input.value;

      if (itemText.trim() === "") return;  // Don't add empty items

      const listItem = document.createElement("li");
      listItem.textContent = itemText;

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        listItem.remove();
        showDeleteCode(itemText);
      });

      listItem.appendChild(deleteButton);
      list.appendChild(listItem);

      input.value = ""; // Clear input field

      showAddItemCode(itemText);
    });

    // Function to display code for adding items
    function showAddItemCode(itemText) {
      const jsCode = [
        `const itemText = "${itemText}";`,
        `const listItem = document.createElement("li");`,
        `listItem.textContent = itemText;`,
        `const deleteButton = document.createElement("button");`,
        `deleteButton.textContent = "Delete";`,
        `deleteButton.addEventListener("click", () => { listItem.remove(); });`,
        `listItem.appendChild(deleteButton);`,
        `list.appendChild(listItem);`
      ];

      codeOutput.innerHTML = jsCode
        .map((line, index) => `<span class="code-line" data-line="${index}">${line}</span>`)
        .join("\n");

      highlightCodeLines(jsCode);
    }

    // Function to display code for deleting items
    function showDeleteCode(itemText) {
      const jsCode = [
        `const listItem = document.querySelector("li:contains('${itemText}')");`,
        `listItem.remove();`
      ];

      codeOutput.innerHTML = jsCode
        .map((line, index) => `<span class="code-line" data-line="${index}">${line}</span>`)
        .join("\n");

      highlightCodeLines(jsCode);
    }

    // Highlight code lines one by one
    function highlightCodeLines(jsCode) {
      const lines = document.querySelectorAll(".code-line");
      let i = 0;

      function highlightLine() {
        if (i > 0) {
          lines[i - 1].classList.remove("highlight");
        }

        if (i < lines.length) {
          lines[i].classList.add("highlight");
          i++;
          setTimeout(highlightLine, 1000); // Delay for each highlight
        }
      }
      highlightLine();
    }
  }
  // Example 3 - Form Validation
 
  function setupExample3() {
    // Inject the HTML content for the form
    container.innerHTML = `
      <h2>Form Validation with Server Simulation</h2>
      <p>This example demonstrates how to validate a form and send the data to a mock server using JavaScript.</p>
  
      <!-- Form HTML inside example-container -->
      <form id="user-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <span class="error" id="name-error"></span><br><br>
  
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error" id="email-error"></span><br><br>
  
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <span class="error" id="password-error"></span><br><br>
  
        <button type="submit">Submit</button>
      </form>
  
      <p id="form-message"></p>
      <h3>How It Works</h3>
      <p>This example demonstrates real-time form validation as you type, providing feedback and highlighting invalid fields.</p>
      <pre id="code-output"></pre>
    `;
  
    // Get references to the form elements
    const form = document.getElementById("user-form");
    const formMessage = document.getElementById("form-message");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    // Form validation logic
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the form from submitting the traditional way
  
      // Clear previous error messages
      document.querySelectorAll(".error").forEach(error => error.textContent = "");
  
      let isValid = true;
  
      // Validate name
      if (nameInput.value.trim() === "") {
        isValid = false;
        document.getElementById("name-error").textContent = "Name is required!";
      }
  
      // Validate email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
      }
  
      // Validate password
      if (passwordInput.value.length < 6) {
        isValid = false;
        document.getElementById("password-error").textContent = "Password must be at least 6 characters long.";
      }
  
      // Show success message if form is valid
      if (isValid) {
        formMessage.textContent = "Form submitted successfully!";
        formMessage.style.color = "green";
  
        // Prepare data to be sent to the server
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };
  
        // Send data to the mock server (JSONPlaceholder)
        sendToServer(formData);
      } else {
        formMessage.textContent = "Please fix the errors above.";
        formMessage.style.color = "red";
      }
  
      // Show the JavaScript code for validation
      showValidationCode();
    });
  
    // Function to display the validation code
    function showValidationCode() {
      const jsCode = [
        `const form = document.getElementById("user-form");`,
        `const nameInput = document.getElementById("name");`,
        `const emailInput = document.getElementById("email");`,
        `const passwordInput = document.getElementById("password");`,
        `form.addEventListener("submit", (event) => {`,
        `  event.preventDefault();`,
        `  document.querySelectorAll(".error").forEach(error => error.textContent = "");`,
        `  let isValid = true;`,
        `  if (nameInput.value.trim() === "") {`,
        `    isValid = false;`,
        `    document.getElementById("name-error").textContent = "Name is required!";`,
        `  }`,
        `  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;`,
        `  if (!emailRegex.test(emailInput.value)) {`,
        `    isValid = false;`,
        `    document.getElementById("email-error").textContent = "Please enter a valid email address.";`,
        `  }`,
        `  if (passwordInput.value.length < 6) {`,
        `    isValid = false;`,
        `    document.getElementById("password-error").textContent = "Password must be at least 6 characters long.";`,
        `  }`,
        `  if (isValid) {`,
        `    document.getElementById("form-message").textContent = "Form submitted successfully!";`,
        `    document.getElementById("form-message").style.color = "green";`,
        `  } else {`,
        `    document.getElementById("form-message").textContent = "Please fix the errors above.";`,
        `    document.getElementById("form-message").style.color = "red";`,
        `  }`,
        `});`
      ];
  
      const codeOutput = document.getElementById("code-output");
  
      // Display each line of code in the output section
      codeOutput.innerHTML = jsCode
        .map((line, index) => `<span class="code-line" data-line="${index}">${line}</span>`)
        .join("\n");
  
      // Highlight code lines one by one
      highlightCodeLines(jsCode);
    }
  
    // Highlight code lines one by one
    function highlightCodeLines(jsCode) {
      const lines = document.querySelectorAll(".code-line");
      let i = 0;
  
      function highlightLine() {
        if (i > 0) {
          lines[i - 1].classList.remove("highlight");
        }
  
        if (i < lines.length) {
          lines[i].classList.add("highlight");
          i++;
          setTimeout(highlightLine, 1000); // Delay for each highlight
        }
      }
      highlightLine();
    }
  
    // Function to send the form data to the mock server (JSONPlaceholder)
    async function sendToServer(data) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        // Check if the request was successful
        if (response.ok) {
          const result = await response.json();
          console.log('Server Response:', result);
          formMessage.textContent = "Data submitted successfully to the server!";
          formMessage.style.color = "blue";
        } else {
          formMessage.textContent = "There was an issue submitting the data.";
          formMessage.style.color = "red";
        }
      } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = "Error submitting data.";
        formMessage.style.color = "red";
      }
    }
  }
  function setupExample4() {
    container.innerHTML = `
      <h2>Animations</h2>
      <p>This example demonstrates how to apply different animations to an element using JavaScript.</p>
  
      <!-- Dropdown for selecting animation -->
      <label for="animation-select">Choose an animation:</label>
      <select id="animation-select">
        <option value="fadeIn">Fade In</option>
        <option value="fadeOut">Fade Out</option>
        <option value="bounce">Bounce</option>
        <option value="slideIn">Slide In</option>
        <option value="scaleUp">Scale Up</option>
        <option value="rotate">Rotate</option>
        <option value="shake">Shake</option>
      </select>
  
      <!-- Test element to animate -->
      <div id="test-element" style="width: 100px; height: 100px; background-color: skyblue; margin-top: 20px;"></div>
  
      <h3>How It Works</h3>
      <p>This example demonstrates how to apply CSS animations to an element using JavaScript. Select an animation from the dropdown to see the effect.</p>
  
      <!-- Display the JavaScript code -->
      <pre id="code-output"></pre>
    `;
    
    // Get references to the select element and the test element
    const select = document.getElementById("animation-select");
    const testElement = document.getElementById("test-element");
    const codeOutput = document.getElementById("code-output");
  
    // Function to handle animation selection
    select.addEventListener("change", () => {
      const animation = select.value;
      applyAnimation(animation);
      displayCode(animation);
    });
  
    // Function to apply animation to the test element
    function applyAnimation(animation) {
      testElement.style.animation = ""; // Reset previous animation
      testElement.classList.remove("animate");
      
      // Apply selected animation
      switch (animation) {
        case "fadeIn":
          testElement.style.animation = "fadeIn 2s forwards";
          break;
        case "fadeOut":
          testElement.style.animation = "fadeOut 2s forwards";
          break;
        case "bounce":
          testElement.style.animation = "bounce 1s infinite";
          break;
        case "slideIn":
          testElement.style.animation = "slideIn 1s forwards";
          break;
        case "scaleUp":
          testElement.style.animation = "scaleUp 1s forwards";
          break;
        case "rotate":
          testElement.style.animation = "rotate 2s infinite";
          break;
        case "shake":
          testElement.style.animation = "shake 0.5s infinite";
          break;
        default:
          break;
      }
    }
  
    // Function to display the JavaScript code for the animation
    function displayCode(animation) {
      let jsCode;
      
      switch (animation) {
        case "fadeIn":
          jsCode = `testElement.style.animation = "fadeIn 2s forwards";`;
          break;
        case "fadeOut":
          jsCode = `testElement.style.animation = "fadeOut 2s forwards";`;
          break;
        case "bounce":
          jsCode = `testElement.style.animation = "bounce 1s infinite";`;
          break;
        case "slideIn":
          jsCode = `testElement.style.animation = "slideIn 1s forwards";`;
          break;
        case "scaleUp":
          jsCode = `testElement.style.animation = "scaleUp 1s forwards";`;
          break;
        case "rotate":
          jsCode = `testElement.style.animation = "rotate 2s infinite";`;
          break;
        case "shake":
          jsCode = `testElement.style.animation = "shake 0.5s infinite";`;
          break;
        default:
          jsCode = "";
          break;
      }
  
      codeOutput.innerHTML = `<span class="code-line">${jsCode}</span>`;
      highlightCodeLines([jsCode]);
    }
  
    // Highlight code lines (same function from previous examples)
    function highlightCodeLines(jsCode) {
      const lines = document.querySelectorAll(".code-line");
      let i = 0;
  
      function highlightLine() {
        if (i > 0) {
          lines[i - 1].classList.remove("highlight");
        }
  
        if (i < lines.length) {
          lines[i].classList.add("highlight");
          i++;
          setTimeout(highlightLine, 1000); // Delay for each highlight
        }
      }
      highlightLine();
    }
}

function setupExample5() {
  container.innerHTML = `
      <h2>Fetch API and Data Display</h2>
      <p>This example demonstrates how to use the Fetch API to retrieve data from an external server and display it dynamically on the page.</p>
      <button id="fetch-data">Fetch User Data</button>
      <button id="convert-to-table" style="display:none;">Convert Data to Table</button>
      <h3>Fetched Data</h3>
      <ul id="data-list"></ul>
      <h3>JavaScript Code</h3>
      <pre id="code-output"></pre>
  `;
  
  // Get references to the button and the data list
  const fetchButton = document.getElementById("fetch-data");
  const convertButton = document.getElementById("convert-to-table");
  const dataList = document.getElementById("data-list");
  const codeOutput = document.getElementById("code-output");

  // Event listener for button click
  fetchButton.addEventListener("click", fetchData);
  convertButton.addEventListener("click", convertToTable);

  // Fetch data from an API and display it
  function fetchData() {
      fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json()) // Parse the JSON data
          .then(users => {
              displayData(users); // Display the fetched data
              displayCodeStep1(); // Display only the fetch code
              convertButton.style.display = "inline-block"; // Show the 'Convert to Table' button
          })
          .catch(error => {
              console.error("Error fetching data:", error);
              dataList.innerHTML = "<li>Error fetching data</li>"; // Error handling
          });
  }

  // Display the fetched data in a list
  function displayData(users) {
      // Clear any previous data
      dataList.innerHTML = "";
      
      // Loop through the fetched users and create list items
      users.forEach(user => {
          const li = document.createElement("li");
          li.textContent = `${user.name} - ${user.email}`;
          dataList.appendChild(li);
      });
  }

  // Convert the fetched data to a table
  function convertToTable() {
      fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json()) // Parse the JSON data
          .then(users => {
              // Clear any previous table
              dataList.innerHTML = "";

              // Create the table
              const table = document.createElement("table");
              table.style.width = "100%";
              table.style.borderCollapse = "collapse";
              table.innerHTML = `
                  <thead>
                      <tr>
                          <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                          <th style="border: 1px solid #ddd; padding: 8px;">Email</th>
                          <th style="border: 1px solid #ddd; padding: 8px;">Phone</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${users.map(user => `
                          <tr>
                              <td style="border: 1px solid #ddd; padding: 8px;">${user.name}</td>
                              <td style="border: 1px solid #ddd; padding: 8px;">${user.email}</td>
                              <td style="border: 1px solid #ddd; padding: 8px;">${user.phone}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              `;
              // Append the table to the data list container
              dataList.appendChild(table);

              // Display the code for converting the data into a table
              displayCodeStep2();
          })
          .catch(error => {
              console.error("Error fetching data:", error);
              dataList.innerHTML = "<li>Error converting data to table</li>"; // Error handling
          });
  }

  // Display the JavaScript code for fetching data (Step 1)
  function displayCodeStep1() {
      const jsCode = `
          fetch("https://jsonplaceholder.typicode.com/users")
              .then(response => response.json())
              .then(users => {
                  // Loop through and display users in a list
                  users.forEach(user => {
                      const li = document.createElement("li");
                      li.textContent = \`\${user.name} - \${user.email}\`;
                      dataList.appendChild(li);
                  });
              })
              .catch(error => {
                  console.error("Error fetching data:", error);
              });
      `;
      
      codeOutput.innerHTML = `<span class="code-line">${jsCode}</span>`;
      highlightCodeLines([jsCode]); // Highlight code lines
  }

  // Display the JavaScript code for converting data to a table (Step 2)
  function displayCodeStep2() {
      const jsCode = `
          fetch("https://jsonplaceholder.typicode.com/users")
              .then(response => response.json())
              .then(users => {
                  // Create a table from the users data
                  const table = document.createElement("table");
                  table.innerHTML = \`
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                          </tr>
                      </thead>
                      <tbody>
                          \${users.map(user => \`
                              <tr>
                                  <td>\${user.name}</td>
                                  <td>\${user.email}</td>
                                  <td>\${user.phone}</td>
                              </tr>
                          \`).join('')}
                      </tbody>
                  \`;
                  dataList.appendChild(table);
              })
              .catch(error => {
                  console.error("Error converting data to table:", error);
              });
      `;
      
      // Replace the previous code block with this one (keeping only one block visible)
      codeOutput.innerHTML = `<span class="code-line">${jsCode}</span>`;
      highlightCodeLines([jsCode]); // Highlight code lines
  }

  // Highlight code lines (same function from previous examples)
  function highlightCodeLines(jsCode) {
      const lines = document.querySelectorAll(".code-line");
      let i = 0;

      function highlightLine() {
          if (i > 0) {
              lines[i - 1].classList.remove("highlight");
          }

          if (i < lines.length) {
              lines[i].classList.add("highlight");
              i++;
              setTimeout(highlightLine, 1000); // Delay for each highlight
          }
      }
      highlightLine();
  }
}






function setupInteractiveCreateArrays(container) {
  // Clear container and set up the interface
  container.innerHTML = `
    <h3>Creating and Initializing Arrays</h3>
    <p>Enter values to create an array:</p>
    <label for="arrayValues">Enter comma-separated values:</label>
    <input type="text" id="arrayValues" placeholder="e.g., apple, banana, cherry">
    <h4>Array Preview:</h4>
    <ul id="arrayPreview"></ul>
    <h4>Generated Code:</h4>
    <pre id="codeDisplay">let fruits = [];</pre>
  `;

  const arrayValuesInput = document.getElementById('arrayValues');
  const arrayPreview = document.getElementById('arrayPreview');
  const codeDisplay = document.getElementById('codeDisplay');
  
  // Function to update array preview and code
  function updateArrayDisplay() {
    const inputValue = arrayValuesInput.value.trim();
    const valuesArray = inputValue.split(',').map(value => value.trim()).filter(value => value !== "");
    
    // Update the preview list
    arrayPreview.innerHTML = "";
    valuesArray.forEach(value => {
      const listItem = document.createElement('li');
      listItem.textContent = value;
      arrayPreview.appendChild(listItem);
    });
    
    // Update the generated code
    const generatedCode = `let fruits = [${valuesArray.map(val => `"${val}"`).join(', ')}];`;
    codeDisplay.textContent = generatedCode;
  }
  
  // Set up the event listener for input
  arrayValuesInput.addEventListener('input', updateArrayDisplay);
  
  // Initial display update
  updateArrayDisplay();
}


function setupInteractiveAccessAndModify(container) {
  let userArray = [];
  let history = [];
  let historyIndex = -1;

  // Clear container and set up the interface
  container.innerHTML = `
    <h3>Accessing and Modifying Array Elements</h3>
    <p>Enter your own array and click to modify any of its elements.</p>
    <h4>Create Your Array:</h4>
    <label for="userArrayInput">Array:</label>
    <input type="text" id="userArrayInput" placeholder='Enter an array like ["apple", "banana", "cherry"]'>
    <button id="createArrayButton">Create Array</button>
    <h4>Your Array Preview:</h4>
    <ul id="userArrayPreview"></ul>
    <h4>Modify by Index:</h4>
    <label for="modifyIndex">Index:</label>
    <input type="number" id="modifyIndex" placeholder="Enter index">
    <label for="modifyValueByIndex">New Value:</label>
    <input type="text" id="modifyValueByIndex" placeholder="New value for index">
    <button id="modifyValueAtIndex">Modify Element by Index</button>
    <button id="undoChanges">Undo</button>
    <button id="redoChanges">Redo</button>
    <h4>Generated Code:</h4>
    <pre id="codeDisplay">let fruits = ["apple", "banana", "cherry"];</pre>
    <p>Array Length: <span id="arrayLength"></span></p>
  `;

  const userArrayInput = document.getElementById('userArrayInput');
  const createArrayButton = document.getElementById('createArrayButton');
  const userArrayPreview = document.getElementById('userArrayPreview');
  const modifyIndexInput = document.getElementById('modifyIndex');
  const modifyValueByIndexInput = document.getElementById('modifyValueByIndex');
  const modifyValueAtIndexButton = document.getElementById('modifyValueAtIndex');
  const undoButton = document.getElementById('undoChanges');
  const redoButton = document.getElementById('redoChanges');
  const codeDisplay = document.getElementById('codeDisplay');
  const arrayLengthDisplay = document.getElementById('arrayLength');

  // Function to update the array preview and code
  function updateArrayDisplay() {
    userArrayPreview.innerHTML = "";
    userArray.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index}: ${item}`;
      listItem.addEventListener('click', () => {
        modifyIndexInput.value = index;  // Set the clicked element's index into the input
        modifyValueByIndexInput.value = item;  // Set the clicked element's value into the input
      });
      userArrayPreview.appendChild(listItem);
    });
    arrayLengthDisplay.textContent = userArray.length;
  }

  // Function to create the array from the user input
  function createArrayFromInput() {
    const inputArray = userArrayInput.value.trim();
    try {
      userArray = JSON.parse(inputArray); // Parse the input to an array
      if (Array.isArray(userArray)) {
        updateArrayDisplay();  // Re-render the array list
        const generatedCode = `let userArray = ${JSON.stringify(userArray)};`;
        codeDisplay.textContent = generatedCode;  // Show the generated code
      } else {
        alert("Please enter a valid array.");
      }
    } catch (e) {
      alert("Invalid array format. Please enter a valid array (e.g., [\"apple\", \"banana\"]).");
    }
  }

  // Function to modify an element in the array by index
  function modifyElementByIndex() {
    const index = parseInt(modifyIndexInput.value);
    const newValue = modifyValueByIndexInput.value.trim();
    if (index >= 0 && index < userArray.length && newValue) {
      const oldArray = [...userArray];
      userArray[index] = newValue;  // Modify the element by index
      saveHistory(oldArray);
      updateArrayDisplay();  // Re-render the array list
      const generatedCode = `let userArray = ${JSON.stringify(userArray)};`;
      codeDisplay.textContent = generatedCode;  // Show the updated code
    }
  }

  // Save history for undo/redo functionality
  function saveHistory(oldArray) {
    history.push(oldArray);
    historyIndex++;
    undoButton.disabled = false;
    redoButton.disabled = true;
  }

  // Undo functionality
  function undoChanges() {
    if (historyIndex >= 0) {
      userArray.splice(0, userArray.length, ...history[historyIndex]);
      historyIndex--;
      updateArrayDisplay();
      const generatedCode = `let userArray = ${JSON.stringify(userArray)};`;
      codeDisplay.textContent = generatedCode;
      redoButton.disabled = false;
    }
  }

  // Redo functionality
  function redoChanges() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      userArray.splice(0, userArray.length, ...history[historyIndex]);
      updateArrayDisplay();
      const generatedCode = `let userArray = ${JSON.stringify(userArray)};`;
      codeDisplay.textContent = generatedCode;
      undoButton.disabled = false;
    }
  }

  // Set event listeners
  createArrayButton.addEventListener('click', createArrayFromInput);
  modifyValueAtIndexButton.addEventListener('click', modifyElementByIndex);
  undoButton.addEventListener('click', undoChanges);
  redoButton.addEventListener('click', redoChanges);

  // Initial setup
  updateArrayDisplay();
}






function setupInteractiveIterateArrays(container) {
  let userArray = [];

  // Setup the container
  container.innerHTML = `
    <h3>Iterating Through Arrays</h3>
    <p>
      Iterating through arrays is a core programming concept. It allows you to perform actions on each element, such as calculations, filtering, or transforming data.
      Use the examples below to understand how different loops work and what can be done with the data.
    </p>
    <h4>Create Your Array:</h4>
    <input type="text" id="userArrayInput" placeholder="Enter an array like [1, 2, 3]">
    <button id="createArrayButton">Create Array</button>
    <h4>Select a Loop:</h4>
    <select id="loopType">
      <option value="for">For Loop</option>
      <option value="while">While Loop</option>
      <option value="doWhile">Do-While Loop</option>
      <option value="forEach">forEach()</option>
    </select>
    <h4>Select an Example:</h4>
    <select id="exampleType">
      <option value="sum">Sum Array</option>
      <option value="filterEven">Filter Even Numbers</option>
      <option value="transform">Double Each Value</option>
      <option value="findMax">Find Maximum Value</option>
      <option value="countOccurrences">Count Occurrences of a Value</option>
    </select>
    <input type="text" id="targetValueInput" placeholder="Enter a value for counting" style="display:none;">
    <button id="runExampleButton">Run Example</button>
    <h4>Your Array:</h4>
    <ul id="userArrayPreview"></ul>
    <h4>Example Output:</h4>
    <pre id="exampleOutput"></pre>
    <h4>Generated Code:</h4>
    <pre id="codeDisplay"></pre>
  `;

  const userArrayInput = document.getElementById('userArrayInput');
  const createArrayButton = document.getElementById('createArrayButton');
  const loopTypeSelect = document.getElementById('loopType');
  const exampleTypeSelect = document.getElementById('exampleType');
  const targetValueInput = document.getElementById('targetValueInput');
  const runExampleButton = document.getElementById('runExampleButton');
  const userArrayPreview = document.getElementById('userArrayPreview');
  const exampleOutput = document.getElementById('exampleOutput');
  const codeDisplay = document.getElementById('codeDisplay');

  // Show/Hide target value input for specific examples
  exampleTypeSelect.addEventListener('change', () => {
    if (exampleTypeSelect.value === 'countOccurrences') {
      targetValueInput.style.display = 'block';
    } else {
      targetValueInput.style.display = 'none';
    }
  });

  // Update array preview
  function updateArrayDisplay() {
    userArrayPreview.innerHTML = '';
    userArray.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `Index ${index}: ${item}`;
      userArrayPreview.appendChild(li);
    });
    codeDisplay.textContent = `let userArray = ${JSON.stringify(userArray)};`;
  }

  // Create array
  createArrayButton.addEventListener('click', () => {
    try {
      const input = JSON.parse(userArrayInput.value);
      if (Array.isArray(input)) {
        userArray = input;
        updateArrayDisplay();
      } else {
        alert('Please enter a valid array!');
      }
    } catch {
      alert('Invalid input! Use JSON format like [1, 2, 3].');
    }
  });

  // Run selected example
  runExampleButton.addEventListener('click', () => {
    if (userArray.length === 0) {
      alert('Please create an array first!');
      return;
    }

    const loopType = loopTypeSelect.value;
    const exampleType = exampleTypeSelect.value;
    let result = [];
    let codeSnippet = '';

    try {
      switch (exampleType) {
        case 'sum':
          // Existing "Sum Array" logic (unchanged) ...

        case 'filterEven':
          // Existing "Filter Even Numbers" logic (unchanged) ...

        case 'transform':
          // Existing "Double Each Value" logic (unchanged) ...

        case 'findMax':
          codeSnippet = `
let max = userArray[0];
${loopType === 'for' ? 'for (let i = 1; i < userArray.length; i++)' :
  loopType === 'while' ? 'let i = 1; while (i < userArray.length)' :
  loopType === 'doWhile' ? 'let i = 1; do' : 'userArray.forEach(item =>'}
{
  if (${loopType === 'for' || loopType === 'while' || loopType === 'doWhile' ? 'userArray[i]' : 'item'} > max) {
    max = ${loopType === 'for' || loopType === 'while' || loopType === 'doWhile' ? 'userArray[i]' : 'item'};
  }
}${loopType === 'doWhile' ? ' while (i < userArray.length);' : ''}
          `;
          let max = userArray[0];
          if (loopType === 'for') {
            for (let i = 1; i < userArray.length; i++) {
              if (userArray[i] > max) max = userArray[i];
            }
          } else if (loopType === 'while') {
            let i = 1;
            while (i < userArray.length) {
              if (userArray[i] > max) max = userArray[i];
              i++;
            }
          } else if (loopType === 'doWhile') {
            let i = 1;
            do {
              if (userArray[i] > max) max = userArray[i];
              i++;
            } while (i < userArray.length);
          } else {
            userArray.forEach(item => {
              if (item > max) max = item;
            });
          }
          result = max;
          break;

        case 'countOccurrences':
          const targetValue = JSON.parse(targetValueInput.value);
          codeSnippet = `
let count = 0;
${loopType === 'for' ? 'for (let i = 0; i < userArray.length; i++)' :
  loopType === 'while' ? 'let i = 0; while (i < userArray.length)' :
  loopType === 'doWhile' ? 'let i = 0; do' : 'userArray.forEach(item =>'}
{
  if (${loopType === 'for' || loopType === 'while' || loopType === 'doWhile' ? 'userArray[i]' : 'item'} === ${JSON.stringify(targetValue)}) {
    count++;
  }
}${loopType === 'doWhile' ? ' while (i < userArray.length);' : ''}
          `;
          let count = 0;
          if (loopType === 'for') {
            for (let i = 0; i < userArray.length; i++) {
              if (userArray[i] === targetValue) count++;
            }
          } else if (loopType === 'while') {
            let i = 0;
            while (i < userArray.length) {
              if (userArray[i] === targetValue) count++;
              i++;
            }
          } else if (loopType === 'doWhile') {
            let i = 0;
            do {
              if (userArray[i] === targetValue) count++;
              i++;
            } while (i < userArray.length);
          } else {
            userArray.forEach(item => {
              if (item === targetValue) count++;
            });
          }
          result = count;
          break;
      }

      // Update UI
      exampleOutput.textContent = `Result: ${JSON.stringify(result, null, 2)}`;
      codeDisplay.textContent = codeSnippet.trim();
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  });
}





function setupInteractiveSortingArrays(container) {
  container.innerHTML = `
    <h3>Sorting Arrays</h3>
    <p>Choose a sorting method!</p>

    <div id="algorithm-section">
      <div id="algorithm-details" class="centered"></div>
      <div id="real-life-example" class="right-side"></div>
    </div>
    
    <label for="algorithm-select">Select Algorithm:</label>
    <select id="algorithm-select">
      <option value="bubbleSort">Bubble Sort</option>
      <option value="selectionSort">Selection Sort</option>
      <option value="insertionSort">Insertion Sort</option>
      <option value="quickSort">Quick Sort</option>
    </select>
    
    <label for="data-type-select">Select Data Type:</label>
    <select id="data-type-select">
      <option value="numbers">Numbers</option>
      <option value="strings">Strings</option>
    </select>
    
    <button id="sort-btn">Sort Array</button>
    <div id="array-output"></div>
    <div id="result-output"></div>

    <h4>JavaScript Code:</h4>
    <pre id="code-output"></pre>

    <h4>Sorting Steps:</h4>
    <table id="steps-table">
      <thead>
        <tr>
          <th>Step Number</th>
          <th>Previous Array Values</th>
          <th>Current Array Values</th>
        </tr>
      </thead>
      <tbody id="steps-table-body"></tbody>
    </table>
  `;

  const sortBtn = document.getElementById("sort-btn");
  const arrayOutput = document.getElementById("array-output");
  const resultOutput = document.getElementById("result-output");
  const codeOutput = document.getElementById("code-output");
  const algorithmDetails = document.getElementById("algorithm-details");
  const realLifeExample = document.getElementById("real-life-example");
  const algorithmSelect = document.getElementById("algorithm-select");
  const dataTypeSelect = document.getElementById("data-type-select");
  const stepsTableBody = document.getElementById("steps-table-body");

  // Array sorting algorithms with explanations
  const sortingAlgorithms = {
    bubbleSort: {
      name: 'Bubble Sort',
      description: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.`,
      realLife: `Bubble Sort is useful for small datasets, like organizing a few cards by color or size.`,
      codeSnippet: function(array, sortedArray) {
        return `let array = [${array.join(", ")}]; // Initial Array
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
              [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            console.log(array); // Show array after each comparison
          }
        }
        let sortedArray = array; // Sorted Array: [ ${sortedArray.join(", ")} ]
        console.log(sortedArray);
        `;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length - i - 1; j++) {
            let previousArray = [...array]; // Clone the array for previous values
            if (array[j] > array[j + 1]) {
              [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            steps.push({
              previous: previousArray,
              current: [...array]
            });
            updateDisplay(steps);
          }
        }
        return array;
      }
    },
    // Other sorting algorithms omitted for brevity...

    quickSort: {
      name: 'Quick Sort',
      description: `Quick Sort is an efficient, divide-and-conquer algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two subarrays: those less than the pivot and those greater than the pivot. The subarrays are then recursively sorted, and the final sorted array is created by concatenating the sorted left subarray, the pivot, and the sorted right subarray. The algorithm's efficiency comes from its ability to work in-place without needing additional storage for temporary arrays.`,
      realLife: `Quick Sort is useful for sorting large datasets or for performance-critical applications.`,
      codeSnippet: function(array, sortedArray) {
        return `
        let array = [${array.join(", ")}]; // Initial Array
        function quickSort(arr) {
          if (arr.length <= 1) return arr;
          let pivot = arr[0];
          let left = [], right = [];
          for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) left.push(arr[i]);
            else right.push(arr[i]);
          }
          console.log('Left:', left);
          console.log('Right:', right);
          return [...quickSort(left), pivot, ...quickSort(right)];
        }
        let sortedArray = quickSort(array); // Sorted Array: [ ${sortedArray.join(", ")} ]
        console.log(sortedArray);
        `;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        
        // Update the quickSort to include step-by-step partitioning visualization
        function quickSort(arr, depth = 0) {
          if (arr.length <= 1) return arr;
          let pivot = arr[0];
          let left = [], right = [];
          for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) left.push(arr[i]);
            else right.push(arr[i]);
          }

          // Visualizing the current partitioning state
          steps.push({ previous: [...arr], current: [`Pivot: ${pivot}`, `Left: [${left.join(", ")}]`, `Right: [${right.join(", ")}]`] });
          
          updateDisplay(steps);

          // Recursively apply quickSort to the left and right arrays
          return [...quickSort(left, depth + 1), pivot, ...quickSort(right, depth + 1)];
        }

        return quickSort(array);
      }
    }
  };

  // Function to generate random array of numbers or strings
  function generateRandomArray(dataType) {
    const array = [];
    const arrayLength = Math.floor(Math.random() * 10) + 5;
    if (dataType === "numbers") {
      for (let i = 0; i < arrayLength; i++) {
        array.push(Math.floor(Math.random() * 100)); // Random numbers
      }
    } else if (dataType === "strings") {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < arrayLength; i++) {
        array.push(characters.charAt(Math.floor(Math.random() * characters.length)));
      }
    }
    return array;
  }

  // Function to update the algorithm details and display
  function updateAlgorithmDetails(algorithm, dataType) {
    let array = generateRandomArray(dataType);
    arrayOutput.textContent = `Array: [${array.join(", ")}]`;

    algorithmDetails.innerHTML = `
      <h4>${algorithm.name}</h4>
      <p>${algorithm.description}</p>
      <p><strong>Real-life Example:</strong> ${algorithm.realLife}</p>
    `;
    return array;
  }

  // Function to update the sorting steps display
  function updateDisplay(steps) {
    stepsTableBody.innerHTML = '';  // Clear previous steps
    steps.forEach((step, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>[${step.previous.join(", ")}]</td>
        <td>${step.current.join(", ")}</td>
      `;
      stepsTableBody.appendChild(row);
    });
  }

  // Sort button functionality
  sortBtn.addEventListener("click", function() {
    const selectedAlgorithmKey = algorithmSelect.value;
    const selectedAlgorithm = sortingAlgorithms[selectedAlgorithmKey];
    const selectedDataType = dataTypeSelect.value;

    const array = updateAlgorithmDetails(selectedAlgorithm, selectedDataType);

    // Clear previous sorted array
    resultOutput.innerHTML = '';

    // Perform the sorting and display the steps
    const sortedArray = selectedAlgorithm.sortFunction([...array], updateDisplay);

    // Final sorted array in the result
    resultOutput.innerHTML = `<h4>Sorted Array:</h4><pre>${JSON.stringify(sortedArray, null, 2)}</pre>`;
    codeOutput.textContent = selectedAlgorithm.codeSnippet(array, sortedArray);
  });
}



function setupInteractiveArrayMethods(container) {
  console.log("Setting up Array Methods example...");
  container.innerHTML = `
    <h2>Array Methods: Push, Pop, Shift, Unshift</h2>
    <p>
      Arrays can grow and shrink! Let's explore four methods that help us add or remove elements:
      <ul>
        <li><strong>Push:</strong> Add an element to the end of the array.</li>
        <li><strong>Pop:</strong> Remove the last element from the array.</li>
        <li><strong>Unshift:</strong> Add an element to the beginning of the array.</li>
        <li><strong>Shift:</strong> Remove the first element from the array.</li>
      </ul>
    </p>
    <div id="arrayMethodsVisual">
      <h3>Your Array:</h3>
      <div id="arrayVisual" style="display: flex; gap: 10px; margin-bottom: 20px;">
        <!-- Dynamic Array Elements Rendered Here -->
      </div>
      <p id="arrayFeedback"></p>
      <input type="text" id="arrayInput" placeholder="Enter a value" />
      <div style="margin: 10px 0;">
        <button id="pushButton" title="Add an element to the end of the array">Push (Add to End)</button>
        <button id="popButton" title="Remove the last element from the array">Pop (Remove from End)</button>
        <button id="unshiftButton" title="Add an element to the beginning of the array">Unshift (Add to Beginning)</button>
        <button id="shiftButton" title="Remove the first element from the array">Shift (Remove from Beginning)</button>
      </div>
      <p style="font-size: 0.9em; color: gray;">Hint: Use the buttons above to see how the array changes!</p>
    </div>
    <div id="codeExample" style="margin-top: 20px;">
      <h3>Example Code:</h3>
      <pre id="codeOutput" style="background: #f9f9f9; border: 1px solid #ccc; padding: 10px; overflow-x: auto;">
        // Example will appear here as you interact with the buttons!
      </pre>
    </div>
  `;

  let array = [1, 2, 3, 4, 5]; // Preloaded array
  const arrayVisual = container.querySelector("#arrayVisual");
  const feedback = container.querySelector("#arrayFeedback");
  const codeOutput = container.querySelector("#codeOutput");

  // Function to render the array visually
  function renderArray(highlightIndex = null) {
    arrayVisual.innerHTML = ""; // Clear the visual
    array.forEach((item, index) => {
      const box = document.createElement("div");
      box.style.cssText = `
        padding: 10px; 
        border: 1px solid #333; 
        background: ${index === highlightIndex ? "#c8e6c9" : "#f0f0f0"}; 
        text-align: center;
        transition: background 0.3s;
      `;
      box.textContent = item;
      arrayVisual.appendChild(box);
    });
  }

  // Function to update the code example
  function updateCodeExample(action, value = null, result = null) {
    let codeSnippet = "";
    switch (action) {
      case "push":
        codeSnippet = `array.push("${value}"); // Add "${value}" to the end`;
        break;
      case "pop":
        codeSnippet = `let removed = array.pop(); // Removed value: ${result}`;
        break;
      case "unshift":
        codeSnippet = `array.unshift("${value}"); // Add "${value}" to the beginning`;
        break;
      case "shift":
        codeSnippet = `let removed = array.shift(); // Removed value: ${result}`;
        break;
    }
    codeOutput.textContent = `let array = [${array.join(", ")}];\n${codeSnippet}`;
  }

  // Event listeners for buttons
  container.querySelector("#pushButton").addEventListener("click", () => {
    const value = container.querySelector("#arrayInput").value;
    if (value) {
      array.push(value);
      feedback.textContent = `Pushed "${value}" to the end of the array.`;
      renderArray(array.length - 1);
      updateCodeExample("push", value);
    } else {
      feedback.textContent = "Please enter a value to push.";
    }
  });

  container.querySelector("#popButton").addEventListener("click", () => {
    if (array.length > 0) {
      const removed = array.pop();
      feedback.textContent = `Popped "${removed}" from the end of the array.`;
      renderArray(array.length); // Highlight nothing after pop
      updateCodeExample("pop", null, removed);
    } else {
      feedback.textContent = "The array is empty, nothing to pop!";
    }
  });

  container.querySelector("#unshiftButton").addEventListener("click", () => {
    const value = container.querySelector("#arrayInput").value;
    if (value) {
      array.unshift(value);
      feedback.textContent = `Unshifted "${value}" to the beginning of the array.`;
      renderArray(0); // Highlight the first index
      updateCodeExample("unshift", value);
    } else {
      feedback.textContent = "Please enter a value to unshift.";
    }
  });

  container.querySelector("#shiftButton").addEventListener("click", () => {
    if (array.length > 0) {
      const removed = array.shift();
      feedback.textContent = `Shifted "${removed}" from the beginning of the array.`;
      renderArray(); // Highlight nothing after shift
      updateCodeExample("shift", null, removed);
    } else {
      feedback.textContent = "The array is empty, nothing to shift!";
    }
  });

  // Initial render
  renderArray();
  updateCodeExample(""); // Initial empty code snippet
}




function setupArraysConcepts(container) {
  console.log("Setting up Arrays Concepts...");
  container.innerHTML = `
    <h2>Arrays</h2>
    <p>Learn the key concepts of working with arrays in JavaScript, including interactive examples!</p>
    <ul>
      <li><a href="#" class="setupInteractiveCreateArrays">1. Creating and Initializing Arrays</a></li>
      <li><a href="#" class="setupInteractiveAccessAndModify">2. Accessing and Modifying Array Elements</a></li>
      <li><a href="#" class="setupInteractiveIterateArrays">3. Iterating Through Arrays</a></li>
      <li><a href="#" class="setupInteractiveSortingArrays">4. Sorting Arrays</a></li>
      <li><a href="#" class="setupInteractiveArrayMethods">5. Array Methods (Push, Pop, Shift, Unshift)</a></li>
    </ul>
  `;

  // Add event listeners for class-based links
  document.querySelectorAll(".setupInteractiveCreateArrays").forEach(link => {
    link.addEventListener("click", function(event) {
      console.log("Clicked on Creating and Initializing Arrays");
      event.preventDefault();
      setupInteractiveCreateArrays(container);
    });
  });

  document.querySelectorAll(".setupInteractiveAccessAndModify").forEach(link => {
    link.addEventListener("click", function(event) {
      console.log("Clicked on Accessing and Modifying Array Elements");
      event.preventDefault();
      setupInteractiveAccessAndModify(container);
    });
  });

  document.querySelectorAll(".setupInteractiveIterateArrays").forEach(link => {
    link.addEventListener("click", function(event) {
      console.log("Clicked on Iterating Through Arrays");
      event.preventDefault();
      setupInteractiveIterateArrays(container);
    });
  });

  document.querySelectorAll(".setupInteractiveSortingArrays").forEach(link => {
    link.addEventListener("click", function(event) {
      console.log("Clicked on Sorting Arrays");
      event.preventDefault();
      setupInteractiveSortingArrays(container);
    });
  });

  document.querySelectorAll(".setupInteractiveArrayMethods").forEach(link => {
    link.addEventListener("click", function(event) {
      console.log("Clicked on Array Methods (Push, Pop, Shift, Unshift)");
      event.preventDefault();
      setupInteractiveArrayMethods(container);
    });
  });
}

function setupExample7(container) {
  console.log("Setting up Timer Example...");
  container.innerHTML = `
    <h2>Timer Example: Using \`setTimeout\` and \`setInterval\`</h2>
    <p>Click the buttons below to see how \`setTimeout\` and \`setInterval\` work to delay or repeat function execution.</p>

    <section>
      <h3>1. Using \`setTimeout\` (Delay Function Execution)</h3>
      <p>Click "Start Timer" to set a one-time timer that will trigger a message after 2 seconds.</p>
      <button id="startTimeoutExample">Start Timer (setTimeout)</button>
      <button id="stopTimeoutExample">Stop Timer</button>
      <p id="timeoutMessage"></p>
      <div>
        <h4>Code:</h4>
        <pre id="timeout-code-display"></pre>
      </div>
    </section>

    <section>
      <h3>2. Using \`setInterval\` (Repeat Function Execution)</h3>
      <p>Click "Start Interval" to start repeating a message every 2 seconds. Click "Stop Interval" to stop it.</p>
      <button id="startIntervalExample">Start Interval (setInterval)</button>
      <button id="stopIntervalExample">Stop Interval</button>
      <p id="intervalMessage">Interval not started yet.</p>
      <p id="intervalCount">Times reached: 0</p> <!-- Counter for interval repetitions -->
      <div>
        <h4>Code:</h4>
        <pre id="interval-code-display"></pre>
      </div>
    </section>

    <h3>Real-World Use Case:</h3>
    <p>This example demonstrates how to delay or repeat function execution using timers.</p>
    <ul>
      <li><strong>\`setTimeout\`:</strong> Executes a function once after a specified delay (e.g., showing a message after 2 seconds).</li>
      <li><strong>\`setInterval\`:</strong> Repeats a function at specified intervals (e.g., displaying a message every 2 seconds).</li>
    </ul>
  `;

  // Timeout Example
  let timeoutID;
  const timeoutMessageElement = document.getElementById("timeoutMessage");
  const timeoutCodeDisplay = document.getElementById("timeout-code-display");

  function displayTimeoutCode(step) {
    const timeoutCodeSnippets = [
      `let timeoutID;
const timeoutMessageElement = document.getElementById("timeoutMessage");`, // Step 1

      `// Step 1: Setting up setTimeout (single delay)
timeoutID = setTimeout(function() {
  timeoutMessageElement.innerHTML = "Timeout reached!";
}, 2000);`, // Step 2

      `// Step 2: Stopping the timeout
clearTimeout(timeoutID);
timeoutMessageElement.innerHTML = "Timer stopped!";` // Step 3
    ];

    timeoutCodeDisplay.textContent = timeoutCodeSnippets[step];
  }

  document.getElementById("startTimeoutExample").addEventListener("click", function() {
    displayTimeoutCode(1); // Show Step 1 code for setTimeout

    timeoutID = setTimeout(function() {
      timeoutMessageElement.innerHTML = "Timeout reached!";
      displayTimeoutCode(2); // Show Step 2 code after timeout is triggered
    }, 2000);
  });

  document.getElementById("stopTimeoutExample").addEventListener("click", function() {
    clearTimeout(timeoutID);
    timeoutMessageElement.innerHTML = "Timeout stopped!";
    displayTimeoutCode(3); // Show Step 3 code for clearing the timeout
  });

  // Initially show Step 1 for timeout
  displayTimeoutCode(0);

  // Interval Example
  let intervalID;
  let intervalCounter = 0; // Initialize counter
  const intervalMessageElement = document.getElementById("intervalMessage");
  const intervalCountElement = document.getElementById("intervalCount"); // Reference to the counter element
  const intervalCodeDisplay = document.getElementById("interval-code-display");

  function displayIntervalCode(step) {
    const intervalCodeSnippets = [
      `let intervalID;
let intervalCounter = 0; // Counter for repetitions
const intervalMessageElement = document.getElementById("intervalMessage");
const intervalCountElement = document.getElementById("intervalCount");`, // Step 1

      `// Step 1: Setting up setInterval (repeated execution)
intervalID = setInterval(function() {
  intervalMessageElement.innerHTML = "Interval reached!";
  intervalCounter++; // Increase counter each time
  intervalCountElement.innerHTML = "Times reached: " + intervalCounter; // Update counter display
}, 2000);`, // Step 2

      `// Step 2: Stopping the interval
clearInterval(intervalID);
intervalMessageElement.innerHTML = "Interval stopped!";` // Step 3
    ];

    intervalCodeDisplay.textContent = intervalCodeSnippets[step];
  }

  document.getElementById("startIntervalExample").addEventListener("click", function() {
    displayIntervalCode(1); // Show Step 1 code for setInterval

    intervalID = setInterval(function() {
      intervalMessageElement.innerHTML = "Interval reached!";
      intervalCounter++; // Increase the count every time the interval executes
      intervalCountElement.innerHTML = "Times reached: " + intervalCounter; // Update the counter on the page
    }, 2000);
  });

  document.getElementById("stopIntervalExample").addEventListener("click", function() {
    clearInterval(intervalID);
    intervalMessageElement.innerHTML = "Interval stopped!";
    displayIntervalCode(2); // Show Step 2 code for stopping the interval
  });

  // Initially show Step 1 for interval
  displayIntervalCode(0);
}

function setupExample8(container) {
  console.log("Setting up Conditional Logic Example...");
  container.innerHTML = `
    <h2>Conditional Logic Quiz</h2>
    <p>Test your understanding of conditional logic in JavaScript. Answer the questions below and see the code examples in real-time!</p>
    <div id="question-container">
      <div id="question"></div>
      <div id="options-container" class="d-flex justify-content-center">
        <!-- Buttons will be inserted here -->
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <button id="prevQuestion" class="btn btn-secondary">Previous Question</button>
      <button id="nextQuestion" class="btn btn-primary">Next Question</button>
    </div>
    <div>
      <h3>Code:</h3>
      <pre id="code-display"></pre>
    </div>
    <div id="visual-example">
      <h3>Visual Example:</h3>
      <p>See how the conditional statement affects the circle below:</p>
      <div id="circle" class="circle"></div>
    </div>
  `;

  // Add styles for the circle
  const style = document.createElement("style");
  style.innerHTML = `
    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: lightgray;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  const questions = [
    {
      question: "Which of the following is used for a simple if statement?",
      options: ["if()", "else()", "elseif()", "switch()"],
      answer: 0,
      code: `if (example) {\n  document.getElementById("circle").style.backgroundColor = "red";\n}`,
      effect: (selected) => {
        const circle = document.getElementById("circle");
        const codeDisplay = document.getElementById("code-display");

        if (selected === 0) {
          circle.style.backgroundColor = "red"; // If statement triggers red
          codeDisplay.textContent = `if (example) {\n  document.getElementById("circle").style.backgroundColor = "red";\n}`;
        } else {
          circle.style.backgroundColor = "lightgray"; // Default color
          codeDisplay.textContent = `if (example) {\n  document.getElementById("circle").style.backgroundColor = "red";\n}`;
        }
      }
    },
    {
      question: "What does the 'else' statement do?",
      options: ["Executes if the 'if' condition is false", "Checks for a condition", "Executes if the 'if' condition is true", "Ends the conditional block"],
      answer: 0,
      code: `if (condition) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else {\n  document.getElementById("circle").style.backgroundColor = "blue";\n}`,
      effect: (selected) => {
        const circle = document.getElementById("circle");
        const codeDisplay = document.getElementById("code-display");

        if (selected === 0) {
          circle.style.backgroundColor = "blue"; // Else statement triggers blue
          codeDisplay.textContent = `if (condition) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else {\n  document.getElementById("circle").style.backgroundColor = "blue";\n}`;
        } else {
          circle.style.backgroundColor = "lightgray"; // Default color
          codeDisplay.textContent = `if (condition) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else {\n  document.getElementById("circle").style.backgroundColor = "blue";\n}`;
        }
      }
    },
    {
      question: "Which statement is used to test multiple conditions?",
      options: ["if", "else if", "switch", "for"],
      answer: 1,
      code: `if (condition1) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else if (condition2) {\n  document.getElementById("circle").style.backgroundColor = "yellow";\n}`,
      effect: (selected) => {
        const circle = document.getElementById("circle");
        const codeDisplay = document.getElementById("code-display");

        if (selected === 1) {
          circle.style.backgroundColor = "yellow"; // Else if triggers yellow
          codeDisplay.textContent = `if (condition1) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else if (condition2) {\n  document.getElementById("circle").style.backgroundColor = "yellow";\n}`;
        } else {
          circle.style.backgroundColor = "lightgray"; // Default color
          codeDisplay.textContent = `if (condition1) {\n  document.getElementById("circle").style.backgroundColor = "red";\n} else if (condition2) {\n  document.getElementById("circle").style.backgroundColor = "yellow";\n}`;
        }
      }
    },
    {
      question: "Which statement is used for a default case in JavaScript?",
      options: ["default", "else", "case", "switch"],
      answer: 0,
      code: `switch (expression) {\n  case value1:\n    document.getElementById("circle").style.backgroundColor = "red";\n    break;\n  default:\n    document.getElementById("circle").style.backgroundColor = "green";\n}`,
      effect: (selected) => {
        const circle = document.getElementById("circle");
        const codeDisplay = document.getElementById("code-display");

        if (selected === 0) {
          circle.style.backgroundColor = "green"; // Default case triggers green
          codeDisplay.textContent = `switch (expression) {\n  case value1:\n    document.getElementById("circle").style.backgroundColor = "red";\n    break;\n  default:\n    document.getElementById("circle").style.backgroundColor = "green";\n}`;
        } else {
          circle.style.backgroundColor = "lightgray"; // Default color
          codeDisplay.textContent = `switch (expression) {\n  case value1:\n    document.getElementById("circle").style.backgroundColor = "red";\n    break;\n  default:\n    document.getElementById("circle").style.backgroundColor = "green";\n}`;
        }
      }
    }
  ];

  let currentQuestionIndex = 0;

  function displayQuestion(index) {
    const question = questions[index];
    document.getElementById("question").innerHTML = question.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    question.options.forEach((option, i) => {
      const optionCard = document.createElement("div");
      optionCard.classList.add("card", "m-2", "option-card");
      optionCard.style.width = "150px";
      optionCard.innerHTML = `
        <div class="card-body text-center">
          <p>${option}</p>
        </div>
      `;
      optionCard.addEventListener("click", () => checkAnswer(i, question.answer, question.effect));
      optionsContainer.appendChild(optionCard);
    });

    document.getElementById("code-display").textContent = question.code;
  }

  function checkAnswer(selected, correct, effectFunction) {
    const options = document.querySelectorAll(".option-card");
    options.forEach((card, index) => {
      card.classList.remove("bg-success", "bg-danger");
      if (index === selected) {
        card.classList.add(selected === correct ? "bg-success" : "bg-danger");
        effectFunction(selected); // Call the effect function to update the visual example and code
      }
    });
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    }
  }

  // Initial display of the first question
  displayQuestion(currentQuestionIndex);

  // Add event listeners for Next and Previous buttons
  document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
  document.getElementById("prevQuestion").addEventListener("click", prevQuestion);
}





  

});
