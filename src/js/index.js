var mock_server_data = mock_data; //set the supplied mock data to a local variable
var queryString = window.location.search;
var url = new URLSearchParams(queryString);

var body = document.body;
var page_div = document.createElement("div");
page_div.id = "page_div";
page_div.classList.add("page-div");

function createUIContent() {
  console.log("createUIContent()");

  let promos = mock_server_data.promotion_objects;

  let promo_id = url.get("promo");

  if (promo_id) {
    showPromotionDetail(promos, promo_id);
  } else {
    buildListView(promos);
  }
}

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

function buildDetailViewLarge(promo) {
  console.log("buildDetailViewLarge() promo = " + JSON.stringify(promo));

  let main_container = document.createElement("div");
  main_container.id = "main_container_details_lg";
  main_container.classList.add("main-container-details");

  let img_div = document.createElement("div");
  img_div.id = "img_div";
  img_div.classList.add("img-div-detail");

  let img = document.createElement("img");
  img.classList.add("img-detail");
  img.id = "img_banner_detail";
  img.src = promo.promo_image_url;

  img_div.appendChild(img);
  main_container.appendChild(img_div);

  let promo_name_lbl = document.createElement("label");
  promo_name_lbl.id = "pn_label";
  promo_name_lbl.classList.add("promo-name");
  promo_name_lbl.innerText = promo.promotion_name;

  main_container.appendChild(promo_name_lbl);

  let summary = document.createElement("p");
  summary.id = "summary";
  summary.classList.add("promo-summary-detail-text");
  summary.innerText = promo.summary;

  main_container.appendChild(summary);

  let details_div = document.createElement("div");
  details_div.id = "details_div";
  details_div.classList.add("details-div");

  let draw_schedule = document.createElement("div");
  draw_schedule.id = "draw_schedule";
  draw_schedule.classList.add("drawing-schedule-div");
  draw_schedule.innerText = "Drawing Schedule";

  details_div.appendChild(draw_schedule);

  let table_div = document.createElement("div");
  table_div.id = "table_div";
  table_div.classList.add("table-div");

  let header_div = document.createElement("div");
  header_div.classList.add("detail-header-div");

  let cell0 = document.createElement("div");
  cell0.classList.add("detail-header-col1");
  let cell1 = document.createElement("div");
  cell1.classList.add("detail-header-col2");
  let cell2 = document.createElement("div");
  cell2.classList.add("detail-header-col2");

  cell0.innerText = "PRIZE";
  cell1.innerText = "ENTRY DEADLINE";
  cell2.innerText = "DRAWING DATE";

  header_div.appendChild(cell0);
  header_div.appendChild(cell1);
  header_div.appendChild(cell2);

  table_div.appendChild(header_div);

  let rows_div = document.createElement("div");
  rows_div.classList.add("detail-rows-container");

  for (let i = 0; i < promo.drawings.length; i++) {
    let row_div = document.createElement("div");
    row_div.classList.add("detail-row-div");

    let rcell0 = document.createElement("div");
    rcell0.classList.add("detail-row1");
    rcell0.innerText = promo.drawings[i].prize;

    let rcell1 = document.createElement("div");
    rcell1.classList.add("detail-row2");

    rcell1.innerText = dateFormat(
      promo.drawings[i].entry_deadline,
      "dddd, mmmm dS, yyyy"
    );

    let rcell2 = document.createElement("div");
    rcell2.classList.add("detail-row2");
    rcell2.innerText = dateFormat(
      promo.drawings[i].drawing_date,
      "dddd, mmmm dS, yyyy"
    );

    row_div.appendChild(rcell0);
    row_div.appendChild(rcell1);
    row_div.appendChild(rcell2);
    rows_div.appendChild(row_div);
    table_div.appendChild(rows_div);
  }

  let entry_info_div = document.createElement("div");
  entry_info_div.id = "entry_info_div";
  entry_info_div.classList.add("body-text");

  let entry_info_lbl = document.createElement("label");
  entry_info_lbl.id = "pn_label";
  entry_info_lbl.classList.add("body-text");
  entry_info_lbl.innerText = promo.entry_info;

  entry_info_div.appendChild(entry_info_lbl);
  table_div.appendChild(entry_info_div);

  details_div.appendChild(table_div);

  let num_entries_div = document.createElement("div");
  num_entries_div.id = "entry_info_div";
  num_entries_div.classList.add("drawing-schedule-div");
  num_entries_div.innerText =
    "Your Total Tickets Entered: " + promo.entries.length;

  details_div.appendChild(num_entries_div);

  let locked_notice_div = document.createElement("div");
  locked_notice_div.id = "entry_info_div";
  locked_notice_div.classList.add("body-text-locked-notice");
  locked_notice_div.innerText =
    "All entries are locked in at the time they are submitted and cannot be deleted.";

  details_div.appendChild(locked_notice_div);

  ///////ENTRIES TABLE////////
  let table_div_2 = document.createElement("div");
  table_div_2.id = "table_div2";
  table_div_2.classList.add("table-div");

  let header_div2 = document.createElement("div");
  header_div2.classList.add("detail-header-div");

  let cell02 = document.createElement("div");
  cell02.classList.add("detail-header-col1");
  let cell12 = document.createElement("div");
  cell12.classList.add("detail-header-col2");

  cell02.innerText = "ENTRY NUMBER";
  cell12.innerText = "DATE";

  header_div2.appendChild(cell02);
  header_div2.appendChild(cell12);

  table_div_2.appendChild(header_div2);

  let rows_div2 = document.createElement("div");
  rows_div2.classList.add("detail-rows-container");

  for (let i = 0; i < promo.entries.length; i++) {
    let row_div = document.createElement("div");
    row_div.classList.add("detail-row-div");

    let rcell0 = document.createElement("div");
    rcell0.classList.add("detail-row1");
    rcell0.innerText = promo.entries[i].entry_number;

    let rcell1 = document.createElement("div");
    rcell1.classList.add("detail-row2");
    rcell1.innerText = dateFormat(promo.entries[i].date, "dddd, mmmm dS, yyyy");

    row_div.appendChild(rcell0);
    row_div.appendChild(rcell1);
    rows_div2.appendChild(row_div);
    table_div_2.appendChild(rows_div2);
  }

  details_div.appendChild(table_div_2);

  main_container.appendChild(details_div);
  //////END ENTRIES TABLE////////

  page_div.appendChild(main_container);
  body.appendChild(page_div);
}

