//browser.storage.session.setAccessLevel("TRUSTED_AND_UNTRUSTED_CONTEXTS");

var totalClicks = 0;
browser.runtime.onMessage.addListener( function (message, sender, sendResponse) {
  if (message.updatedClicks){
    totalClicks = message.updatedClicks;
  }
  else if (message.getClicks){
    browser.runtime.sendMessage({updatedClicks : totalClicks});
  }
});

browser.storage.local.get().then((items) => {
  console.log("background.js: setting total clicks to " + items.click_count);
  console.log(items)
  totalClicks = items.click_count;
});
