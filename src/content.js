console.log("✅ Content script is running! Requesting data from background...");

// Check if highlighting is enabled before applying
chrome.storage.local.get("highlightEnabled", (data) => {
    const isEnabled = data.highlightEnabled ?? true; // Default: enabled
    console.log(`🔄 Highlighting is ${isEnabled ? "ENABLED" : "DISABLED"}`);

    if (isEnabled) {
        applyHighlighting();
    }
});

// Listen for toggle updates
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleHighlight") {
        if (message.state) {
            console.log("🔄 Enabling highlighting...");
            applyHighlighting();
        } else {
            console.log("⛔ Removing highlights...");
            removeHighlighting();
        }
    }
});

// Function to apply highlighting
function applyHighlighting() {
    chrome.runtime.sendMessage({ action: "getSearchTerms" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error fetching search terms:", chrome.runtime.lastError);
        } else {
            const searchTerms = response || {};
            console.log("✅ Received search terms:", searchTerms);
            highlightOccurrences(document.body, searchTerms);
        }
    });
}

// Function to remove all highlights
function removeHighlighting() {
    document.querySelectorAll(".highlighted-term").forEach(el => {
        el.replaceWith(el.textContent);
    });
}

// Function to highlight occurrences
function highlightOccurrences(node, searchTerms) {
    if (node.nodeType === 3) { // Text node
        let text = node.nodeValue;
        let newNode = document.createDocumentFragment();
        let lastIndex = 0;

        Object.keys(searchTerms).forEach(term => {
            let regex = new RegExp(`\\b${term}\\b`, "gi");
            let match;
            while ((match = regex.exec(text)) !== null) {
                newNode.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));

                let span = document.createElement("span");
                span.className = "highlighted-term";
                span.textContent = match[0];

                // Store title and description in data attributes
                span.setAttribute("data-title", searchTerms[term].title);
                span.setAttribute("data-body", searchTerms[term].body);

                newNode.appendChild(span);
                lastIndex = regex.lastIndex;
            }
        });

        newNode.appendChild(document.createTextNode(text.substring(lastIndex)));
        node.parentNode.replaceChild(newNode, node);
    } else if (node.nodeType === 1 && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
            highlightOccurrences(node.childNodes[i], searchTerms);
        }
    }
}
