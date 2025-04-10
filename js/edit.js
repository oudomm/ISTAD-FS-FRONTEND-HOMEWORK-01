function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const id = getIdFromQuery();
const form = document.getElementById("edit-form");
const nameInput = document.getElementById("name");
const gitUrlInput = document.getElementById("gitUrl");
const message = document.getElementById("message");

// Load current project data
fetch(`http://localhost:8080/api/projects/${id}`)
  .then((res) => {
    if (!res.ok) throw new Error("Project not found.");
    return res.json();
  })
  .then((project) => {
    nameInput.value = project.name;
    gitUrlInput.value = project.gitUrl;
  })
  .catch((err) => {
    message.textContent = "❌ " + err.message;
    form.style.display = "none";
  });

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedProject = {
    name: nameInput.value,
    gitUrl: gitUrlInput.value,
  };

  fetch(`http://localhost:8080/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProject),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Update failed.");
      return res.json();
    })
    .then(() => {
      message.textContent = "✅ Project updated successfully.";
    })
    .catch((err) => {
      message.textContent = "❌ " + err.message;
    });
});
