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
          <td>&nbsp;<a href="./pages/status.html?id=${
            project.id
          }">View Details</a>&nbsp;</td>
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
