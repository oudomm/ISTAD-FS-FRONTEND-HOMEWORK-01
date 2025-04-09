window.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("project-list");

  fetch("http://localhost:8080/api/projects")
    .then((res) => res.json())
    .then((projects) => {
      projects.forEach((project) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${project.name}</strong> (<a href="${
          project.gitUrl
        }" target="_blank">Git URL</a>)<br/>
          Status: ${project.deploymentStatus || "Unknown"}<br/>
          <a href="status.html?id=${project.id}">View Details</a>
        `;
        list.appendChild(li);
      });
    })
    .catch((err) => {
      list.innerHTML = "<li>Error loading projects.</li>";
      console.error(err);
    });
});
