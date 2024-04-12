import { useState, useEffect } from "react";
import { useRef } from "react";
import useApi from "../utils/http";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "./Room.css";

const Room = () => {
  const toast = useRef(null);
  const api = useApi();
  const [getRoom, setGetRoom] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    roomData();
    return () => {};
  }, []);

  async function roomData() {
    const { data } = await api.get("/room_type.php");
    setGetRoom(data);
  }

  const show = () => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };

  //Create New Data
  const [newRoom, setNewRoom] = useState("");
  const [newPrice, setNewPrice] = useState();
  const [newType, setnewType] = useState("");
  const [newCapacity, setnewCapacity] = useState();
  const [newDescript, setnewDescript] = useState("");
  const [newImage, setnewImage] = useState("");

  async function createRoom(e) {
    e.preventDefault();

    try {
      const body = {
        room_name: newRoom,
        room_type: newType,
        room_price: newPrice,
        room_capacity: newCapacity,
        room_description: newDescript,
        room_img: newImage,
      };

      const { data } = await api.post("/room_type.php", body);

      roomData();
      setNewRoom("");
      setNewPrice("");
      setnewType("");
      setnewCapacity("");
      setnewDescript("");
      setnewImage("");
    } catch (error) {}
  }
  //End of Create Data

  //Update Data
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomType, setEditRoomType] = useState("");
  const [editPrice, setEditPrice] = useState();
  const [editCapacity, setEditCapacity] = useState();
  const [editDescript, setEditDescription] = useState("");
  const [editRoomImage, setEditRoomImage] = useState("");
  const [editRoomId, setRoomTaskId] = useState();

  async function editRoom(e) {
    e.preventDefault();

    try {
      const body = {
        room_name: editRoomName,
        room_type: editRoomType,
        room_price: editPrice,
        room_capacity: editCapacity,
        room_description: editDescript,
        room_img: editRoomImage,
      };

      const { data } = await api.put(
        `/room_type.php?roomType_id=${editRoomId}`,
        body
      );

      roomData();
      setEditRoomName("");
      setEditRoomType("");
      setEditPrice("");
      setEditCapacity("");
      setEditDescription("");
      setEditRoomImage("");
    } catch (error) {}
  }

  function updateRoomModal(data) {
    setRoomTaskId(data.roomType_id);
    setEditRoomName(data.room_name);
    setEditRoomType(data.room_type);
    setEditPrice(data.room_price);
    setEditCapacity(data.room_capacity);
    setEditDescription(data.room_description);
    setEditRoomImage(data.room_img);
    setLgShow(true);
  }
  console.log(editRoomName);
  //End of Update Data

  //DELETE

  async function accept(id) {
    try {
      const { data } = await api.delete(`/room_type.php?roomType_id=${id}`);
      roomData();
    } catch (error) {}
  }
  function handleDelete(data) {
    accept(data.roomType_id);
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="tableBase">
        <Row className="column-gap-5">
          <Col md={3} className="tableLine">
            <h4>Room Category Form</h4>
            <form onSubmit={createRoom} className="tableposition">
              <label htmlFor="" className="me-2">
                Room Name
              </label>
              <InputText
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
              />
              <label htmlFor="" className="me-2 mt-3">
                Price
              </label>
              <InputText
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label htmlFor="" className="me-2 mt-3">
                Type
              </label>
              <InputText
                value={newType}
                onChange={(e) => setnewType(e.target.value)}
              />
              <label htmlFor="" className="me-2 mt-3">
                Capacity
              </label>
              <InputText
                value={newCapacity}
                onChange={(e) => setnewCapacity(e.target.value)}
              />
              <label htmlFor="" className="me-2 mt-3">
                Description
              </label>
              <InputText
                value={newDescript}
                onChange={(e) => setnewDescript(e.target.value)}
              />
              <label for="image" className="me-2 mt-3">
                Image
              </label>
              <InputText
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg, png"
                value={newImage}
                placeholder="Drag here to upload"
                onChange={(e) => setnewImage(e.target.value)}
              />

              <div className="d-flex justify-content-end mt-4 ">
                <Button
                  type="submit"
                  disabled={
                    !newRoom ||
                    !newPrice ||
                    !newType ||
                    !newCapacity ||
                    !newDescript ||
                    !newImage
                  }
                  className="tableBtn px-4 py-1 rounded-2"
                >
                  Save
                </Button>
              </div>
            </form>
          </Col>
          <Col md={8} className="tableLine">
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room Image</th>
                  <th>Room Name</th>
                  <th>Room Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th className="tableDes">Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              {getRoom.map((detailRoom, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{detailRoom.roomType_id}</td>
                      <td>
                        <img
                          src={detailRoom.room_img}
                          alt=""
                          className="tableImg"
                        />
                      </td>
                      <td>{detailRoom.room_name}</td>
                      <td>{detailRoom.room_type}</td>
                      <td>{detailRoom.room_price}</td>
                      <td>{detailRoom.room_capacity}</td>
                      <td>{detailRoom.room_description}</td>
                      <td className="d-flex gap-2 btnroom">
                        <button onClick={() => updateRoomModal(detailRoom)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(detailRoom)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>

            <Modal
              show={lgShow}
              onHide={() => setLgShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <form onSubmit={editRoom}>
                <InputGroup size="sm" className="px-3 mt-4">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Room Name
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editRoomName}
                    onChange={(e) => setEditRoomName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm" className="px-3 mt-4">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Room Type
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editRoomType}
                    onChange={(e) => setEditRoomType(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm" className="px-3 mt-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Price
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm" className="px-3 mt-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Room Capacity
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editCapacity}
                    onChange={(e) => setEditCapacity(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm" className="px-3 mt-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Room Description
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editDescript}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size="sm" className="px-3 mt-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Room Image
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={editRoomImage}
                    onChange={(e) => setEditRoomImage(e.target.value)}
                  />
                </InputGroup>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => setLgShow(false)}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Room;
