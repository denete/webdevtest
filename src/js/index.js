var mock_server_data = mock_data; //set the supplied mock data to a local variable
var queryString = window.location.search;
var url = new URLSearchParams(queryString);

var body = document.body;
var page_div = document.createElement("div");
page_div.id = "page_div";
page_div.classList.add("page-div");

function createUIContent() {
  let promos = mock_server_data.promotion_objects;

  let promo_id = url.get("promo");

  if (promo_id) {
    showPromotionDetail(promos, promo_id);
  } else {
    buildListView(promos);
  }
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

//remove the "Cash Prize" portion of the string
function removeSubString(str) {
  for (let i = 0; i < this.selected_promo.drawings.length; i++) {
    let tmpstr = this.selected_promo.drawings[i].prize;
    let index = tmpstr.indexOf(" ");
    this.selected_promo.drawings[i].prize = tmpstr.slice(0, index);
  }
}

//launch point
createUIContent();
