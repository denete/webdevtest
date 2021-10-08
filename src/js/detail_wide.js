function buildDetailViewLarge(promo) {
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

  let promo_name_lbl = document.createElement("div");
  promo_name_lbl.id = "pn_label";
  promo_name_lbl.classList.add("promo-name");
  promo_name_lbl.innerText = promo.promotion_name;

  main_container.appendChild(promo_name_lbl);

  let summary = document.createElement("div");
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

    //trim out string after cash amount
    let tmpstr = promo.drawings[i].prize;
    let index = tmpstr.indexOf(" ");
    rcell0.innerText = tmpstr.slice(0, index);

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
