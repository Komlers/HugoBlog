// Simple client-side search using Hugo's index.json
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    if (!input) return;

    const resultsEl = document.getElementById('search-results');
    const loadingEl = document.getElementById('search-loading');
    const emptyEl = document.getElementById('search-empty');

    let index = null;

    // Load the JSON index once from the site root.
    const indexURL = '/index.json';
    fetch(indexURL)
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(data => {
            index = data;
            loadingEl.style.display = 'none';
            input.disabled = false;
            input.placeholder = '输入关键词搜索…';
        })
        .catch(() => {
            loadingEl.textContent = '索引加载失败，请刷新页面重试';
        });

    function doSearch() {
        const q = input.value.trim().toLowerCase();
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

    // Live search on input, and also on button click / Enter key.
    input.addEventListener('input', doSearch);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') doSearch();
    });

    const btn = document.getElementById('search-btn');
    if (btn) btn.addEventListener('click', doSearch);
});
