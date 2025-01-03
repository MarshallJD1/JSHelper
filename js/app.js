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
        setupExample9(container);
      break;
      case "10":
        setupExample10(container);
      break;
      case "11": setupExample11(container);
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
      <h2>Loops, Dynamic Output, and List Creation</h2>
      <p>This example combines loops with dynamic DOM manipulation. You'll see how to process data using different types of loops, generate output dynamically, and create an interactive list from that output.</p>
  
      <label for="loop-type">Choose a Loop:</label>
      <select id="loop-type" class="form-select w-25">
        <option value="for">For Loop</option>
        <option value="while">While Loop</option>
        <option value="forEach">ForEach Loop</option>
      </select>
  
      <label for="base-array" class="mt-3">Enter Base Array (comma-separated):</label>
      <input type="text" id="base-array" class="form-control w-50" value="5, 12, 8, 20, 15">
  
      <div class="my-3">
        <button id="generate-output" class="btn btn-primary me-2">Generate Output</button>
        <button id="reset-output" class="btn btn-danger">Reset</button>
      </div>
  
      <div class="loop-visualization">
        <h3>Before Loop:</h3>
        <pre id="before-loop" class="p-3 border bg-light"></pre>
  
        <h3>Generated Output:</h3>
        <ul id="generated-output" class="list-group"></ul>
  
        <h3>Code Example</h3>
        <pre id="code-output" class="p-3 border bg-dark text-white"></pre>
  
        <h3>Use Case Explanation</h3>
        <p id="use-case" class="p-3 border bg-light"></p>
      </div>
  
      <h2 class="mt-5">Create a List from Loop Output</h2>
      <p>Below, you can take the generated output and dynamically create a list. Each list item will have a delete button for removing items individually.</p>
      <button id="create-list" class="btn btn-success">Create List from Output</button>
      <ul id="interactive-list" class="list-group mt-3"></ul>
      <h3>Code Example for List Creation:</h3>
      <pre id="list-code-output" class="p-3 border bg-dark text-white"></pre>
    `;
  
    const loopDropdown = document.getElementById("loop-type");
    const baseArrayInput = document.getElementById("base-array");
    const generateOutputButton = document.getElementById("generate-output");
    const resetOutputButton = document.getElementById("reset-output");
    const createListButton = document.getElementById("create-list");
    const beforeLoop = document.getElementById("before-loop");
    const generatedOutput = document.getElementById("generated-output");
    const codeOutput = document.getElementById("code-output");
    const useCase = document.getElementById("use-case");
    const interactiveList = document.getElementById("interactive-list");
    const listCodeOutput = document.getElementById("list-code-output");
  
    let outputData = []; // Store generated output for creating the list
  
    generateOutputButton.addEventListener("click", () => {
      const baseArray = baseArrayInput.value.split(",").map(Number);
      const loopType = loopDropdown.value;
  
      beforeLoop.textContent = JSON.stringify(baseArray, null, 2);
      generatedOutput.innerHTML = "";
      outputData = []; // Reset outputData
  
      handleLoop(loopType, baseArray);
      showUseCase(loopType);
      showLoopCode(loopType);
    });
  
    resetOutputButton.addEventListener("click", () => {
      beforeLoop.textContent = "";
      generatedOutput.innerHTML = "";
      codeOutput.textContent = "";
      useCase.textContent = "";
      interactiveList.innerHTML = "";
      listCodeOutput.textContent = "";
      baseArrayInput.value = "5, 12, 8, 20, 15";
      outputData = [];
    });
  
    createListButton.addEventListener("click", () => {
      interactiveList.innerHTML = ""; // Clear previous list
      outputData.forEach(item => createListItem(item));
      showListCreationCode();
    });
  
    function handleLoop(loopType, array) {
      switch (loopType) {
        case "for":
          for (let i = 0; i < array.length; i++) {
            const text = `Index ${i}: ${array[i]}`;
            outputData.push(text);
            appendToOutput(text);
          }
          break;
        case "while":
          let i = 0;
          while (i < array.length && array[i] < 15) {
            const text = `Value below 15: ${array[i]}`;
            outputData.push(text);
            appendToOutput(text);
            i++;
          }
          break;
        case "forEach":
          array.forEach((value, index) => {
            const text = `Index ${index}, Doubled: ${value * 2}`;
            outputData.push(text);
            appendToOutput(text);
          });
          break;
      }
    }
  
    function appendToOutput(text) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = text;
      generatedOutput.appendChild(listItem);
    }
  
    function showLoopCode(loopType) {
      const jsCode = {
        for: [
          `for (let i = 0; i < array.length; i++) {`,
          `  appendToOutput("Index " + i + ": " + array[i]);`,
          `}`
        ],
        while: [
          `let i = 0;`,
          `while (i < array.length && array[i] < 15) {`,
          `  appendToOutput("Value below 15: " + array[i]);`,
          `  i++;`,
          `}`
        ],
        forEach: [
          `array.forEach((value, index) => {`,
          `  appendToOutput("Index " + index + ", Doubled: " + (value * 2));`,
          `});`
        ]
      };
  
      codeOutput.innerHTML = jsCode[loopType]
        .map(line => `<span class="code-line">${line}</span>`)
        .join("\n");
    }
  
    function showUseCase(loopType) {
      const useCases = {
        for: "A 'for' loop is ideal when you know the number of iterations beforehand. Here, we use it to iterate through all items in the array and display their indices and values.",
        while: "A 'while' loop is great for situations where the condition determines the iteration. Here, we stop iterating once we encounter a value >= 15.",
        forEach: "A 'forEach' loop is perfect for applying a consistent operation to all elements in an array. Here, we double each value and display the result."
      };
  
      useCase.textContent = useCases[loopType];
    }
  
    function createListItem(text) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between align-items-center";
      listItem.textContent = text;
  
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-sm";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        listItem.remove();
      });
  
      listItem.appendChild(deleteButton);
      interactiveList.appendChild(listItem);
    }
  
    function showListCreationCode() {
      const jsCode = [
        `outputData.forEach(item => {`,
        `  const listItem = document.createElement("li");`,
        `  listItem.textContent = item;`,
        `  const deleteButton = document.createElement("button");`,
        `  deleteButton.textContent = "Delete";`,
        `  deleteButton.addEventListener("click", () => { listItem.remove(); });`,
        `  listItem.appendChild(deleteButton);`,
        `  interactiveList.appendChild(listItem);`,
        `});`
      ];
  
      listCodeOutput.innerHTML = jsCode
        .map(line => `<span class="code-line">${line}</span>`)
        .join("\n");
    }
  }
  
  
  
  

  
  // Example 3 - Form Validation
 
  function setupExample3() {
    // Inject the HTML content for the form
    container.innerHTML =  `
    <h2>Form Validation with Server Simulation</h2>
    <p>This example demonstrates how to validate a form and send the data to a mock server using JavaScript.</p>
    <p> Next to each input field you will see a code snippet showing how to create that input field in HTML.</p>
    <p> Below the submit button you will see a code snippet showing how to handle the form submission in JavaScript.</p>
    <p>Try submitting the form with invalid data to see the validation in action.</p>

    <form id="user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <span class="error" id="name-error"></span>
        <div class="code-snippet">
          <pre>&lt;input type="text" id="name" name="name" required&gt;</pre>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error" id="email-error"></span>
        <div class="code-snippet">
          <pre>&lt;input type="email" id="email" name="email" required&gt;</pre>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <span class="error" id="password-error"></span>
        <div class="code-snippet">
          <pre>&lt;input type="password" id="password" name="password" required&gt;</pre>
        </div>
      </div>

      <div class="form-group">
        <button type="submit">Submit</button>
        <div class="code-snippet">
          <pre>form.addEventListener("submit", (event) => {</pre>
          <pre>  event.preventDefault();</pre>
          <pre>  const formData = {</pre>
          <pre>    name: nameInput.value,</pre>
          <pre>    email: emailInput.value,</pre>
          <pre>    password: passwordInput.value,</pre>
          <pre>  };</pre>
          <pre>  sendToServer(formData);</pre>
          <pre>});</pre>
        </div>
      </div>
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
    <p>Click an item in the array below to select it, or manually enter the index and new value to modify it.</p>
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
    <button id="undoChanges" disabled>Undo</button>
    <button id="redoChanges" disabled>Redo</button>
    <h4>Generated Code:</h4>
    <pre id="codeDisplay"></pre>
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
  function updateArrayDisplay(highlightIndex = null) {
    userArrayPreview.innerHTML = '';
    userArray.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index}: ${item}`;
      listItem.classList.add('array-item');
      if (index === highlightIndex) {
        listItem.classList.add('highlight');
      }
      listItem.addEventListener('click', () => {
        modifyIndexInput.value = index; // Prefill index input
        modifyValueByIndexInput.value = item; // Prefill value input
      });
      userArrayPreview.appendChild(listItem);
    });
    arrayLengthDisplay.textContent = userArray.length;
  }

  // Function to save history state
  function saveHistory(oldArray) {
    history = history.slice(0, historyIndex + 1); // Trim redo history
    history.push([...oldArray]); // Save a copy of the current state
    historyIndex++;
    undoButton.disabled = historyIndex <= 0;
    redoButton.disabled = true; // Reset redo availability
  }

  // Undo functionality
  function undoChanges() {
    if (historyIndex > 0) {
      userArray = [...history[--historyIndex]];
      updateArrayDisplay();
      codeDisplay.textContent = `// Undo applied\nlet userArray = ${JSON.stringify(userArray)};`;
      redoButton.disabled = false;
      undoButton.disabled = historyIndex <= 0;
    }
  }

  // Redo functionality
  function redoChanges() {
    if (historyIndex < history.length - 1) {
      userArray = [...history[++historyIndex]];
      updateArrayDisplay();
      codeDisplay.textContent = `// Redo applied\nlet userArray = ${JSON.stringify(userArray)};`;
      undoButton.disabled = false;
      redoButton.disabled = historyIndex >= history.length - 1;
    }
  }

  // Function to modify an element in the array
  function modifyElementByIndex() {
    const index = parseInt(modifyIndexInput.value, 10);
    const newValue = modifyValueByIndexInput.value.trim();
    if (index >= 0 && index < userArray.length && newValue) {
      const oldArray = [...userArray];
      userArray[index] = newValue; // Update array
      saveHistory(oldArray);
      updateArrayDisplay(index); // Highlight the modified index
      codeDisplay.textContent = `userArray[${index}] = ${JSON.stringify(newValue)}; // Modify the value at index ${index}`;
    } else {
      alert('Invalid index or value.');
    }
  }

  // Initialize event listeners
  createArrayButton.addEventListener('click', () => {
    try {
      const inputArray = JSON.parse(userArrayInput.value.trim());
      if (Array.isArray(inputArray)) {
        userArray = inputArray;
        saveHistory([]); // Save the initial state
        updateArrayDisplay();
        codeDisplay.textContent = `let userArray = ${JSON.stringify(userArray)};`;
      } else {
        alert('Please enter a valid array.');
      }
    } catch {
      alert('Invalid input. Use JSON format like ["apple", "banana"].');
    }
  });
  modifyValueAtIndexButton.addEventListener('click', modifyElementByIndex);
  undoButton.addEventListener('click', undoChanges);
  redoButton.addEventListener('click', redoChanges);

  // Initial UI setup
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

  const userArrayInput = document.getElementById("userArrayInput");
  const createArrayButton = document.getElementById("createArrayButton");
  const loopTypeSelect = document.getElementById("loopType");
  const exampleTypeSelect = document.getElementById("exampleType");
  const targetValueInput = document.getElementById("targetValueInput");
  const runExampleButton = document.getElementById("runExampleButton");
  const userArrayPreview = document.getElementById("userArrayPreview");
  const exampleOutput = document.getElementById("exampleOutput");
  const codeDisplay = document.getElementById("codeDisplay");

  // Show/Hide target value input for specific examples
  exampleTypeSelect.addEventListener("change", () => {
    targetValueInput.style.display =
      exampleTypeSelect.value === "countOccurrences" ? "block" : "none";
  });

  // Update array display
  function updateArrayDisplay() {
    userArrayPreview.innerHTML = "";
    userArray.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `Index ${index}: ${item}`;
      userArrayPreview.appendChild(li);
    });
    codeDisplay.textContent = `let userArray = ${JSON.stringify(userArray)};`;
  }

  // Create array
  createArrayButton.addEventListener("click", () => {
    try {
      const input = JSON.parse(userArrayInput.value);
      if (Array.isArray(input)) {
        userArray = input;
        updateArrayDisplay();
      } else {
        alert("Please enter a valid array!");
      }
    } catch {
      alert("Invalid input! Use JSON format like [1, 2, 3].");
    }
  });

  // Run selected example
  runExampleButton.addEventListener("click", () => {
    if (userArray.length === 0) {
      alert("Please create an array first!");
      return;
    }

    const loopType = loopTypeSelect.value;
    const exampleType = exampleTypeSelect.value;
    const targetValue = targetValueInput.value ? JSON.parse(targetValueInput.value) : null;

    let result;
    let codeSnippet = "";

    try {
      switch (exampleType) {
        case "sum":
          let sum = 0;
          codeSnippet = generateLoopCode(loopType, "sum += item", "let sum = 0;", "sum");
          iterateArray(loopType, userArray, (item) => {
            sum += item;
          });
          result = sum;
          break;

        case "filterEven":
          let evens = [];
          codeSnippet = generateLoopCode(loopType, "if (item % 2 === 0) evens.push(item)", "let evens = [];", "evens");
          iterateArray(loopType, userArray, (item) => {
            if (item % 2 === 0) evens.push(item);
          });
          result = evens;
          break;

        case "transform":
          let doubled = [];
          codeSnippet = generateLoopCode(loopType, "doubled.push(item * 2)", "let doubled = [];", "doubled");
          iterateArray(loopType, userArray, (item) => {
            doubled.push(item * 2);
          });
          result = doubled;
          break;

        case "findMax":
          let max = userArray[0];
          codeSnippet = generateLoopCode(loopType, "if (item > max) max = item", "let max = userArray[0];", "max");
          iterateArray(loopType, userArray, (item) => {
            if (item > max) max = item;
          });
          result = max;
          break;

        case "countOccurrences":
          let count = 0;
          codeSnippet = generateLoopCode(loopType, `if (item === ${JSON.stringify(targetValue)}) count++`, "let count = 0;", "count");
          iterateArray(loopType, userArray, (item) => {
            if (item === targetValue) count++;
          });
          result = count;
          break;

        default:
          throw new Error("Invalid example type selected.");
      }

      exampleOutput.textContent = `Result: ${JSON.stringify(result, null, 2)}`;
      codeDisplay.textContent = codeSnippet.trim();
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  });

  function iterateArray(loopType, array, callback) {
    if (loopType === "for") {
      for (let i = 0; i < array.length; i++) callback(array[i], i);
    } else if (loopType === "while") {
      let i = 0;
      while (i < array.length) {
        callback(array[i], i);
        i++;
      }
    } else if (loopType === "doWhile") {
      let i = 0;
      do {
        callback(array[i], i);
        i++;
      } while (i < array.length);
    } else if (loopType === "forEach") {
      array.forEach(callback);
    } else {
      throw new Error("Invalid loop type selected.");
    }
  }

  function generateLoopCode(loopType, body, initialization, returnVar) {
    const loopHeader =
      loopType === "for"
        ? "for (let i = 0; i < userArray.length; i++)"
        : loopType === "while"
        ? "let i = 0; while (i < userArray.length)"
        : loopType === "doWhile"
        ? "let i = 0; do"
        : "userArray.forEach(item =>";

    const loopFooter = loopType === "doWhile" ? "} while (i < userArray.length);" : "}";

    return `${initialization}
${loopHeader} {
  let item = ${loopType === "for" || loopType === "while" || loopType === "doWhile" ? "userArray[i]" : "item"};
  ${body};
}${loopFooter}
return ${returnVar};`;
  }
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
  const algorithmSelect = document.getElementById("algorithm-select");
  const dataTypeSelect = document.getElementById("data-type-select");
  const stepsTableBody = document.getElementById("steps-table-body");

  const sortingAlgorithms = {
    bubbleSort: {
      name: "Bubble Sort",
      description: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      realLife: "Useful for small datasets or simple sorting tasks.",
      codeSnippet: function(array, sortedArray) {
        return `// Bubble Sort Code
let array = [${array.join(", ")}];
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    if (array[j] > array[j + 1]) {
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
    }
  }
}`;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length - i - 1; j++) {
            let previousArray = [...array];
            if (array[j] > array[j + 1]) {
              [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            steps.push({ previous: previousArray, current: [...array] });
            updateDisplay(steps);
          }
        }
        return array;
      },
    },
    selectionSort: {
      name: "Selection Sort",
      description: "Finds the smallest element from the unsorted part and swaps it with the first unsorted element.",
      realLife: "Good for small datasets or when memory usage needs to be minimal.",
      codeSnippet: function(array, sortedArray) {
        return `// Selection Sort Code
let array = [${array.join(", ")}];
for (let i = 0; i < array.length; i++) {
  let minIndex = i;
  for (let j = i + 1; j < array.length; j++) {
    if (array[j] < array[minIndex]) {
      minIndex = j;
    }
  }
  [array[i], array[minIndex]] = [array[minIndex], array[i]];
}`;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        for (let i = 0; i < array.length - 1; i++) {
          let minIndex = i;
          for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
              minIndex = j;
            }
          }
          let previousArray = [...array];
          [array[i], array[minIndex]] = [array[minIndex], array[i]];
          steps.push({ previous: previousArray, current: [...array] });
          updateDisplay(steps);
        }
        return array;
      },
    },
    insertionSort: {
      name: "Insertion Sort",
      description: "Iterates through the array, inserting each element into its correct position in the sorted part.",
      realLife: "Great for nearly sorted datasets or small arrays.",
      codeSnippet: function(array, sortedArray) {
        return `// Insertion Sort Code
let array = [${array.join(", ")}];
for (let i = 1; i < array.length; i++) {
  let key = array[i];
  let j = i - 1;
  while (j >= 0 && array[j] > key) {
    array[j + 1] = array[j];
    j--;
  }
  array[j + 1] = key;
}`;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        for (let i = 1; i < array.length; i++) {
          let key = array[i];
          let j = i - 1;
          let previousArray = [...array];
          while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
          }
          array[j + 1] = key;
          steps.push({ previous: previousArray, current: [...array] });
          updateDisplay(steps);
        }
        return array;
      },
    },
    quickSort: {
      name: "Quick Sort",
      description: "Efficient, divide-and-conquer algorithm that selects a pivot and partitions the array around it.",
      realLife: "Ideal for large datasets or performance-critical applications.",
      codeSnippet: function(array, sortedArray) {
        return `// Quick Sort Code
let array = [${array.join(", ")}];
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[0];
  let left = [], right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`;
      },
      sortFunction: function(array, updateDisplay) {
        let steps = [];
        function quickSort(arr) {
          if (arr.length <= 1) return arr;
          let pivot = arr[0];
          let left = [], right = [];
          for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) left.push(arr[i]);
            else right.push(arr[i]);
          }
          steps.push({ previous: [...arr], current: [`Pivot: ${pivot}`, `Left: ${left}`, `Right: ${right}`] });
          updateDisplay(steps);
          return [...quickSort(left), pivot, ...quickSort(right)];
        }
        return quickSort(array);
      },
    },
  };

  function generateRandomArray(dataType) {
    const array = [];
    const length = Math.floor(Math.random() * 10) + 5;
    if (dataType === "numbers") {
      for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 100));
      }
    } else {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < length; i++) {
        array.push(chars.charAt(Math.floor(Math.random() * chars.length)));
      }
    }
    return array;
  }

  function updateDisplay(steps) {
    stepsTableBody.innerHTML = "";
    steps.forEach((step, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${step.previous.join(", ")}</td>
        <td>${step.current.join(", ")}</td>
      `;
      stepsTableBody.appendChild(row);
    });
  }

  sortBtn.addEventListener("click", function () {
    const algorithmKey = algorithmSelect.value;
    const dataType = dataTypeSelect.value;
    const algorithm = sortingAlgorithms[algorithmKey];
    const array = generateRandomArray(dataType);

    arrayOutput.textContent = `Original Array: ${array.join(", ")}`;
    algorithmDetails.innerHTML = `<h4>${algorithm.name}</h4><p>${algorithm.description}</p>`;
    const sortedArray = algorithm.sortFunction([...array], updateDisplay);
    resultOutput.textContent = `Sorted Array: ${sortedArray.join(", ")}`;
    codeOutput.textContent = algorithm.codeSnippet(array, sortedArray);
  });
}

// Initialize the sorting tool
setupInteractiveSortingArrays(document.getElementById("sorting-container"));




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

function setupExample9(container) {
  console.log("Setting up Objects Example...");

  // Inject Bootstrap-styled HTML content into the container
  container.innerHTML = `
    <h2 class="text-center my-4">JavaScript Objects</h2>
    <p class="text-center mb-5">Objects are collections of key-value pairs. Below are examples of working with objects in JavaScript!</p>

    <div class="container">
      <!-- Example 1 -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Example 1: Object with Properties</h5>
              <p class="card-text">
                This object has properties like <strong>name</strong>, <strong>age</strong>, and <strong>city</strong>.
              </p>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>Before:</strong>
                  <pre id="before-display"></pre>
                </div>
                <div>
                  <strong>After:</strong>
                  <pre id="after-display"></pre>
                </div>
              </div>
              <div class="mt-3">
                <strong>Code to Modify Object:</strong>
                <pre id="code-display"></pre>
              </div>
              <div class="mt-3 d-flex justify-content-around">
                <button class="btn btn-primary btn-sm" id="change-name">Change Name</button>
                <button class="btn btn-primary btn-sm" id="change-age">Change Age</button>
                <button class="btn btn-primary btn-sm" id="change-city">Change City</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 2 -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Example 2: Method Inside Object</h5>
              <p class="card-text">
                This object has a method <strong>greet()</strong> that we can call to print a greeting message.
              </p>
              <div>
                <button class="btn btn-success btn-sm" id="greet-button">Greet</button>
              </div>
              <div class="mt-3">
                <strong>Code:</strong>
                <pre id="method-code-display"></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 3 -->
      <div class="row mb-4">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Example 3: Nested Object</h5>
              <p class="card-text">
                This object contains another object as a property. Let's see how we can interact with it!
              </p>
              <div>
                <strong>Nested Object:</strong>
                <pre id="nested-object-display"></pre>
              </div>
              <div class="mt-3">
                <strong>Code to Modify Nested Object:</strong>
                <pre id="nested-code-display"></pre>
              </div>
              <div class="mt-3 d-flex justify-content-center">
                <button class="btn btn-warning btn-sm" id="change-nested-city">Change Nested City</button>
              </div>
              <h6 class="mt-4">Before and After:</h6>
              <div class="d-flex justify-content-between">
                <div>
                  <strong>Before:</strong>
                  <pre id="nested-before-display"></pre>
                </div>
                <div>
                  <strong>After:</strong>
                  <pre id="nested-after-display"></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // JavaScript logic remains unchanged (setting up objects and event listeners)
  const person = { name: "John", age: 30, city: "New York" };
  const personWithMethod = {
    name: "John",
    greet: function () {
      return `Hello, my name is ${this.name}!`;
    },
  };
  const personWithAddress = {
    name: "John",
    address: {
      street: "123 Main St",
      city: "New York",
      zip: "10001",
    },
  };

  const beforeDisplay = container.querySelector("#before-display");
  const afterDisplay = container.querySelector("#after-display");
  const codeDisplay = container.querySelector("#code-display");
  const methodCodeDisplay = container.querySelector("#method-code-display");
  const nestedObjectDisplay = container.querySelector("#nested-object-display");
  const nestedCodeDisplay = container.querySelector("#nested-code-display");
  const nestedBeforeDisplay = container.querySelector("#nested-before-display");
  const nestedAfterDisplay = container.querySelector("#nested-after-display");

  const displayObjectCode = () => {
    beforeDisplay.textContent = JSON.stringify(person, null, 2);
    afterDisplay.textContent = JSON.stringify(
      { ...person, name: "Jane", age: 35, city: "Los Angeles" },
      null,
      2
    );
    codeDisplay.textContent = `
      person.name = "Jane";
      person.age = 35;
      person.city = "Los Angeles";
    `;
  };

  displayObjectCode();

  container.querySelector("#change-name").addEventListener("click", () => {
    person.name = "Jane";
    displayObjectCode();
  });
  container.querySelector("#change-age").addEventListener("click", () => {
    person.age = 35;
    displayObjectCode();
  });
  container.querySelector("#change-city").addEventListener("click", () => {
    person.city = "Los Angeles";
    displayObjectCode();
  });

  const displayMethodCode = () => {
    methodCodeDisplay.textContent = `
      const personWithMethod = {
        name: "John",
        greet: function() {
          return "Hello, my name is " + this.name + "!";
        }
      };
    `;
  };

  displayMethodCode();

  container.querySelector("#greet-button").addEventListener("click", () => {
    alert(personWithMethod.greet());
  });

  const displayNestedCode = () => {
    // Set the initial "Before" content only once
    if (!nestedBeforeDisplay.textContent) {
      nestedBeforeDisplay.textContent = JSON.stringify(personWithAddress, null, 2);
    }
  
    // Update the "Nested Object" and "After" displays dynamically
    nestedObjectDisplay.textContent = JSON.stringify(personWithAddress, null, 2);
    personWithAddress.address.city = "Los Angeles"; // Apply the change
    nestedAfterDisplay.textContent = JSON.stringify(personWithAddress, null, 2);
  
    // Display the code to modify the nested object
    nestedCodeDisplay.textContent = `
      personWithAddress.address.city = "Los Angeles";
    `;
  };
  

  displayNestedCode();

  container.querySelector("#change-nested-city").addEventListener("click", () => {
    personWithAddress.address.city = "Los Angeles"; // Modify the city
    displayNestedCode(); // Update displays
  });
  
}

function setupExample10(container) {
  // Add the HTML content to the container
  container.innerHTML = `
    <div class="container mt-4">
      <h2 class="text-center mb-4">Example 10: Drag-and-Drop Functionality</h2>
      <p>Drag and drop is a common feature for file organization, uploads, and more. Explore how it works below!</p>
      
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="p-3 border rounded bg-light text-center">
            <p class="mb-2"><strong>Draggable Item:</strong></p>
            <div id="draggable-item" class="p-3 bg-primary text-white rounded" draggable="true">
              Drag Me!
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <div class="p-3 border rounded bg-light text-center">
            <p class="mb-2"><strong>Drop Zone:</strong></p>
            <div id="drop-zone" class="p-5 bg-success text-white rounded">
              Drop Here
            </div>
            <p id="drop-feedback" class="mt-3 text-muted"></p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h3>Real-Time Code</h3>
          <pre id="code-display" class="p-3 bg-dark text-light rounded"></pre>
        </div>
      </div>
    </div>
  `;

  // Query the elements only after they are added to the DOM
  const draggableItem = document.getElementById("draggable-item");
  const dropZone = document.getElementById("drop-zone");
  const codeDisplay = document.getElementById("code-display");
  const feedback = document.getElementById("drop-feedback");

  // Code Snippet Display
  const codeSnippets = {
    dragstart: `// Handle dragstart event
draggableItem.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
});`,
    dragover: `// Handle dragover event
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault(); // Allow drop
  dropZone.classList.add('hover');
});`,
    drop: `// Handle drop event
dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const item = document.getElementById(id);
  dropZone.classList.remove('hover');
  feedback.textContent = 'File uploaded successfully!';
});`,
  };

  // Drag-and-Drop Events
  draggableItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    updateCodeDisplay(codeSnippets.dragstart);
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allow drop
    dropZone.classList.add("hover");
    updateCodeDisplay(codeSnippets.dragover);
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("hover");
  });

  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const item = document.getElementById(id);
    dropZone.classList.remove("hover");
    feedback.textContent = `Dropped ${item.textContent} successfully!`;
    updateCodeDisplay(codeSnippets.drop);
  });

  // Update Code Display
  function updateCodeDisplay(code) {
    codeDisplay.textContent = code;
  }
}

