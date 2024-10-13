// Create LaodCategoris
const loadCategories = () => {
  //  fetch the data
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadDisplay(data.categories))
    .catch((error) => console.log(error));
};
const loadVideos = (searchText = " ") => {
  //  fetch the data
  fetch(
    ` https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
const loadCategoryVideos = (id) => {
  fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // Sobaike active class remove kore dao
      removeActiveClass();
      // id er class ke active korao
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetail(data.video);
};
const displayDetail = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
  <img src=${video.thumbnail} />
  <p> ${video.description} </p>
  `;
  // way 1
  // document.getElementById("showModalData").click();

  // Way 2
  document.getElementById("customModal").showModal();
};
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = " ";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class=" flex flex-col gap-5 justify-center items-center min-h-[250px]">
    <img src="assets/Icon.png"/>
    <h1 class="font-black text-center text-3xl"> Oops!! Sorry, There Is No </br> Content Here </H1>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card ";
    card.innerHTML = `
    <figure class="h-[170px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
     ${
       video.others.posted_date?.length === 0
         ? " "
         : ` <span class=" p-1 right-2 bottom-2 bg-black text-white rounded absolute text-xs"> ${setTimeString(
             video.others.posted_date
           )}  </span>`
     }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-8 h-8 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    } />
    </div>

    <div>
    <h2 class="font-semibold">${video.title} </h2>
    <div class="flex items-center gap-2"> 
    <p class= "text-sm text-gray-400">${video.authors[0].profile_name} </p>
    ${
      video.authors[0].verified === true
        ? ` <img class="w-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>`
        : " "
    }
    </div>
    <p> <button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm btn-error">Details</button> </P>
    </div>

  </div>
    `;
    videoContainer.append(card);
  });
};

// Create Display Categories
const loadDisplay = (categories) => {
  // add data in html
  const catogeryContainer = document.getElementById("allCategory");
  categories.forEach((item) => {
    console.log(item);
    const buuttonContainer = document.createElement("div");
    buuttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn"> ${item.category}
    </button>
    `;

    catogeryContainer.append(buuttonContainer);
  });
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  loadVideos(event.target.value);
});

// Video Time
function setTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} Hour ${minute} minutes ${remainingSecond} second ago`;
}

loadCategories();
loadVideos();
