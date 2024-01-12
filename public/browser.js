// Workaround because browser object is not accessible from react

browser.runtime.onMessage.addListener((message) => {
    if (message.updatedClicks){
        document.dispatchEvent(new CustomEvent("updated-clicks", { detail: {
            clicks: message.updatedClicks,
          }
        }));   
    }
});

document.addEventListener("get-clicks", (e) => {
    browser.runtime.sendMessage({getClicks : true});
});

var hasPermissions = false;

async function checkPermissions(){
    const permissions = await browser.permissions.getAll();
    hasPermissions = permissions.origins.indexOf("<all_urls>") > - 1;
    console.log("Has permissions? " + hasPermissions)
    document.dispatchEvent(new CustomEvent("request-permissions", { detail: {
        permissions: hasPermissions
      }
    }));  
}

window.onload = async (e) => {
    await checkPermissions();
    document.getElementById("root").addEventListener('click', event => {
        if (!hasPermissions){
            console.log("Does not have Permissions")
            browser.permissions.request({origins: ['<all_urls>']});
        }
        else{
            console.log("Has Permissions")
        }
    });
}
