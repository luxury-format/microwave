// search.js
// from https://github.com/microdotblog/plugin-search-page
// amended for use with Microwave theme
// MIT License

// Copyright (c) 2020 Micro.blog

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

let archiveResults = {};

function runSearch(q) {
    var results_parent = document.getElementById("parent_results");
    var results_node = document.getElementById("list_results");
    results_node.innerHTML = "";
    if (q.length > 0) {
        var count = 0; 
        for (var i = 0; i < archiveResults.items.length; i++) {
            var item = archiveResults.items[i];
            var title_lower = item.title.toLowerCase();
            var text_lower = item.content_text.toLowerCase();
            if (title_lower.includes(q) || text_lower.includes(q)) {
                var link_node = document.createElement("a");
                link_node.className = "list-group-item list-group-item-action";
                link_node.href = item.url;
                
                var date_s = new Date(Date.parse(item.date_published)).toISOString().substr(0, 10);
                var title = item.title.length > 0 ? item.title : "Untitled";
                var content = item.content_text.length > 200 ? item.content_text.substr(0, 200) + "..." : item.content_text;
                
                link_node.innerHTML = date_s + ": <b>" + title + "</b> - " + content;
                
                results_node.appendChild(link_node);
                
                count++; 
                
                // Break out of the loop if the desired number of results (5) is reached
                if (count >= 5) {
                    break;
                }
            }
        }
        results_parent.style.display = "block";
    } 
}

function submitSearch(q) {
	runSearch(q);
	
	const url = new URL(window.location.href);
	url.searchParams.set("q", q);
	history.pushState({}, "", url);
}

function clearQuery() {
    // Remove the query parameter 'q' from the URL
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('q');
    var newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, document.title, newUrl);
}

document.body.addEventListener('click', function(event) {
    var inputSearch = document.getElementById('input_search');
    var searchResults = document.getElementById('parent_results');
    if (!searchResults.contains(event.target)) {
        searchResults.style.display = 'none';
        inputSearch.value = '';
        clearQuery()
    }
});

document.body.addEventListener('keydown', function(event) {
    var inputSearch = document.getElementById('input_search');
    var searchResults = document.getElementById('parent_results');
    if (event.key === 'Escape') {
        searchResults.style.display = 'none';
        inputSearch.value = '';
        clearQuery()
    }
});

document.addEventListener("DOMContentLoaded", function() {
	fetch("/archive/index.json").then(response => response.json()).then(data => {
		archiveResults = data;

		const url = window.location.href;
		const params = new URLSearchParams(new URL(url).search);
		const q = params.get("q");
		if (q && (q.length > 0)) {
			document.getElementById("input_search").value = q;
			runSearch(q);
		}	
	});
});