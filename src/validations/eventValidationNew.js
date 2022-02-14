import { yupToFormErrors } from "formik";
import * as Yup from "yup";

class EventValidation {
  eventValidation = () => {
    return Yup.object({
      title: Yup.string().required("Required!").min(2).max(100),
      description: Yup.string().required("Required!").min(10).max(10000),
      startingDate : Yup.date().required("Required!"),
      endingDate : Yup.date().min(Yup.ref('startingDate'), 'Ending date must be greater than starting date').required("Required!"),
    });
  };
}
const eventValidation = new EventValidation();
export default eventValidation;
