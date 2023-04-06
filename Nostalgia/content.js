chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleNostalgia') {
      toggleNostalgiaMode();
    }
  });
  
  function toggleNostalgiaMode() {
    const nostalgiaMode = document.getElementById('nostalgia-mode');
    if (nostalgiaMode) {
      nostalgiaMode.remove();
      removeNostalgiaClass();
    } else {
      applyNostalgiaMode();
    }
  }
  
  function applyNostalgiaMode() {
    const nostalgiaMode = document.createElement('div');
    nostalgiaMode.setAttribute('id', 'nostalgia-mode');
    document.body.appendChild(nostalgiaMode);
  
    const allElements = document.querySelectorAll('*');
    for (const element of allElements) {
      element.classList.add('nostalgia');
    }
  }
  
  function removeNostalgiaClass() {
    const allElements = document.querySelectorAll('.nostalgia');
    for (const element of allElements) {
      element.classList.remove('nostalgia');
    }
  }
  
  chrome.storage.sync.get('excludedWebsites', (data) => {
    if (data.excludedWebsites) {
      const currentURL = window.location.href;
      const excluded = data.excludedWebsites.some((website) =>
        currentURL.includes(website)
      );
  
      if (!excluded) {
        applyNostalgiaMode();
      }
    } else {
      applyNostalgiaMode();
    }
  });
  