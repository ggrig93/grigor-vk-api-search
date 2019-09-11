const config = {
  searchURL: "https://api.vk.com/method/users.search?",
  access_token:
    "726b7c1bcded7707be980692bb5b3463a7ca2b57cd6ffda710e664f0414d82665e5dee454ebf8c67f0b2a",
  count: 1000,
  version: "5.52"
};

function Vk({ response }) {
  // getting items from response , add li element in ul element ,
  document.querySelector(".lds-dual-ring").style.display = "none"; // hiding loader
  const searchBox = document.querySelector(".search-box");
  searchBox.classList.add("search-box_to-top");
  // searchBox.style.position = "fixed";
  // searchBox.style.top = "5%";
  // searchBox.style.transition = "0.3s";

  let usersList = document.querySelector(".users-list");
  document.querySelector(".total-count").innerText = `Всего: ${response.count}`;
  response.items.map((user, index) => {
    let LI = document.createElement("li");
    LI.classList.add("users-list_item");
    let html1 = `<img 
                  data-lazy="${user.photo_big}"
                  alt="hello"
                />
                <div class="image-overlay"></div>
                <div class="user-details">
                  <h1>${user.first_name} ${user.last_name}</h1>    
                  <a href="https://vk.com/id${user.id}">
                    <i class="fab fa-vk"></i
                  ></a>
                </div>
                  `;
    LI.innerHTML = html1.trim();
    usersList.appendChild(LI);
  });
  const targets = document.querySelectorAll("img"); // get all images after rendering the list
  targets.forEach(lazyLoad); // added lazy loading to images
}

function lazyLoad(target) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-lazy");
        img.setAttribute("src", src);
        img.classList.add("lazy-load");
        observer.disconnect();
      }
    });
  });
  io.observe(target);
}

function onSumbitHandler(event) {
  event.preventDefault();
  const { searchURL, access_token, count, version } = config;
  const minYear = 1999;
  const maxYear = 1979;
  let dayInput = document.getElementsByName("day")[0];
  let monthInput = document.getElementsByName("month")[0];
  let yearInput = document.getElementsByName("year")[0];

  //validating date
  let today = new Date();
  var birthDate = new Date(
    `${yearInput.value}/${monthInput.value}/${dayInput.value}`
  );
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= 20 && age <= 40) {
    // adds the vk api like cdn , because in case of fetching have a CORS error
    let script = document.createElement("SCRIPT");
    script.src = `${searchURL}count=${count}&v=${version}&fields=photo_big&age_from=${age}&age_to=${age}&access_token=${access_token}&callback=Vk`;
    document.getElementsByTagName("head")[0].appendChild(script);
    document.querySelector(".lds-dual-ring").style.display = "inline-block"; // show loader
    document.querySelector(".total-count").innerText = "";
    document.querySelector(".users-list").innerHTML = ""; // clear dom before getting new response
  }
}
