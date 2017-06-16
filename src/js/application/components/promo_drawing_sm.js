import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat";

// small format for drawing schedule table
export default class PromoDrawingSm extends React.Component {
  render(){
    const drawings = this.props.drawings;

    const rows = drawings.map((o,i)=>
      <table key={i}>
        <tbody>
          <tr>
            <th>Prize</th>
            <td>{o.prize}</td>
          </tr>
          <tr>
            <th>Entry Deadline</th>
            <td>{dateFormat(o.entry_deadline, "fullDate")}</td>
          </tr>
          <tr>
            <th>Drawing Date</th>
            <td>{dateFormat(o.drawing_date, "fullDate")}</td>
          </tr>
        </tbody>
      </table>
    )

    return (
        <div class="drawing_sched_sm">
          <h2 class="drawing_schedule_title">Drawing Schedule</h2>
          {rows}
        </div>
    );
  }
}
