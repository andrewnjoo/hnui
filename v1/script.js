document.addEventListener("DOMContentLoaded", () => {
  const newsList = document.getElementById("newsList");

  // API URL for Hacker News front page
  const apiUrl = "https://hn.algolia.com/api/v1/search?tags=front_page";

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Loop through each hit and create HTML content
      data.hits.forEach((hit) => {
        const { title, url, points, num_comments } = hit;

        const listItem = document.createElement("a");
        listItem.href = url;
        listItem.className = "list-group-item list-group-item-action";

        // Determine color based on points
        let colorClass = "";
        if (points < 50) {
          colorClass = "text-muted"; // Grey color for < 50 points
        } else if (points >= 50 && points < 100) {
          colorClass = "text-warning"; // Orange color for 50 to < 100 points
        } else {
          colorClass = "text-danger"; // Red color for >= 100 points
        }

        listItem.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${title}</h5>
                        <small class="${colorClass}">${points}</small>
                    </div>
                    <small>${num_comments} comments</small>
                `;

        newsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
