document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleBtn");

    // Load current state
    chrome.storage.local.get("highlightEnabled", (data) => {
        const isEnabled = data.highlightEnabled ?? true; // Default: enabled
        updateButton(isEnabled);
    });

    // Toggle highlighting when button is clicked
    toggleBtn.addEventListener("click", () => {
        chrome.storage.local.get("highlightEnabled", (data) => {
            const newState = !data.highlightEnabled;
            chrome.runtime.sendMessage({ action: "toggleHighlight", state: newState });
            updateButton(newState);
        });
    });

    function updateButton(state) {
        toggleBtn.textContent = state ? "Disable Highlighting" : "Enable Highlighting";
        toggleBtn.classList.toggle("off", !state);
    }
});
