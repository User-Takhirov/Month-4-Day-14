import { tabName, getTabContent } from "./service.js";

const TabNames = document.querySelector(".Tab");
const foodList = document.querySelector(".food_list");
const btns = document.getElementsByClassName("btns");

const renderTabContent = async (name) => {
  const data = await tabName(name);
  TabNames.innerHTML = data
    .map(
      (item) =>
        `<button  data-path="${item.path}" class=" btns text-white font-[600] text-[16px] leading-[140%] ">${item.name}</button>`
    )
    .join("");
};
renderTabContent();

const TabContent = async (path) => {
  const data = await getTabContent(path);
  foodList.innerHTML = data
    ?.map(
      (item) => `<li class="w-[300px] bg-[#1F1D2B] rounded-[20px] px-[24px] py-[24px]">
      <img class="mb-[16px] rounded-[10px] w-[252px] h-[252px]" src="${item.img}" alt="#" />
      <h2 class="font-[700] leading-[130%] text-[20px] text-center text-white mb-[10px]">${item.title}</h2>
      <p class="font-[500] text-[20px] mb-[10px] text-center text-white ">${item.price} $</p>
      <p class="font-[500] text-[20px] text-center text-[#ABBBC2] leading-[140%]">${item.text}</p>
      </li>`
    )
    .join("");
};

TabNames.addEventListener("click", (e) => {
  if (e.target.dataset.path) {
    TabContent(e.target.dataset.path);
    for (let i of btns) {
      i.style.color = "";
    }
    e.target.style.color = "red";
  }
});

//
