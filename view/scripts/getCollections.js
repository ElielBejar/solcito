sendReq("/collections/", {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showCollections(data);
});