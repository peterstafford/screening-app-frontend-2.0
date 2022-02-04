import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "./ViewEvent.scss";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddEvent from "../AddEvents/AddEvent";
import eventService from "../../../services/eventService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import moment from "moment";

const ViewAdmin = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleOpen = () => setModalOpen(!modalOpen);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [selectedEvent, setSelectedEvent] = useState({ name: "" });

  const [dataa, setData] = useState({
    columns: [
      {
        label: "#",
        field: "number",
        sort: "asc",
      },
      {
        label: "Title",
        field: "title",
        // sort: "asc",
      },
      {
        label: "Decription",
        field: "description",
        // sort: "asc",
      },
      {
        label: "Image",
        field: "image",
        // sort: "asc",
      },
      {
        label: "Staring Date",
        field: "startingDate",
        // sort: "asc",
      },
      {
        label: "Ending Date",
        field: "endingDate",
        // sort: "asc",
      },
      {
        label: "Starting Time",
        field: "startingTime",
        // sort: "asc",
      },
      {
        label: "Ending Time",
        field: "endingTime",
        // sort: "asc",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows: [],
  });

  const handleDelete = (id) => {
    eventService
      .deleteEvent(id)
      .then((res) => {
        eventService.handleMessage("delete");
        toggleDelete();
      })
      .catch((err) => {
        eventService.handleError();
        toggleDelete();
      });
  };

  useEffect(() => {
    getEvents();
  }, [modalEdit, modalDelete, modalOpen]);

  const getEvents = () => {
    eventService
      .getEvent()
      .then((res) => {
        let data = { ...dataa };
        data.rows = [];
        res.data.map((item, index) => {
          data.rows.push({
            id: item._id,
            number: index + 1,
            title: item.title ? item.title : "none",
            description: item.description ? item.description : "none",
            image: <img className="tableImage" src={item.image ? item.image : "none"}></img>,
            startingDate: item.startingDate ? moment(item.startingDate).format("MMMM Do YYYY") : "none",
            endingDate: item.endingDate ? moment(item.endingDate).format("MMMM Do YYYY") : "none",
            startingTime: item.startingDate ? moment(item.startingDate).format("h:mm:ss a") : "none",
            endingTime : item.endingDate ? moment(item.endingDate).format("h:mm:ss a") : "none",
            action: (
              <div className="row">
               
                  <div>
                    <MdDelete
                      className="mdi mdi-delete-forever iconsS my-danger-icon"
                      size={20}
                      onClick={() => {
                        setSelectedEvent(item);
                        toggleDelete();
                      }}
                    />

                    <FaEdit
                      className="mdi mdi-delete-forever iconsS my-danger-icon"
                      size={20}
                      onClick={() => {
                        setSelectedEvent(item);
                        toggleEdit();
                      }}
                    />
                  </div>
                
              </div>
            ),
          });
        });
        // console.log("data", dataa);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="container add-admin">
     
        <div class="row align-items-center mb-3">
          <div class="col-10 mt-5 heading">
            <h3 class="m-0 p-0">Events</h3>
          </div>
          <div class="col-2 mt-5 add-bt">
            <Button
              type="button"
              class="btn btn-outline-primary btn-lg"
              onClick={() => {
                toggleOpen();
              }}
            >
              Add Event
            </Button>
          </div>
        </div>
     
      <div className="mt-4">
        <MDBDataTableV5
          responsive
          striped
          onPageChange={(val) => console.log(val)}
          bordered={true}
          materialSearch
          searchTop
          searchBottom={false}
          hover
          data={dataa}
          theadColor="#000"
        />
      </div>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Edit Event</ModalHeader>
        <ModalBody>
          <AddEvent editable={true} event={selectedEvent} toggleEdit={toggleEdit} toggle={toggleEdit} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>Add New Event</ModalHeader>
        <ModalBody>
          <AddEvent toggleOpen={toggleOpen} />
        </ModalBody>
      </Modal>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>Delete Event?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the event "{selectedEvent.title}"?
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleDelete(selectedEvent._id);
            }}
          >
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggleDelete}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewAdmin;
