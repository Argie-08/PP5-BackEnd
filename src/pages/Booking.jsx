import useApi from "../utils/http";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import Modal from "react-bootstrap/Modal";
import "./Booking.css";

const Booking = () => {
  const api = useApi();
  const [bookingData, setBookingData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [bookingRoom, setBookingRoom] = useState([]);
  const [bookingGuest, setBookingGuest] = useState([]);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const tableButton = () => {
    return <Button label="View" onClick={handleShow} />;
  };

  useEffect(() => {
    getBooking();
    getBookingRoom();
    getBookingGuest();
    return () => {};
  }, []);

  async function getBooking() {
    const { data } = await api.get("/booking.php");
    setBookingData(data);
  }

  async function getBookingRoom() {
    const { data } = await api.get("/room_type.php");
    setBookingRoom(data);
  }

  async function getBookingGuest() {
    const { data } = await api.get("/guest.php");
    setBookingGuest(data);
  }

  return (
    <>
      <div className="tableBase">
        <div className="card">
          <DataTable value={bookingData} showGridlines>
            <Column field="booking_id" header="Booking Reference"></Column>
            <Column field="booking_date" header="Booking Date"></Column>
            <Column field="checkIn_date" header="Check In"></Column>
            <Column field="checkOut_date" header="Check Out"></Column>
            <Column field="Status" header="Status"></Column>
            <Column field="guest_id" header="Guest ID"></Column>
            <Column body={tableButton} header="Action"></Column>
          </DataTable>
        </div>
        <Modal
          show={modalShow}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Booking;
