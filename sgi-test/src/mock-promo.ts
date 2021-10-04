export interface DRAWING {
  entry_deadline: string;
  drawing_date: string;
  prize: string;
}

export interface ENTRY {
  entry_number: string;
  date: string;
}

export interface PROMO_OBJECT {
  promotion_name: string;
  promo_image_url: string;
  summary: string;
  entry_info: string;
  drawings: DRAWING[];
  entries: ENTRY[];
  [key: string]: any; //this will hold the next_draw_date
}

export interface MOCK_API_RESPONSE {
  server_time: string;
  promotion_objects: PROMO_OBJECT[];
}
