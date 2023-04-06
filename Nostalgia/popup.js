document.getElementById('toggleNostalgia').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleNostalgia' });
    });
  });
  
  document.getElementById('excludedWebsites').addEventListener('input', (event) => {
    const excludedWebsites = event.target.value.split(',').map((website) => website.trim());
    chrome.storage.sync.set({ excludedWebsites });
  });
  
  chrome.storage.sync.get('excludedWebsites', (data) => {
    if (data.excludedWebsites) {
      document.getElementById('excludedWebsites').value = data.excludedWebsites.join(', ');
    }
  });  