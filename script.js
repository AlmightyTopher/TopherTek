// Function to decrypt the API token using Web Crypto API
async function getDecryptedToken() {
  try {
    const response = await fetch('config.enc'); // Read encrypted token file
    const encryptedData = await response.text();

    const keyResponse = await fetch('key.enc'); // Read decryption key file
    const secretKeyHex = await keyResponse.text();

    if (!encryptedData || !secretKeyHex) {
      throw new Error("🔴 Encrypted file or key file is missing!");
    }

    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const secretKey = new Uint8Array(secretKeyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Import the key using Web Crypto API
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      secretKey,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    // Convert the encrypted string back to bytes
    const encryptedBytes = new Uint8Array(encrypted.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Decrypt the token
    const decryptedBytes = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encryptedBytes
    );

    const decryptedToken = new TextDecoder().decode(decryptedBytes);
    console.log("🔑 Decrypted API Token:", decryptedToken);
    return decryptedToken;

  } catch (error) {
    console.error("❌ Failed to decrypt API token:", error);
    return null;
  }
}

// Audiobookshelf API Base URL
const AUDIOSHELF_API_BASE = "https://audiobookshelf.tophersnet.site/api";

// Fetch Audiobookshelf status
async function fetchAudiobookshelfStatus(apiToken) {
  try {
    const response = await fetch(`${AUDIOSHELF_API_BASE}/status`, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });
    const data = await response.json();
    return data.isInit ? "✅ Online" : "❌ Offline";
  } catch (error) {
    console.error("Error fetching Audiobookshelf status:", error);
    return "⚠️ Error";
  }
}

// Populate the dashboard with the decrypted API token
async function populateTable() {
  const apiToken = await getDecryptedToken();
  if (!apiToken) {
    console.error("❌ API token decryption failed. Services will not load.");
    return;
  }

  console.log("🔑 Using API Token:", apiToken);

  const tableBody = document.getElementById("serviceTable");
  const services = [
    { id: 1, name: "Audiobook Library", url: "https://audiobookshelf.tophersnet.site", icon: "audiobookshelf", category: "Media", api: true },
    { id: 2, name: "SABnzbd", url: "https://sabnzbd.tophersnet.site", icon: "sabnzbd", category: "Downloads" },
    { id: 3, name: "Radarr", url: "https://radarr.tophersnet.site", icon: "radarr", category: "Media" },
    { id: 4, name: "Sonarr", url: "https://sonarr.tophersnet.site", icon: "sonarr", category: "Media" }
  ];

  for (const service of services) {
    let status = "⏳ Loading...";
    if (service.api) {
      status = await fetchAudiobookshelfStatus(apiToken);
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${service.id}</td>
      <td>
        <a href="${service.url}">
          <img src="https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/png/${service.icon}.png"
               alt="${service.name} Icon" class="service-icon" style="width: 24px; height: 24px; margin-right: 8px;"> 
          ${service.name}
        </a>
      </td>
      <td>${service.category}</td>
      <td><span class="status">${status}</span></td>
      <td>
        <button class="action-btn logs" onclick="alert('Viewing logs for ${service.name}')">📜 Logs</button>
      </td>
    `;
    tableBody.appendChild(row);
  }

  console.log("✅ Table populated successfully!");
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", populateTable);
