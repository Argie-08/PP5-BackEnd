import useApi from "../utils/http";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Guest.css";

const Guest = () => {
  const api = useApi();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getGuest();
    return () => {};
  }, []);

  async function getGuest() {
    const { data } = await api.get("/guest.php");
    setTableData(data);
  }

  return (
    <>
      <div className="tableBase">
        <div className="card guestTable">
          <DataTable value={tableData} tableStyle={{ minWidth: "50rem" }}>
            <Column field="guest_id" header="ID"></Column>
            <Column field="guest_firstName" header="First Name"></Column>
            <Column field="guest_lastName" header="Last Name"></Column>
            <Column field="guest_gender" header="Gender"></Column>
            <Column field="guest_phoneNumber" header="Contact No."></Column>
            <Column field="guest_email" header="Email"></Column>
            <Column field="guest_city" header="City/ Municipality"></Column>
            <Column field="guest_country" header="Country"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Guest;
