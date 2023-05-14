chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.get(tab.id, function (tabInfo) {
    var notificationOptions = {
      type: "basic",
      iconUrl: "icon.png",
      title: "Nueva pestaña creada",
      message: tabInfo.title,
    };

    chrome.notifications.create(notificationOptions);
  });

  chrome.tabs.query({}, function (tabs) {
    var tabList = tabs.map(function (tab) {
      return tab.title;
    });

    console.log("Pestañas existentes:", tabList);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^https/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./buscaGoogle.js"],
      })
      .then(() => {
        console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }
});
