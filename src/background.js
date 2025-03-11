console.log("✅ Background script running...");

// Notion API credentials
let NOTION_API_KEY_FROM_LOCAL_STORAGE="";
let NOTION_DATABASE_ID_FROM_LOCAL_STORAGE = "";

// Global storage for search terms
let searchTerms = {};

// Fetch and store Notion data
async function fetchNotionData() {
    try {
        const NOTION_API_BASE_URL = "https://api.notion.com/v1/databases/";
        const notionApiUrl = `${NOTION_API_BASE_URL}${NOTION_DATABASE_ID_FROM_LOCAL_STORAGE}/query`;
        const response = await fetch(notionApiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_API_KEY_FROM_LOCAL_STORAGE}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        searchTerms = formatNotionData(data);
        console.log("✅ Updated searchTerms from Notion:", searchTerms);
    } catch (error) {
        console.error("❌ Error fetching Notion data:", error);
    }
}

// Function to extract search terms from Notion response
function formatNotionData(notionData) {
    const formattedTerms = {};

    notionData.results.forEach(page => {
        const term = page.properties.Name?.title?.[0]?.text?.content || "Unknown";
        const title = page.properties.Title?.rich_text?.[0]?.text?.content || term;
        const body = page.properties.Description?.rich_text?.[0]?.text?.content || "No description available.";

        formattedTerms[term] = { title, body };
    });

    return formattedTerms;
}

// Handle messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSearchTerms") {
        console.log("🔄 Sending search terms to content script...");
        sendResponse(searchTerms);
    }
});

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleHighlight") {
        console.log(`🔄 Toggling highlight to ${message.state ? "ON" : "OFF"}`);
        chrome.storage.local.set({ highlightEnabled: message.state });

        // Notify content script to update highlighting
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "toggleHighlight", state: message.state });
            }
        });
    }
});

// Load both API key and database ID from storage before fetching data
chrome.storage.local.get(["notionApiKey", "notionDatabaseID"], (data) => {
    if (data.notionApiKey && data.notionDatabaseID) {
        NOTION_API_KEY_FROM_LOCAL_STORAGE = data.notionApiKey;
        NOTION_DATABASE_ID_FROM_LOCAL_STORAGE = data.notionDatabaseID;
        console.log("✅ Notion API Key and Database ID loaded from storage.");
        fetchNotionData(); // Fetch data only when both values are available
    } else {
        console.warn("❌ Missing Notion API Key or Database ID! Please set them in the options.");
    }
});
