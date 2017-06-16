import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat";

// instead of mixing a single table or divs together based on width
// i decided to just leave them seperate, so they could be css'd seperately
import PromoDrawingLg from "../components/promo_drawing_lg"
import PromoDrawingSm from "../components/promo_drawing_sm"
import PromoEntriesSm from "../components/promo_entries_sm"
import PromoEntriesLg from "../components/promo_entries_lg"

// page for a single promotion
export default class Promo extends React.Component {
  render(){
    const data = require('../../webdevtest-data.json');
    const index = this.props.params.promo_index;
    const promo = data.promotion_objects[index];

    return (
      <div class="promotion_page">
        <div class="entry_deadline">
          <h1 class="urgent">The Next Entry Deadline is {dateFormat(promo.drawings[0].entry_deadline, "fullDate")}!</h1>
        </div>
        <div class="title_sum">
          <img src={"./" + promo.promo_image_url} alt=""/>
          <h2 class="promo_name">{promo.promotion_name}</h2>
          <p class="summary">{promo.summary}</p>
        </div>

        <PromoDrawingSm drawings={promo.drawings}/>
        <PromoDrawingLg drawings={promo.drawings}/>

        <p class="entry_info">{promo.entry_info}</p>

        <PromoEntriesSm entries={promo.entries}/>
        <PromoEntriesLg entries={promo.entries}/>

      </div>
    );
  }
}
