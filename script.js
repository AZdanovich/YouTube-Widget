const API_KEY = "AIzaSyCsmRcLOY5ScMrKLlqGA__JwDeKzcx9br0";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const videoPlayer = document.getElementById("video-player");
const thumbnailsContainer = document.getElementById("thumbnails");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value;
  fetchVideos(query);
});

async function fetchVideos(query) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&type=video`
  );
  const data = await response.json();

  if (data.items.length) {
    displayVideo(data.items[0]);
    displayThumbnails(data.items);
  } else {
    videoPlayer.innerHTML = "Видео не найдено.";
    thumbnailsContainer.innerHTML = "";
  }
}

function displayVideo(video) {
  const videoId = video.id.videoId;
  videoPlayer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

function displayThumbnails(videos) {
  thumbnailsContainer.innerHTML = "";
  videos.forEach((video) => {
    const thumbnailElement = document.createElement("div");
    thumbnailElement.className = "thumbnail";
    thumbnailElement.innerHTML = `<img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">`;
    thumbnailElement.addEventListener("click", () => {
      displayVideo(video);
    });
    thumbnailsContainer.appendChild(thumbnailElement);
  });
}
