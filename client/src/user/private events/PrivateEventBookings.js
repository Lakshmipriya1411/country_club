import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrivateEventBookings() {
  axios.defaults.withCredentials = true;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [upcoming, setUpcoming] = useState(false);
  const cancelBooking = () => {
    axios
      .post("http://localhost:3001/user/cancelParty", {
        party_id: rowData.data.party_id,
      })
      .then((result) => {
        setLoading(true);
        axios
          .get("http://localhost:3001/user/partyGetBookings")
          .then((response) => {
            setRows(response.data);
            setLoading(false);
            setUpcoming(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {});
  };
  const columns = [
    { field: "p_name", headerName: "Event Name", width: 200 },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 200,
      valueFormatter: (params) => params.value.substr(0, 10),
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 200,
      valueFormatter: (params) => {
        return params.value.substr(0, 10);
      },
    },
    { field: "hosted_at", headerName: "Venue", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/user/partyGetBookings")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (rows.length === 0) {
    return <div>No recent booking history</div>;
  }
  return (
    <div className="width100">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
          getRowId={(row) => row.party_id}
          autoHeight="true"
          onRowSelected={(rowData) => {
            setRowData(rowData);
            if (
              new Date(rowData.data.start_date) > new Date() &&
              rowData.data.status === "Confirmed"
            ) {
              setUpcoming(true);
            } else {
              setUpcoming(false);
            }
          }}
        />
      </div>
      <Button
        style={{ margin: "8px", display: "block", marginLeft: "auto" }}
        variant="contained"
        color="primary"
        disabled={!upcoming}
        onClick={cancelBooking}
      >
        Cancel
      </Button>
    </div>
  );
}
