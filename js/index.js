window.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("project-list");

  fetch("http://localhost:8080/api/projects")
    .then((res) => res.json())
    .then((projects) => {
      projects.forEach((project) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>&nbsp;${project.name}&nbsp;</td>
        <td>&nbsp;<a href="${project.gitUrl}" target="_blank">${
          project.gitUrl
        }</a>&nbsp;</td>
        <td>&nbsp;${project.deploymentStatus || "Unknown"}&nbsp;</td>
        <td>
          <a href="./pages/status.html?id=${project.id}">View</a>&nbsp;|&nbsp;
          <a href="./pages/edit.html?id=${project.id}">Edit</a>&nbsp;|&nbsp;
          <button onclick="deleteProject('${project.id}')">Delete</button>
        </td>
      `;

        list.appendChild(tr);
      });
    })
    .catch((err) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="4">❌ Error loading projects.</td>`;
      list.appendChild(tr);
      console.error(err);
    });
});

function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Project deleted.");
          window.location.reload();
        } else {
          alert("❌ Failed to delete project.");
        }
      })
      .catch((err) => {
        alert("❌ Error: " + err.message);
      });
  }
}