function buildDetailViewSmall(promo) {
  console.log("buildDetailViewSmall()");

  let main_container = document.createElement("div");
  main_container.id = "main_container_details_sm";
  main_container.classList.add("main-container-details");

  let img_div = document.createElement("div");
  img_div.id = "img_div_sm";
  img_div.classList.add("img-div-detail");

  let img = document.createElement("img");
  img.classList.add("img-detail");
  img.id = "img_banner_detail_sm";
  img.src = promo.promo_image_url;

  img_div.appendChild(img);

  let detail_header_div = document.createElement("div");
  detail_header_div.id = "list_div";
  detail_header_div.classList.add("main-list-div");

  main_container.appendChild(img_div);
  page_div.appendChild(main_container);
  body.appendChild(page_div);
}

function showPromotionDetail(promos, promo_id) {
  let promo_index = convertPromoID(promo_id);

  buildDetailViewLarge(promos[promo_index]);
  buildDetailViewSmall(promos[promo_index]);

  let tmp_list_div = document.getElementById("list_div");
  if (tmp_list_div) {
    tmp_list_div.style.display = "none";
  }
}

//the promo parameter in the url query string is alphanumeric eg, 'promo03'
//to simplify the reference to a specific promo, i convert the alphanumeric value
//into a Number() to use as an array index
function convertPromoID(promo_id) {
  let promo_index = "";

  promo_index = promo_id.toString();
  promo_index = promo_index.slice(promo_index.length - 1, promo_index.length);

  return Number(promo_index) - 1;
}

//all of the draw dates are in the past, so i'll assume i'm in the past before any of the draw dates
function getNextDrawDate(drawings) {
  //since 'next_draw_date' is not an explicit property of the promo object,
  //we sort the drawings array and grab the 0-index drawing_date and assign that
  //to a newly injected property ('next_draw_date') in the promo object to put it in the HTML

  let field = "drawing_date";
  drawings.sort(function (field) {
    sortByDate;
  });

  return new Date(drawings[0].drawing_date).toLocaleString();
}

//all of the draw dates are in the past, so i'll assume i'm in the past before any of the draw dates
function getNextEntryDeadline(drawings) {
  //since 'entry_deadline' is not an explicit property of the promo object,
  //we sort the drawings array and grab the 0-index entry_deadline and assign that
  //to a newly injected property ('entry_deadline') in the promo object to put it in the HTML

  let field = "entry_deadline";
  drawings.sort(function (field) {
    sortByDate;
  });

  return new Date(drawings[0].drawing_date).toLocaleString();
}

//the sort function to sort drawings by drawing_date
function sortByDate(draw_a, draw_b) {
  let date_1 = new Date(draw_a[field]);
  let date_2 = new Date(draw_b[field]);

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

//launch point
createUIContent();
