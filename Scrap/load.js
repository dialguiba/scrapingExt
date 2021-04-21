var port = chrome.runtime.connect();
port.postMessage({ loaded: "loaded" });
