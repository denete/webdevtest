import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat"

// large format for drawing schedule table
export default class PromoDrawingLg extends React.Component {
  render(){
    const drawings = this.props.drawings;

    const rows = drawings.map((o,i)=>
      <tr key={i}>
        <td>{o.prize}</td>
        <td>{dateFormat(o.entry_deadline, "fullDate")}</td>
        <td>{dateFormat(o.drawing_date, "fullDate")}</td>
      </tr>
    )

    return (
        <div class="drawing_sched_lg">
          <h2 class="drawing_schedule_title">Drawing Schedule</h2>
          <table>
            <tbody>
              <tr>
                <th>Prize</th>
                <th>Entry Deadline</th>
                <th>Drawing Date</th>
              </tr>
              {rows}
            </tbody>
          </table>
        </div>
    );
  }
}
