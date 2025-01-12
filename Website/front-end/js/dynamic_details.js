// dynamic_details.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('value');
    if (value) {
        fetchData(value);
    } else {
        document.getElementById('content').innerText = 'No value provided in the URL.';
    }
});