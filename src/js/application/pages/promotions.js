import React from "react";
import { Link } from "react-router";

import PromoLine from "../components/promo_line"

// Primary page for the promotions
export default class Promotions extends React.Component {

  render(){

    const data = require('../../webdevtest-data.json');
    console.log(data);

    const promo_items = data.promotion_objects.map(
      (obj, index) => <PromoLine key={index} promo_index={index} promo_item={obj}/>
    )

    return (
      <div class="promotions_page">
        {promo_items}
      </div>
    );
  }
}
