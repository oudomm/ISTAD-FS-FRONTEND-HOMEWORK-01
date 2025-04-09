document
  .getElementById("project-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const gitUrl = form.gitUrl.value;

    const res = await fetch("http://localhost:8080/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, gitUrl }),
    });

    if (res.ok) {
      document.getElementById("message").textContent = "✅ Project added!";
      form.reset();
    } else {
      document.getElementById("message").textContent =
        "❌ Failed to add project.";
    }
  });
