import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat";

// table for large format Ticket entries
export default class PromoEntriesLg extends React.Component {
  render(){
    const entries = this.props.entries;

    const rows = entries.map((o,i)=>
      <tr key={i}>
        <td>{o.entry_number}</td>
        <td>{dateFormat(o.date, "fullDate")}</td>
      </tr>
    )

    return (
      <div class="ticket_entries_lg">
        <h2 class="total_entered">Your total Tickets Entered: {entries.length}</h2>
        <p>All Entries are locked in at the time they are submitted and cannotbe deleted.</p>
        <table>
          <thead>
            <tr>
              <th>Entry Number</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
