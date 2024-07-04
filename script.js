let itemCount = 0;
let selectedSize = "";
let selectedColor = "";
let colorBoxIcons = [];
const countDisplay = document.querySelector("#item_count");
const productTitle = document.querySelector("#product_title");
const productVendor = document.querySelector("#product_vendor");
const decrementBtn = document.querySelector("#decrement_btn");
const incrementBtn = document.querySelector("#increment_btn");
const addCartBtn = document.querySelector(".btn_add_cart");
const selectedImg = document.querySelector(".profile_bg_img");
const percentageWrap = document.querySelector(".offer_persent");
const actualPrice = document.querySelector("#actual_price .actual-number");
const comparePrice = document.querySelector("#compare_price .compare-number");
const downPhotos = document.querySelectorAll(
  ".down_photo .down_image_photo_in"
);
const downPhotosWrapper = document.querySelectorAll(
  ".down_photo .small-img-wrapper"
);
const colorBoxes = document.querySelectorAll(
  "#color_variant_container .inside-color-box"
);
const colorBoxesIcon = document.querySelectorAll(
  "#color_variant_container .inside-color-box"
);
const parentColorBoxes = document.querySelectorAll(
  "#color_variant_container .color-box"
);
const sizeSelectors = document
  .querySelector(".input_size_selectors_parent")
  .querySelectorAll("input[name=size_selector]");

const percentageCal = () => {
  const actual = Number(actualPrice.textContent);
  const compare = Number(comparePrice.textContent);
  if (Number.isInteger(actual) && Number.isInteger(compare)) {
    const percentage = ((compare - actual) / compare) * 100;
    return percentage.toFixed(0);
  }
};

percentageWrap.textContent = `${percentageCal()}% Off`;
downPhotos.forEach((item) => {
  item.addEventListener("click", () => handleSelectImg(item));
});
colorBoxes.forEach((item) => {
  item.addEventListener("click", () => handleSelectBox(item));
  colorBoxIcons.push(item.querySelector("i"));
});
sizeSelectors.forEach((item) => {
  item.addEventListener("click", () => handleSelectSize(item));
});
incrementBtn.addEventListener("click", () => handleCount(true));
decrementBtn.addEventListener("click", () => handleCount(false));
addCartBtn.addEventListener("click", () => displayAlert());

const handleSelectSize = (item) => {
  try {
    item.checked = true;
    selectedSize = item.value;
  } catch (err) {
    console.log(err);
  }
};

const handleSelectBox = (item) => {
  try {
    const wrapper = item.parentNode;
    if (
      !wrapper.classList.value.split(" ").includes(wrapper.dataset?.colorbox)
    ) {
      parentColorBoxes.forEach((item) => {
        item.classList.remove(item.dataset?.colorbox);
      });
      colorBoxIcons.forEach((item) => {
        item.style.display = "none";
      });
      wrapper.classList.add(wrapper.dataset?.colorbox);
      item.querySelector("i").style.display = "";
      selectedColor = wrapper.dataset.value;
    }
  } catch (err) {
    console.log(err);
  }
};

const handleSelectImg = (item) => {
  try {
    const wrapper = item.parentNode;
    if (!wrapper.classList.value.split(" ").includes("selected-sml-img-wrap")) {
      downPhotosWrapper.forEach((item) => {
        item.classList.remove("selected-sml-img-wrap");
      });
      selectedImg.src = item.src;
      wrapper.classList.add("selected-sml-img-wrap");
    }
  } catch (err) {
    console.log(err);
  }
};

const handleCount = (increment) => {
  if ((itemCount >= 0 && increment) || itemCount > 0) {
    increment ? itemCount++ : itemCount--;
    countDisplay.textContent = itemCount;
  }
};
const displayAlert = () => {
  alert(
    `
    Product vendor = ${productVendor.textContent}
    Product name = ${productTitle.textContent}
    Product price = $${actualPrice.textContent}
    Color = ${selectedColor ? selectedColor : "Not selected"}
    Size = ${selectedSize ? selectedSize : "Not selected"}
    Number of items in bag = ${itemCount}
    `
  );
};
