var totalClicks = 0;
var totalKeys = 0;
var bc = 0;
var keysUnlocked = false;
var contentTabId;

browser.runtime.onMessage.addListener( function (message, sender, sendResponse) {
  browser.storage.local.get().then((items) => {
    totalClicks = items.click_count;
    totalKeys = items.key_count;
    bc = items.bc_count;
    keysUnlocked = items.keys_unlocked;

    if (message.from == "content") {  //get content scripts tab id
      contentTabId = sender.tab.id;
    }
    else if (message.updatedClicks){
      totalClicks = message.updatedClicks;
    }
    else if (message.getClicks){
      if (contentTabId){
        browser.tabs.sendMessage(contentTabId, {updateClicks : true}); //asks content.js to update its current click count
      }
    }
    else if (message.getBc){
      browser.runtime.sendMessage({updatedBc : bc});
    }
    else if (message.updatedKeys){
      totalKeys = message.updatedKeys;
    }
    else if (message.getKeys && keysUnlocked){
      if (contentTabId){
        browser.tabs.sendMessage(contentTabId, {updateKeys : true}); //asks content.js to update its current key count
      }
    }
  });
});

browser.storage.local.get().then((items) => {
  console.log(items)
  totalClicks = items.click_count;
  totalKeys = items.key_count;
  bc = items.bc_count;
  keysUnlocked = items.keys_unlocked;
});
