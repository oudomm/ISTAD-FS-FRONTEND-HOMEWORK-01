function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const id = getIdFromQuery();
const details = document.getElementById("project-details");
const result = document.getElementById("result");
const deployBtn = document.getElementById("deploy-btn");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function loadProject() {
  fetch(`https://mini-deploy-manager-api.onrender.com/api/projects/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Project not found.");
      return res.json();
    })
    .then((project) => {
      details.innerHTML = `
        <h2>${project.name}</h2>
        <p><strong>Git URL:</strong> <a href="${
          project.gitUrl
        }" target="_blank">${project.gitUrl}</a></p>
        <p><strong>Status:</strong> ${project.deploymentStatus || "Unknown"}</p>
        <p><strong>Deployed URL:</strong> <a href="${
          project.deployedUrl
        }" target="_blank">${project.deployedUrl || "Not yet deployed"}</a></p>
        <p><a href="../index.html">← Back to Project List</a></p>
      `;
    })
    .catch((err) => {
      details.innerHTML = `
        <p>❌ ${err.message}</p>
        <p><a href="../index.html">← Go back to project list</a></p>
      `;
      deployBtn.style.display = "none";
    });
}

if (!id) {
  details.innerHTML = `
    <p>❌ No project ID provided.</p>
    <p><a href="../index.html">← Go back to project list</a></p>
  `;
  deployBtn.style.display = "none";
} else {
  loadProject();
}

deployBtn.addEventListener("click", async () => {
  if (!id) return;
  result.textContent = `⏳ Triggering deployment...`;

  try {
    const res = await fetch(
      `https://mini-deploy-manager-api.onrender.com/api/projects/${id}/deploy`,
      {
        method: "POST",
      }
    );

    if (res.ok) {
      const msg = await res.text();
      result.textContent = msg;
      showToast(`🚀 Deployment triggered!`);
      loadProject(); // Auto-refresh the status
    } else {
      result.textContent = `❌ Failed to trigger deployment.`;
      showToast(`❌ Deployment failed!`, false);
    }
  } catch (err) {
    result.textContent = `❌ Error: ` + err.message;
    showToast(`❌ ` + err.message, false);
  }
});
