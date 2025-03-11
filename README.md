# Highlighter & Tooltip for Notion  

## Overview  
Highlighter & Tooltip for Notion is a Chrome extension that automatically highlights key terms from a Notion database and displays tooltips with additional details when hovered. The extension is designed to enhance productivity for researchers, students, writers, business teams, and developers by providing quick access to definitions and explanations stored in Notion.  

## Features  
- Syncs with Notion and retrieves key terms dynamically  
- Highlights relevant terms on any webpage  
- Displays tooltips with definitions and descriptions  
- Allows users to enter their own Notion API key and database ID  
- Provides a toggle to enable or disable highlighting  
- Stores API credentials securely in local storage  
- Works seamlessly across different types of content  

## Installation  

### Option 1: From the Chrome Web Store (Coming Soon)  
A link to the Chrome Web Store will be provided once the extension is published.  

### Option 2: Manual Installation  
1. Clone the repository: download zip and unpack locally. choose the place to unpack wisely, as you have to let the files there in order for the extension to work properly.
2. Open Chrome and navigate to `chrome://extensions/`  
3. Enable Developer Mode using the toggle in the top-right corner  
4. Click **"Load Unpacked"** and select the `"src"` folder which is within the unpack folder.  

## Setup and Configuration  

### Generate a Notion API Key  
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)  
2. Click **"New Integration"**, name the integration, and select a workspace  
3. Copy the **"Internal Integration Token"** provided by Notion, we will use it shortly.

### Create a Notion Database  
The database must have at least the following three fields:

| **Property Name** | **Type**  | **Purpose**                                       |
|--------------|-------|-------------------------------------------------|
| Name         | Name | The term to highlight                           |
| Title        | Text  | The title displayed in the tooltip (optional)  |
| Description  | Text  | The detailed description shown in the tooltip  |

#### Example Database Entries

| Name       | Title                         | Description                                                     |
|-----------|-----------------------------|-----------------------------------------------------------------|
| AI        | Artificial Intelligence      | A field of computer science focused on creating intelligent machines. |
| Blockchain| Blockchain Technology       | A decentralized ledger used for recording transactions securely. |
| API       | Application Programming Interface | A way for different applications to communicate. |

### Allow the Extension to Access the Notion Database  
1. Open the Notion database  
2. Click **"Share"** in the top-right corner  
3. Add the integration that was created earlier and grant access  

### Configure the Extension Options in the Chrome Administration Panel

#### 1. Open Chrome's Extension Management Page
- Click on the three-dot menu (**⋮**) in the top-right corner of Chrome.  
- Go to **Extensions** > **Manage Extensions**, or directly enter the following in your address bar:  `chrome://extensions/`

#### 2. Find the Extension "Highlight & Tooltip"
- Scroll through the list of installed extensions or use the search bar

#### 3. Open the Options Page
- You will see a **“Details”** button below its name — click on it.  
- Look for the **“Extension options”** or **“Options”** section.  
- Click on the **“Options”** button to open the settings page.

#### 4. input configuratio infos
- Paste the Notion API Key into the appropriate field  - Click **"save API key"**
- Copy the Notion Database ID from the URL of the Notion database. (see below to find it, if you don't know) - Click **"Save Database ID"**  

## Usage  
- The extension will automatically highlight words found in the Notion database when browsing webpages  
- Hover over a highlighted word to view its definition in a tooltip  
- Click the extension icon to toggle highlighting on or off  

## Customization  
- Users can update their Notion API Key and Database ID at any time via the extension settings  
- Highlighting can be enabled or disabled as needed  
- Future updates will include additional styling options for tooltips and highlights  

## Privacy and Security  
- The Notion API Key and Database ID are stored locally and are never transmitted externally  
- The extension reads Notion data but does not modify any database content  
- No user data is collected or stored outside of Chrome's local storage  

## Use Cases  
- Researchers and students can quickly reference key terms and definitions  
- Writers and editors can maintain a glossary of frequently used terms  
- Business teams can ensure company-wide terminology consistency  
- Developers can highlight and retrieve definitions for technical terms  

## Troubleshooting and FAQ  

**Why aren't highlights appearing?**  
- Ensure that the Notion API Key and Database ID are correct  
- Confirm that the Notion database is shared with the integration  
- Open Chrome Developer Tools (`F12 > Console`) to check for errors  

**How do I find my Notion Database ID?**  
1. Open the Notion database  
2. Look at your databse URL, it looks like:  
   ```
   https://www.notion.so/workspace/1ac1993412cc8050b8eec06cd4c9cefd?v=abcdef
   ```
3. Copy the long ID between `workspace/`  and `?v=`

**Is the Notion API Key shared with third parties?**  
No, the API Key is stored securely in Chrome’s local storage and is never sent to external servers.  

**Can the Notion API Key be updated?**  
Yes, the API Key can be updated at any time via the extension settings.  

## Additional Resources  
- [Notion API Documentation](https://developers.notion.com)  
- [Report a Bug or Feature Request](https://github.com/kriss2013/highlight-tooltip-for-notion/issues)  

## License  
This project is licensed under the **MIT License**, allowing users to freely use, modify, and distribute the extension.  

## Why Use Highlighter & Tooltip for Notion?  
Unlike other highlighter tools, this extension integrates directly with Notion, providing real-time access to structured knowledge. It ensures that key terms and definitions are easily accessible without the need for manual lookups, making research, writing, and professional work more efficient.
