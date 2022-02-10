import React from "react";
import "./AddEvent.scss";
import { Formik } from "formik";
import DateTimePicker from "react-datetime-picker";
import eventValidation from "../../../validations/eventValidation";
import eventValidationNew from "../../../validations/eventValidationNew";
import eventsService from "../../../services/eventService";
import { toast } from "react-toastify";
import moment from "moment";

const AddEvent = (props) => {
  let sideBarState = props.state;
  const editable = props.editable;
  const event = props.event;
  const toggleEdit = props.toggleEdit;
  const toggleOpen = props.toggleOpen;
  console.log("This is event", event);
  return (
    <Formik
      initialValues={{
        title: editable && event.title,
        description: editable && event.description,
        image: editable && event.image,
        startingDate:
          editable && event.startingDate ? event.startingDate : new Date(),
        endingDate:
          editable && event.endingDate ? event.endingDate : new Date(),
      }}
      validationSchema={editable ? eventValidationNew.eventValidation : eventValidation.eventValidation}
      onSubmit={(values, actions) => {
        console.log("Valuessss", values);
        let formData = new FormData();
        formData.append("image", values.image);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("startingDate", values.startingDate);
        formData.append("endingDate", values.endingDate);
        console.log("Image Upload Data", formData);
        editable
          ? eventsService
              .updateEvent(event._id, formData)
              .then((res) => {
                eventsService.handleCustomMessage("Updated Event");
                props.toggle();
                toggleEdit && toggleEdit();
                // console.log("res", res);
              })
              .catch((err) => {
                console.log("ERRRROR",err)
                eventsService.handleCustomMessage(err.response.data);
                props.toggle();
              })
          : eventsService
              .addEvent(formData)
              .then((res) => {
                console.log(res);
                eventsService.handleCustomMessage("Event Added Successfully");
                toggleOpen && toggleOpen();
                // this.props.history.push("/");
                // window.location.reload();
              })
              .catch((err) => {
                toast.error(err.response.data, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              });
      }}
    >
      {(props) => {
        return (
          <div className="container add-admin">
            <h1> {console.log("err", props.errors)}</h1>
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Title
              </label>

              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="text"
                  onBlur={props.handleBlur}
                  name="title"
                  className="form-control"
                  id="title"
                  placeholder="Enter Title"
                  value={props.values.title}
                  onChange={props.handleChange("title")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.title && props.errors.title}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Description
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <textarea
                  type="text"
                  onBlur={props.handleBlur}
                  name="description"
                  className="form-control"
                  id="description"
                  placeholder="Enter Description"
                  value={props.values.description}
                  onChange={props.handleChange("description")}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.description && props.errors.description}
                </span>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                for="staticEmail"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Image
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <input
                  type="file"
                  onBlur={props.handleBlur}
                  name="image"
                  className="form-control"
                  id="image"
                  placeholder="Please Enter Image"
                  onChange={(event) =>
                    props.setFieldValue("image", event.target.files[0])
                  }
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.image && props.errors.image}
                </span>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                for="inputPassword"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Starting Date And Time
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <DateTimePicker
                  minDate={new Date()}
                  onChange={(e) => {
                    props.setFieldValue("startingDate", e);
                  }}
                  value={editable && props.values.startingDate
                      ? new Date(props.values.startingDate)
                      : props.values.startingDate}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.startingDate && props.errors.startingDate}
                </span>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                for="inputPassword"
                className={`${
                  sideBarState === true ? "col-sm-2" : "col-sm-4"
                } col-form-label text-align-end`}
              >
                Ending Date And Time
              </label>
              <div
                className={`${
                  sideBarState === true ? "col-sm-10" : "col-sm-8"
                }`}
              >
                <DateTimePicker
                  minDate={new Date()}
                  onChange={(e) => {
                    props.setFieldValue("endingDate", e);
                  }}
                  value={editable && props.values.endingDate
                    ? new Date(props.values.endingDate)
                    : props.values.endingDate}
                />
                <span id="err" className="invalid-feedback require">
                  {props.touched.endingDate && props.errors.endingDate}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-center bt-sub">
              <button
                type="button"
                onClick={props.handleSubmit}
                className="btn btn-outline-primary btn-lg"
              >
                Submit
              </button>
            </div>
            {console.log(sideBarState)}
          </div>
        );
      }}
    </Formik>
  );
};

export default AddEvent;
