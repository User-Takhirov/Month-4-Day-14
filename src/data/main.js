import { tabName, getTabContent, SingleData } from "./service.js";

let Default = JSON.parse(localStorage.getItem("MealList")) || [];

const TabNames = document.querySelector(".Tab");
const foodList = document.querySelector(".food_list");
const btns = document.getElementsByClassName("btns");
const Drawer = document.querySelector(".Drawer");
const addBtn = document.querySelectorAll(".addBtn");
const DrawerItems = document.querySelector(".Drawer_items");
const renderTabContent = async (name) => {
  const data = await tabName(name);
  TabNames.innerHTML = data
    .map(
      (item) =>
        `<button  data-path="${item.path}" class=" btns text-white font-[600] text-[16px] leading-[140%] ">${item.name}</button>`
    )
    .join("");
  btns[0].style.color = "#EA7C69";
  btns[0].style.borderBottom = "2px solid #EA7C69";
  TabContent(data[0].path);
};
renderTabContent();

// local storage

//

const LocalInterface = () => {
  const data = JSON.parse(localStorage.getItem("MealList")) || [];
  DrawerItems.innerHTML = data?.map(
    (item) => `
    <div class="flex items-center justify-between border-[2px] border-red-600 ">
    <img class="w-[50px] h-[50px]" src="${item.img}" alt="#" />
    <p class="text-white text-[14px] w-[200px]">${item.title}</p>
    <p class="text-white">${item.price}$</p>
    <button data-del="${item.id}" class=" deleteBtn text-white py-[10px] px-[10px] bg-red-500 rounded-[10px]" data-delpath="${item.path}">Delete</button>
    </div>`
  );
};
LocalInterface();

const deleteCart = async (id) => {
  for (let i = 0; i < Default.length; i++) {
    if (Default[i].id == id) {
      Default.splice(0, 1);
      break;
    }
  }
  localStorage.setItem("MealList", JSON.stringify(Default));
  LocalInterface();
};

DrawerItems.addEventListener("click", (e) => {
  const id = e.target.dataset.del;
  if (id) {
    deleteCart(id);
  }
});

const saveLocal = (data) => {
  const olddataMeal = JSON.parse(localStorage.getItem("MealList"));
  localStorage.setItem(
    "MealList",
    JSON.stringify([data, ...(olddataMeal || [])])
  );
  LocalInterface();
};

const TabContent = async (path) => {
  const data = await getTabContent(path);
  foodList.innerHTML = data
    ?.map(
      (
        item
      ) => `<li class="w-[300px] bg-[#1F1D2B] rounded-[20px] px-[24px] py-[24px]">
      <img class="mb-[16px] rounded-[10px] w-[252px] h-[252px]" src="${item.img}" alt="#" />
      <h2 class="font-[700] leading-[130%] text-[20px] text-center text-white mb-[10px]">${item.title}</h2>
      <p class="font-[500] text-[20px] mb-[10px] text-center text-white ">${item.price} $</p>
      <p class="font-[500] text-[20px] text-center text-[#ABBBC2] leading-[140%] mb-[10px]">${item.text}</p>
     <div class="text-center">
     <button class=" addBtn py-[10px] px-[25px] text-white rounded-[10px] text-[15px] font-[500] bg-[#48ff00] text-center" data-path="${path}" data-add="${item.id}">Add</button>
     </div>
      </li>`
    )
    .join("");
};

foodList.addEventListener("click", async (e) => {
  const dataID = e.target.dataset.add;
  const path = e.target.dataset.path;
  const dat = await SingleData(path, dataID);
  saveLocal(dat);
});

TabNames.addEventListener("click", (e) => {
  if (e.target.dataset.path) {
    TabContent(e.target.dataset.path);
    for (let i of btns) {
      i.style.color = "";
      i.style.borderBottom = "";
    }
    e.target.style.color = "#EA7C69";
    e.target.style.borderBottom = "2px solid #EA7C69";
  }
});

//
