import { tabName, getTabContent } from "./service.js";

const TabNames = document.querySelector(".Tab");
const foodList = document.querySelector(".food_list");
const btns = document.getElementsByClassName("btns");
const Drawer = document.querySelector(".Drawer");
const DrawerBlock = document.querySelector(".Drawer_block");

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
const saveLocal = (data) => {
  const olddataMeal = JSON.parse(localStorage.getItem("MealList"));
  localStorage.setItem(
    "MealList",
    JSON.stringify([data, ...(olddataMeal || [])])
  );
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
     <button class=" addBtn py-[10px] px-[25px] text-white rounded-[10px] text-[15px] font-[500] bg-[#48ff00] text-center" data-add="${item.id}">Add</button>
     </div>
      </li>`
    )
    .join("");
};
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
