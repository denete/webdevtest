var mock_server_data = mock_data; //set the supplied mock data to a local variable
var queryString = window.location.search;
var url = new URLSearchParams(queryString);

function createUIContent() {
  console.log("createUIContent()");

  let promo_id = url.get("promo");

  buildListView();
  buildDetailViewLarge();
  buildDetailViewSmall();

  if (promo_id) {
    showPromotionDetail(promo_id);
  }
}

function buildListView() {
  console.log("buildListView()");

  let body = document.body;

  let page_div = document.createElement("div");
  page_div.id = "page_div";
  page_div.classList.add("page-div");

  let main_container = document.createElement("div");
  main_container.id = "main_container";
  main_container.classList.add("main-container");

  let list_div = document.createElement("div");
  list_div.id = "list_div";
  list_div.classList.add("main-list-div");

  let promos = mock_server_data.promotion_objects;

  //build list with table here and append to list_div
  for (let i = 0; i < promos.length; i++) {
    promos[i].promo_id = "promo0" + (i + 1); //create a promo id in the mock data for use when parsing the query string for promo to display

    let img_div = document.createElement("div");
    img_div.id = "img_div";
    img_div.classList.add("img-div");

    let img = document.createElement("img");
    img.classList.add("img-list");
    img.id = "img_banner";
    img.src = promos[i].promo_image_url;

    img_div.appendChild(img);

    list_div.appendChild(img_div);

    let promotion_div = document.createElement("div");
    promotion_div.id = "promotion_div";
    promotion_div.classList.add("promotion-div");

    let promo_label = document.createElement("label");
    promo_label.innerText = promos[i].promotion_name;
    promo_label.classList.add("promotion-link");
    promo_label.addEventListener("click", function () {
      showPromotionDetail(promos[i].promo_id);
    });

    let summary = document.createElement("p");
    summary.id = "summary";
    summary.classList.add("promo-drawing-text");
    summary.innerText = promos[i].summary;

    let next_draw_date = document.createElement("p");
    next_draw_date.id = "next_draw_date";
    next_draw_date.classList.add("promo-drawing-text");
    next_draw_date.innerText =
      "Next Drawing Date: " + getNextDrawDate(promos[i].drawings);

    promotion_div.appendChild(promo_label);
    promotion_div.appendChild(summary);
    promotion_div.appendChild(next_draw_date);

    list_div.appendChild(promotion_div);
  }

  main_container.appendChild(list_div);
  page_div.appendChild(main_container);
  body.appendChild(page_div);
}

function buildDetailViewLarge() {
  console.log("buildDetailViewLarge()");
}

function buildDetailViewSmall() {
  console.log("buildDetailViewSmall()");
}

function showPromotionDetail(promo_id) {
  console.log("showPromotionDetail() promo_id = " + promo_id);
  Response.redirect("index.html?promo=" + promo_id);
}

//all of the draw dates are in the past, so i'll assume i'm in the past before any of the draw dates
function getNextDrawDate(drawings) {
  //since 'next_draw_date' is not an explicit property of the promo object,
  //we sort the drawings array and grab the 0-index drawing_date and assign that
  //to a newly injected property ('next_draw_date') in the promo object to put it in the HTML

  drawings.sort(sortByDrawDate);

  return new Date(drawings[0].drawing_date).toLocaleString();
}

//the sort function to sort drawings by drawing_date
function sortByDrawDate(draw_a, draw_b) {
  let date_1 = new Date(draw_a.drawing_date);
  let date_2 = new Date(draw_b.drawing_date);

  if (date_1 < date_2) {
    return -1;
  }
  if (date_1 > date_2) {
    return 1;
  }
  return 0;
}

//REMOVE IF NOT NEEDED
function onWindowLoad() {
  console.log("onWindowLoad()");
}

createUIContent();
