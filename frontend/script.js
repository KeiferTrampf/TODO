// Function to display JSON data
function displayData(data) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear previous list items

  data.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }
    li.textContent = `
            Title: ${task.title}, 
            Description: ${task.description}, 
            Due Date: ${new Date(task.dueDate).toLocaleString()}, 
            Completed: ${task.completed ? "Yes" : "No"}
        `;

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task._id));
    li.appendChild(deleteButton);

    // Add update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => updateTask(task));
    li.appendChild(updateButton);

    // Append task ID to the list item and hide it from the user
    const taskId = document.createElement("span");
    taskId.textContent = `ID: ${task._id}`;
    taskId.style.display = "none"; // Hide the ID from the user
    li.appendChild(taskId);

    taskList.appendChild(li);
  });
}

// Function to handle search
async function filterData(query) {
  if (!query) {
    fetchData();
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/api/todo/search?keyword=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to fetch initial data
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/todo");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to create a new task
async function createTask(task) {
  try {
    const response = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    fetchData(); // Refresh the task list
  } catch (error) {
    console.error("Error creating task:", error);
  }
}

// Function to delete a task
async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    fetchData(); // Refresh the task list
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Function to update a task
async function updateTask(task) {
  const updatedTask = { completed: !task.completed }; // Toggle the completed value
  try {
    const response = await fetch(`http://localhost:3000/api/todo/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    fetchData(); // Refresh the task list
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Initial fetch of data
fetchData();

// Event listener for search bar
document.getElementById("searchBar").addEventListener("input", (event) => {
  filterData(event.target.value);
});

// Example: Add a form for creating tasks
const createForm = document.createElement("form");
createForm.innerHTML = `
  <input type="text" id="title" placeholder="Title" required />
  <input type="text" id="description" placeholder="Description" required />
  <input type="datetime-local" id="dueDate" required />
  <button type="submit">Add Task</button>
`;
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    completed: false,
  };
  createTask(task);
});
document.body.insertBefore(createForm, document.getElementById("taskList"));
