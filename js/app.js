// app.js
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("nav li");
  const container = document.getElementById("example-container");

  navItems.forEach(item => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const example = item.dataset.example;
      console.log(`Example ID: ${example}`);  // Ensure correct example ID
      loadExample(example, container);  // Ensure 'container' is passed to loadExample
    });
  });

  function loadExample(exampleId, container) {
    console.log(`Loading example: ${exampleId}`); // Log the example ID
    switch (exampleId) {
      case "1":
        setupExample1(container);
        break;
      case "2":
        setupExample2(container);
        break;
      case "3":
        setupExample3(container);
        break;
      case "4":
       setupExample4(container);
        break;
      case "5":
        setupExample5(container);
        break;
      case "6":
        setupExample6(container);
        break;
      case "7":
        container.innerHTML = `
          <h2>Timers</h2>
          <p>This is where the content for Example 7 will go.</p>
        `;
        break;
      case "8":
        container.innerHTML = `
          <h2>Conditional Logic</h2>
          <p>This is where the content for Example 8 will go.</p>
        `;
        break;
      case "9":
        container.innerHTML = `
          <h2>Objects</h2>
          <p>This is where the content for Example 9 will go.</p>
        `;
        break;
      case "10":
        container.innerHTML = `
          <h2>Drag & Drop</h2>
          <p>This is where the content for Example 10 will go.</p>
        `;
        break;
      default:
        container.innerHTML = `<h2>Welcome to JsHelper!</h2>`;
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

function setupExample6(container) {
  // Set the innerHTML for the container
  console.log('Setting up Example 6'); // Log that the function is being called
  container.innerHTML = `
    <h2>Arrays and Sorting Visualizations</h2>
    <p>This example demonstrates how to visualize sorting algorithms using JavaScript.</p>
    
    <label for="sort-select">Choose a sorting algorithm:</label>
    <select id="sort-select">
      <option value="bubbleSort">Bubble Sort</option>
      <option value="selectionSort">Selection Sort</option>
      <option value="insertionSort">Insertion Sort</option>
    </select>
  
    <div id="array-container"></div>
    <div id="explanation"></div>
  
    <button id="start-sort">Start Sorting</button>
    <button id="reset-array">Reset Array</button>
  
    <h3>JavaScript Code</h3>
    <pre id="code-output" class="code-output"></pre>
  `;

  // Elements for the example
  const arrayContainer = document.getElementById('array-container');
  const startSortButton = document.getElementById('start-sort');
  const resetButton = document.getElementById('reset-array');
  const select = document.getElementById('sort-select');
  const explanation = document.getElementById('explanation');
  const codeOutput = document.getElementById('code-output');

  // Make sure all elements are correctly found
  if (!arrayContainer || !startSortButton || !resetButton || !select || !explanation || !codeOutput) {
    console.error("One or more elements are not found!");
    return;
  }

  // Generate a random array
  let array = generateRandomArray();
  let highlightTimeout;

  // Function to render the array as bars
  function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
      const div = document.createElement('div');
      div.style.width = `${value * 3}px`;  // Width based on value
      div.style.height = '30px';
      div.style.backgroundColor = 'skyblue';
      div.style.margin = '5px';
      div.style.display = 'inline-block';
      div.style.textAlign = 'center';
      div.style.verticalAlign = 'bottom';
      div.innerText = value;
      arrayContainer.appendChild(div);
    });
  }

  // Function to generate a random array
  function generateRandomArray() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
  }

  // Render the initial array
  renderArray();

  // Event listener for start button
  startSortButton.addEventListener('click', () => {
    const algorithm = select.value;
    explanation.innerHTML = ''; // Clear explanation
    codeOutput.innerHTML = '';  // Clear code output
    if (algorithm === 'bubbleSort') {
      bubbleSort();
    } else if (algorithm === 'selectionSort') {
      selectionSort();
    } else if (algorithm === 'insertionSort') {
      insertionSort();
    }
  });

  // Event listener for reset button
  resetButton.addEventListener('click', () => {
    clearTimeout(highlightTimeout);  // Clear the timeout to stop highlighting when reset
    array = generateRandomArray();
    renderArray();
    codeOutput.innerHTML = ''; // Clear code output
    explanation.innerHTML = ''; // Clear explanation
  });

  // Bubble Sort function
  function bubbleSort() {
    let i = 0;
    let j = 0;
    const delay = 100;  // Delay in milliseconds for visualizing sorting
    const totalArrayLength = array.length;

    function step() {
      if (i < totalArrayLength) {
        if (j < totalArrayLength - i - 1) {
          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];  // Swap the elements
            renderArray();
            explanation.innerHTML = `Step ${i + 1}.${j + 1}: Swap ${array[j]} and ${array[j + 1]}`;
            highlightCodeLines();
          }
          j++;
          highlightTimeout = setTimeout(step, delay);
        } else {
          j = 0;
          i++;
          highlightTimeout = setTimeout(step, delay);
        }
      }
    }
    step();
  }

  // Selection Sort function
  function selectionSort() {
    let i = 0;
    let j = 0;
    const delay = 100;  // Delay in milliseconds for visualizing sorting
    const totalArrayLength = array.length;

    function step() {
      if (i < totalArrayLength) {
        let minIndex = i;
        for (j = i + 1; j < totalArrayLength; j++) {
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }
        if (minIndex !== i) {
          [array[i], array[minIndex]] = [array[minIndex], array[i]];  // Swap the elements
          renderArray();
          explanation.innerHTML = `Step ${i + 1}: Swap ${array[i]} and ${array[minIndex]}`;
          highlightCodeLines();
        }
        i++;
        highlightTimeout = setTimeout(step, delay);
      }
    }
    step();
  }

  // Insertion Sort function
  function insertionSort() {
    let i = 1;
    const delay = 100;  // Delay in milliseconds for visualizing sorting
    const totalArrayLength = array.length;

    function step() {
      if (i < totalArrayLength) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
          array[j + 1] = array[j];
          j--;
          renderArray();
          explanation.innerHTML = `Step ${i}: Insert ${current} into the correct position`;
          highlightCodeLines();
        }
        array[j + 1] = current;
        renderArray();
        i++;
        highlightTimeout = setTimeout(step, delay);
      }
    }
    step();
  }

  // Function to highlight code lines
  function highlightCodeLines() {
    const lines = document.querySelectorAll('.code-line');
    let i = 0;
    
    function highlightLine() {
      if (i > 0) {
        lines[i - 1].classList.remove('highlight');
      }
      
      if (i < lines.length) {
        lines[i].classList.add('highlight');
        i++;
        highlightTimeout = setTimeout(highlightLine, 1000);  // Delay for each highlight
      }
    }
    
    highlightLine();
  }
}





  

});
