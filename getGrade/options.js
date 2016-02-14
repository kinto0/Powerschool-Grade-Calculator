// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('url_in').value;
  //will make this change page for content scripts hopefully eventually
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  document.getElementById('url_in').value = "https://ps.psharvard.org";
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);