document.addEventListener("DOMContentLoaded", function () {
    const inputAPI = document.getElementById("notionApiKey");
    const saveAPIButton = document.getElementById("saveApiKey");
    const inputDB = document.getElementById("notionDatabaseID");
    const saveDatabaseIDButton = document.getElementById("saveDatabaseID");
    const status = document.getElementById("status");

    // Load stored API key when options page opens
    chrome.storage.local.get("notionApiKey", (data) => {
        if (data.notionApiKey) {
            inputAPI.value = data.notionApiKey; // Pre-fill input with stored key
        }
    });

    // Save API key when user clicks "Save"
    saveAPIButton.addEventListener("click", function () {
        const apiKey = inputAPI.value.trim();

        if (apiKey) {
            chrome.storage.local.set({ notionApiKey: apiKey }, () => {
                status.textContent = "✅ API Key Saved!";
                setTimeout(() => { status.textContent = ""; }, 2000);
            });
        } else {
            status.textContent = "❌ Please enter a valid API Key.";
        }
    });
    
    // Load stored DB key when options page opens
    chrome.storage.local.get("notionDatabaseID", (data) => {
        if (data.notionDatabaseID) {
            inputDB.value = data.notionDatabaseID; // Pre-fill input with stored key
        }
    });

    // Save API key when user clicks "Save"
    saveDatabaseIDButton.addEventListener("click", function () {
        const databaseID = inputDB.value.trim();

        if (databaseID) {
            chrome.storage.local.set({ notionDatabaseID: databaseID }, () => {
                status.textContent = "✅ Database ID  Saved!";
                setTimeout(() => { status.textContent = ""; }, 2000);
            });
        } else {
            status.textContent = "❌ Please enter a valid Database ID.";
        }
    });
    
    
});
