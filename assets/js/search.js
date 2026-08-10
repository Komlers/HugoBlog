// Simple client-side search using Hugo's index.json
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    if (!input) return;

    const resultsEl = document.getElementById('search-results');
    const loadingEl = document.getElementById('search-loading');
    const emptyEl = document.getElementById('search-empty');

    let index = null;
    const baseURL = document.querySelector('meta[property="og:url"]')?.content || window.location.origin;

    // Load the JSON index once
    const indexURL = baseURL + '/index.json';
    fetch(indexURL)
        .then(r => r.json())
        .then(data => {
            index = data;
            loadingEl.style.display = 'none';
            input.disabled = false;
            input.placeholder = '输入关键词搜索…';
        })
        .catch(() => {
            loadingEl.textContent = '索引加载失败';
        });

    function doSearch(query) {
        const q = query.trim().toLowerCase();
        resultsEl.innerHTML = '';
        if (!q || !index) {
            emptyEl.style.display = 'none';
            return;
        }

        const matches = index.filter(item => {
            const haystack = (item.title + ' ' + item.content).toLowerCase();
            return q.split(/\s+/).every(term => haystack.includes(term));
        });

        if (matches.length === 0) {
            emptyEl.style.display = 'block';
            return;
        }
        emptyEl.style.display = 'none';

        matches.forEach(item => {
            const a = document.createElement('a');
            a.href = item.url;
            a.className = 'search-result';
            const title = document.createElement('div');
            title.className = 'search-result-title';
            title.textContent = item.title;
            const date = document.createElement('span');
            date.className = 'search-result-date';
            date.textContent = item.date;
            a.appendChild(title);
            a.appendChild(date);
            resultsEl.appendChild(a);
        });
    }

    input.addEventListener('input', () => doSearch(input.value));
});
