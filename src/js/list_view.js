function buildListView(promos) {
  console.log("buildListView()");

  let main_container = document.createElement("div");
  main_container.id = "main_container_list";
  main_container.classList.add("main-container");

  let list_div = document.createElement("div");
  list_div.id = "list_div";
  list_div.classList.add("main-list-div");

  //build list with table here and append to list_div
  for (let i = 0; i < promos.length; i++) {
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

    promos[i].promo_id = "promo0" + (i + 1); //create a promo id in the mock data for use when parsing the query string for promo to display

    let promo_label = document.createElement("label");
    promo_label.innerText = promos[i].promotion_name;
    promo_label.classList.add("promotion-link");
    promo_label.addEventListener("click", function () {
      showPromotionDetail(promos, promos[i].promo_id);
    });

    let summary = document.createElement("p");
    summary.id = "summary";
    summary.classList.add("promo-drawing-text");
    summary.innerText = promos[i].summary;

    let next_draw_date = document.createElement("p");
    next_draw_date.id = "next_draw_date";
    next_draw_date.classList.add("promo-drawing-text");
    next_draw_date.innerText =
      "Next Drawing Date: " +
      dateFormat(getNextDrawDate(promos[i].drawings), "dddd, mmmm dS, yyyy");

    promotion_div.appendChild(promo_label);
    promotion_div.appendChild(summary);
    promotion_div.appendChild(next_draw_date);

    list_div.appendChild(promotion_div);
  }

  main_container.appendChild(list_div);
  page_div.appendChild(main_container);
  body.appendChild(page_div);
}
