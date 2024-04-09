// search.js
// pulls the archive of the blog and filters it based on the query
// displays everything in the body of the page you're on
// is likely to be a nightmare

let archiveResults = {};

function runSearch(q) {
	var results_node = document.getElementById("list_results");
	results_node.innerHTML = "";
	if (q.length > 0) {
		for (var i = 0; i < archiveResults.items.length; i++) {
			var item = archiveResults.items[i];
			var title_lower = item.title.toLowerCase();
			var text_lower = item.content_text.toLowerCase();
			if (title_lower.includes(q) || text_lower.includes(q)) {
				var p_node = document.createElement("p");        
				var link_node = document.createElement("a");
				var d = Date.parse(item.date_published);
				var date_s = new Date(d).toISOString().substr(0, 10);
				var date_node = document.createTextNode(date_s); 
				link_node.appendChild(date_node);
				link_node.href = item.url;
              	var title_node = null;
				if (item.title.length > 0) {
              		title_node = document.createElement("span");
                  	title_node.innerHTML = ": <b>" + item.title + "</b>"
					s = item.title + ": " + item.content_text;
				}
				var s = item.content_text;
				if (s.length > 200) {
					s = s.substr(0, 200) + "...";
				}
              	var text_node = document.createElement("span");
             	text_node.innerHTML = ": " + s
				p_node.appendChild(link_node);
              	if (title_node != null) {
					p_node.appendChild(title_node);
              }
				p_node.appendChild(text_node);
				results_node.appendChild(p_node);
			}
		}
	} 
}

function submitSearch(q) {
	runSearch(q);
	
	const url = new URL(window.location.href);
	url.searchParams.set("q", q);
	history.pushState({}, "", url);
}

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