import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat";

// Each promotion line
export default class PromoLine extends React.Component {

  render(){
    const promo_item = this.props.promo_item;
    const promo_index = this.props.promo_index;

    return (
      <div class="promo_line">
        <div class="">
          <img src={"./" + promo_item.promo_image_url} alt=""/>
          <Link to={"/promotion/" + promo_index}><h2>{promo_item.promotion_name}</h2></Link>
          <p>{promo_item.summary}</p>
          <p>Next Drawing Date: {dateFormat(promo_item.drawings[0].drawing_date, "fullDate")} </p>
        </div>
      </div>
    );
  }
}
