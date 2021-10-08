function buildDetailViewSmall(promo) {
  let main_container = document.createElement("div");
  main_container.id = "main_container_details_sm";
  main_container.classList.add("main-container-details");

  let next_deadline_div = document.createElement("div");
  next_deadline_div.id = "next_deadline_div";
  next_deadline_div.classList.add("entry-deadline-text");
  next_deadline_div.innerText = "The Next Entry Deadline is";

  main_container.appendChild(next_deadline_div);

  let next_deadline_div2 = document.createElement("div");
  next_deadline_div2.id = "next_deadline_div";
  next_deadline_div2.classList.add("entry-deadline-text");
  next_deadline_div2.innerText =
    dateFormat(promo.entry_deadline, "dddd, mmmm dS, yyyy") + "!";

  main_container.appendChild(next_deadline_div2);

  let img_div = document.createElement("div");
  img_div.id = "img_div_sm";
  img_div.classList.add("img-div-detail");

  let img = document.createElement("img");
  img.classList.add("img-detail");
  img.id = "img_banner_detail_sm";
  img.src = promo.promo_image_url;

  img_div.appendChild(img);

  let summary = document.createElement("p");
  summary.id = "summary_sm";
  summary.classList.add("promo-summary-detail-text");
  summary.innerText = promo.summary;

  img_div.appendChild(summary);
  main_container.appendChild(img_div);

  let details_div = document.createElement("div");
  details_div.id = "details_div_sm";
  details_div.classList.add("details-div");

  let draw_schedule = document.createElement("div");
  draw_schedule.id = "draw_schedule";
  draw_schedule.classList.add("drawing-schedule-div");
  draw_schedule.innerText = "Drawing Schedule";

  details_div.appendChild(draw_schedule);

  main_container.appendChild(details_div);

  //////DRAWING SCHEDULE TABLE//////////
  let table_div = document.createElement("div");
  table_div.id = "table_div";
  table_div.classList.add("table-div");

  let rows_div = document.createElement("div");
  rows_div.classList.add("detail-rows-container");

  for (let i = 0; i < promo.drawings.length; i++) {
    //ROW 1
    let row_div0 = document.createElement("div");
    row_div0.classList.add("detail-row-div");

    let rcell00 = document.createElement("div");
    rcell00.classList.add("detail-header-col1");
    rcell00.innerText = "PRIZE";

    let rcell01 = document.createElement("div");
    rcell01.classList.add("detail-row1");
    //trim out string after cash amount
    let tmpstr = promo.drawings[i].prize;
    let index = tmpstr.indexOf(" ");
    rcell01.innerText = tmpstr.slice(0, index);

    row_div0.appendChild(rcell00);
    row_div0.appendChild(rcell01);
    rows_div.appendChild(row_div0);

    //ROW 2
    let row_div1 = document.createElement("div");
    row_div1.classList.add("detail-row-div");

    let rcell10 = document.createElement("div");
    rcell10.classList.add("detail-header-col1");
    rcell10.innerText = "ENTRY DEADLINE";

    let rcell11 = document.createElement("div");
    rcell11.classList.add("detail-row1");
    rcell11.innerText = dateFormat(
      promo.drawings[i].entry_deadline,
      "dddd, mmmm dS, yyyy"
    );

    row_div1.appendChild(rcell10);
    row_div1.appendChild(rcell11);
    rows_div.appendChild(row_div1);

    //ROW 3
    let row_div2 = document.createElement("div");
    row_div2.classList.add("detail-row-div");

    let rcell20 = document.createElement("div");
    rcell20.classList.add("detail-header-col2");
    rcell20.innerText = "DRAWING DATE";

    let rcell21 = document.createElement("div");
    rcell21.classList.add("detail-row2");
    rcell21.innerText = dateFormat(
      promo.drawings[i].drawing_date,
      "dddd, mmmm dS, yyyy"
    );

    row_div2.appendChild(rcell20);
    row_div2.appendChild(rcell21);
    rows_div.appendChild(row_div2);

    table_div.appendChild(rows_div);
  }
  /////END DRAWING SCHEDULE TABLE//////

  let entry_info_div = document.createElement("div");
  entry_info_div.id = "entry_info_div";
  entry_info_div.classList.add("body-text");

  let entry_info_lbl = document.createElement("label");
  entry_info_lbl.id = "pn_label";
  entry_info_lbl.classList.add("body-text");
  entry_info_lbl.innerText = promo.entry_info;

  entry_info_div.appendChild(entry_info_lbl);
  table_div.appendChild(entry_info_div);

  let num_entries_div = document.createElement("div");
  num_entries_div.id = "entry_info_div";
  num_entries_div.classList.add("drawing-schedule-div");
  num_entries_div.innerText =
    "Your Total Tickets Entered: " + promo.entries.length;

  table_div.appendChild(num_entries_div);

  let locked_notice_div = document.createElement("div");
  locked_notice_div.id = "entry_info_div";
  locked_notice_div.classList.add("body-text-locked-notice");
  locked_notice_div.innerText =
    "All entries are locked in at the time they are submitted and cannot be deleted.";

  table_div.appendChild(locked_notice_div);

  let rows_div2 = document.createElement("div");
  rows_div2.classList.add("detail-rows-container");

  /////ENTRIES TABLE//////////////////////
  for (let i = 0; i < promo.entries.length; i++) {
    //ROW 1
    let row_div0 = document.createElement("div");
    row_div0.classList.add("detail-row-div");

    let rcell00 = document.createElement("div");
    rcell00.classList.add("detail-header-col1");
    rcell00.innerText = "ENTRY NUMBER";

    let rcell01 = document.createElement("div");
    rcell01.classList.add("detail-row1");
    rcell01.innerText = promo.entries[i].entry_number;

    row_div0.appendChild(rcell00);
    row_div0.appendChild(rcell01);
    rows_div2.appendChild(row_div0);

    //ROW 2
    let row_div1 = document.createElement("div");
    row_div1.classList.add("detail-row-div");

    let rcell10 = document.createElement("div");
    rcell10.classList.add("detail-header-col2");
    rcell10.innerText = "DATE";

    let rcell11 = document.createElement("div");
    rcell11.classList.add("detail-row2");
    rcell11.innerText = dateFormat(
      promo.entries[i].date,
      "dddd, mmmm dS, yyyy"
    );

    row_div1.appendChild(rcell10);
    row_div1.appendChild(rcell11);
    rows_div2.appendChild(row_div1);

    table_div.appendChild(rows_div2);
  }
  /////END ENTRIES TABLE//////

  details_div.appendChild(table_div);
  main_container.appendChild(details_div);

  page_div.appendChild(main_container);
  body.appendChild(page_div);
}
