// app.js
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("nav li");
  const container = document.getElementById("example-container");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      event.preventDefault();
      const example = item.dataset.example;
      loadExample(example);
    });
  });

  function loadExample(exampleId) {
    switch (exampleId) {
      case "1":
        setupExample1();
        break;
      case "2":
        setupExample2();
        break;
      case "3":
        container.innerHTML = `
          <h2>Form Validation</h2>
          <p>This is where the content for Example 3 will go.</p>
        `;
        break;
      case "4":
        container.innerHTML = `
          <h2>Animations</h2>
          <p>This is where the content for Example 4 will go.</p>
        `;
        break;
      case "5":
        container.innerHTML = `
          <h2>Fetch API</h2>
          <p>This is where the content for Example 5 will go.</p>
        `;
        break;
      case "6":
        container.innerHTML = `
          <h2>Arrays & Sorting</h2>
          <p>This is where the content for Example 6 will go.</p>
        `;
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

});