function setupExample11(container) {
  // HTML structure for the example
  const htmlContent = `
    <div class="container">
      <h2>Interactive Glossary of JavaScript Syntax & Operators</h2>

      <div class="row">
        <!-- Dropdown Menu for Syntax/Operator -->
        <div class="col-md-4">
          <h4>Select Syntax/Operator</h4>
          <select id="syntax-dropdown" class="form-control">
            <optgroup label="Operators">
              <option value="plus">+</option>
              <option value="minus">-</option>
              <option value="multiply">*</option>
              <option value="divide">/</option>
              <option value="modulus">% (Modulus)</option>
              <option value="equality">== (Equality)</option>
              <option value="strict-equality">=== (Strict Equality)</option>
              <option value="not-equal">!= (Not Equal)</option>
              <option value="strict-not-equal">!== (Strict Not Equal)</option>
              <option value="comparison"><, >, <=, >= (Comparison)</option>
            </optgroup>
            <optgroup label="Control Flow">
              <option value="if">if</option>
              <option value="else-if">else if</option>
              <option value="else">else</option>
              <option value="switch">switch</option>
              <option value="curly-braces">{ }</option>
            </optgroup>
            <optgroup label="Loops">
              <option value="for">for</option>
              <option value="while">while</option>
              <option value="do-while">do...while</option>
            </optgroup>
            <optgroup label="Functions">
              <option value="function">function</option>
              <option value="arrow-function">Arrow Function</option>
            </optgroup>
            <optgroup label="Miscellaneous">
              <option value="return">return</option>
              <option value="typeof">typeof</option>
              <option value="spread-rest">... (Spread/Rest)</option>
              <option value="semicolon">; (Semicolon)</option>
            </optgroup>
          </select>
        </div>

        <!-- Breakdown Section -->
        <div class="col-md-8">
          <h4>Syntax Breakdown</h4>
          <div id="syntax-breakdown">
            <!-- Content will be dynamically injected here -->
          </div>

          <h4>Example in Action</h4>
          <div id="syntax-example">
            <!-- Example output will be displayed here -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert HTML content into the container
  container.innerHTML = htmlContent;

  // Add event listener for dropdown selection
  const syntaxDropdown = document.getElementById('syntax-dropdown');
  
  // Set default selection to '+' so details show when the page is first accessed
  syntaxDropdown.value = 'plus';

  // Function to update the content based on the selected operator
  function updateContent(selection) {
    let breakdownContent = '';
    let exampleContent = '';

    switch(selection) {
      case 'plus':
        breakdownContent = `
          <strong>+</strong> (Addition):
          <p>The addition operator is used to add two values.</p>
          <pre>Syntax: a + b</pre>
          <p>Example:</p>
          <pre>let sum = 5 + 3;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>8</p>
        `;
        break;
      case 'minus':
        breakdownContent = `
          <strong>-</strong> (Subtraction):
          <p>The subtraction operator is used to subtract one value from another.</p>
          <pre>Syntax: a - b</pre>
          <p>Example:</p>
          <pre>let difference = 10 - 3;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>7</p>
        `;
        break;
      case 'multiply':
        breakdownContent = `
          <strong>*</strong> (Multiplication):
          <p>The multiplication operator is used to multiply two values.</p>
          <pre>Syntax: a * b</pre>
          <p>Example:</p>
          <pre>let product = 4 * 5;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>20</p>
        `;
        break;
      case 'divide':
        breakdownContent = `
          <strong>/</strong> (Division):
          <p>The division operator is used to divide one value by another.</p>
          <pre>Syntax: a / b</pre>
          <p>Example:</p>
          <pre>let quotient = 20 / 4;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>5</p>
        `;
        break;
      case 'modulus':
        breakdownContent = `
          <strong>%</strong> (Modulus):
          <p>The modulus operator returns the remainder of a division operation.</p>
          <pre>Syntax: a % b</pre>
          <p>Example:</p>
          <pre>let remainder = 10 % 3;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>1</p>
        `;
        break;
      case 'equality':
        breakdownContent = `
          <strong>==</strong> (Equality):
          <p>The equality operator checks if two values are equal, performing type coercion if necessary.</p>
          <pre>Syntax: a == b</pre>
          <p>Example:</p>
          <pre>let isEqual = 5 == "5";</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>true</p>
        `;
        break;
      case 'strict-equality':
        breakdownContent = `
          <strong>===</strong> (Strict Equality):
          <p>The strict equality operator checks if two values are equal and of the same type.</p>
          <pre>Syntax: a === b</pre>
          <p>Example:</p>
          <pre>let isStrictEqual = 5 === "5";</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>false</p>
        `;
        break;
      case 'not-equal':
        breakdownContent = `
          <strong>!=</strong> (Not Equal):
          <p>The not equal operator checks if two values are not equal, performing type coercion if necessary.</p>
          <pre>Syntax: a != b</pre>
          <p>Example:</p>
          <pre>let isNotEqual = 5 != "5";</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>false</p>
        `;
        break;
      case 'strict-not-equal':
        breakdownContent = `
          <strong>!==</strong> (Strict Not Equal):
          <p>The strict not equal operator checks if two values are not equal and/or not of the same type.</p>
          <pre>Syntax: a !== b</pre>
          <p>Example:</p>
          <pre>let isStrictNotEqual = 5 !== "5";</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>true</p>
        `;
        break;
      case 'comparison':
        breakdownContent = `
          <strong><, >, <=, >=</strong> (Comparison Operators):
          <p>These operators compare two values and return true or false based on the condition.</p>
          <pre>Syntax: a < b, a > b, a <= b, a >= b</pre>
          <p>Examples:</p>
          <pre>let isLessThan = 3 < 5;</pre>
          <pre>let isGreaterThan = 7 > 4;</pre>
          <pre>let isLessThanOrEqual = 3 <= 3;</pre>
          <pre>let isGreaterThanOrEqual = 8 >= 6;</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>true</p>
        `;
        break;
      // Control Flow Examples
      case 'if':
        breakdownContent = `
          <strong>if</strong> (Conditional Statement):
          <p>The if statement is used to execute a block of code if a specified condition is true.</p>
          <pre>Syntax: if (condition) { code }</pre>
          <p>Example:</p>
          <pre>if (x > 5) { console.log("Greater than 5"); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>Greater than 5</p>
        `;
        break;
      case 'else-if':
        breakdownContent = `
          <strong>else if</strong> (Conditional Statement):
          <p>The else if statement is used when there are multiple conditions to check.</p>
          <pre>Syntax: if (condition) { code } else if (anotherCondition) { code }</pre>
          <p>Example:</p>
          <pre>if (x > 5) { console.log("Greater than 5"); } else if (x === 5) { console.log("Equal to 5"); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>Equal to 5</p>
        `;
        break;
      case 'else':
        breakdownContent = `
          <strong>else</strong> (Conditional Statement):
          <p>The else statement defines a block of code that will execute if the condition in the if or else-if statement is false.</p>
          <pre>Syntax: if (condition) { code } else { code }</pre>
          <p>Example:</p>
          <pre>if (x > 5) { console.log("Greater than 5"); } else { console.log("Not greater than 5"); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>Not greater than 5</p>
        `;
        break;
      case 'switch':
        breakdownContent = `
          <strong>switch</strong> (Switch Statement):
          <p>The switch statement is used to execute one out of many blocks of code based on the value of an expression.</p>
          <pre>Syntax: switch (expression) { case value1: code; break; default: code }</pre>
          <p>Example:</p>
          <pre>switch (x) { case 1: console.log("One"); break; case 2: console.log("Two"); break; default: console.log("Other"); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>Other</p>
        `;
        break;
      case 'curly-braces':
        breakdownContent = `
          <strong>{ }</strong> (Curly Braces):
          <p>Curly braces are used to define blocks of code, such as the body of functions or loops.</p>
          <pre>Syntax: { code }</pre>
          <p>Example:</p>
          <pre>function greet() { console.log("Hello"); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>Hello</p>
        `;
        break;
      // Loop Examples
      case 'for':
        breakdownContent = `
          <strong>for</strong> (For Loop):
          <p>The for loop is used to repeat a block of code a specified number of times.</p>
          <pre>Syntax: for (initialization; condition; increment) { code }</pre>
          <p>Example:</p>
          <pre>for (let i = 0; i < 3; i++) { console.log(i); }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>0 1 2</p>
        `;
        break;
      case 'while':
        breakdownContent = `
          <strong>while</strong> (While Loop):
          <p>The while loop repeats a block of code as long as the specified condition is true.</p>
          <pre>Syntax: while (condition) { code }</pre>
          <p>Example:</p>
          <pre>let i = 0; while (i < 3) { console.log(i); i++; }</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>0 1 2</p>
        `;
        break;
      case 'do-while':
        breakdownContent = `
          <strong>do...while</strong> (Do-While Loop):
          <p>The do-while loop is similar to the while loop, but it executes the code block at least once before checking the condition.</p>
          <pre>Syntax: do { code } while (condition)</pre>
          <p>Example:</p>
          <pre>let i = 0; do { console.log(i); i++; } while (i < 3);</pre>
        `;
        exampleContent = `
          <pre>Terminal Output:</pre>
          <p>0 1 2</p>
        `;
        break;
    }

    // Inject content into the page
    document.getElementById('syntax-breakdown').innerHTML = breakdownContent;
    document.getElementById('syntax-example').innerHTML = exampleContent;
  }

  // Update content when dropdown selection changes
  syntaxDropdown.addEventListener('change', function() {
    updateContent(this.value);
  });

  // Initialize with the default selection (addition)
  updateContent(syntaxDropdown.value);
}






  

});
