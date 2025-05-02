const accessKey = "gPkeVExVgq-pHU--HJn62uIe4rjmBGzvXOxhKP4U2lA";

const Form = document.getElementById("form");
const SearchBox = document.getElementById("SearchBox");
const SearchResBtn = document.getElementById("search-res-btn");
const ShowMore = document.getElementById("showmore");

let keyword = "";
let page = 1;

async function SearchImage() {
  keyword = SearchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    
    const data = await response.json();
    const results = data.results;

    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);
      SearchResBtn.appendChild(imageLink);
    });
    ShowMore.style.display="block";
  } catch (error) {
    console.error("Error:", error);
    SearchResBtn.innerHTML = "An error occurred while fetching images.";
  }
}

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  SearchResBtn.innerHTML = ""; // Clear previous results
  SearchImage();
});

ShowMore.addEventListener("click", () => {
  page++;
  SearchImage();
});
