// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('urlin').value;
  chrome.storage.sync.set({
    pageUrl: url,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value
  chrome.storage.sync.get({
    pageUrl: 'https://ps.psharvard.org',
  }, function(items) {
    document.getElementById('url').value = items.pageUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);