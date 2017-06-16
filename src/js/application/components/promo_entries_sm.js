import React from "react";
import { Link } from "react-router";
import dateFormat from "dateformat";

// table for small format Ticket entries
export default class PromoEntriesSm extends React.Component {
  render(){
    const entries = this.props.entries;

    const rows = entries.map((o,i)=>
      <table key={i}>
        <tbody>
          <tr>
            <th>Entry Number</th>
            <td>{o.entry_number}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{dateFormat(o.date, "fullDate")}</td>
          </tr>
        </tbody>
      </table>
    )

    return (
      <div class="ticket_entries_sm">
        <h2 class="total_entered">Your total Tickets Entered: {entries.length}</h2>
        <p>All Entries are locked in at the time they are submitted and cannotbe deleted.</p>
        {rows}
      </div>
    );
  }
}
