import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalTWO from "../../../helper/staticImage/getStart/2.webp";
import ModalTHREE from "../../../helper/staticImage/getStart/3a.webp";
import ModalFOUR from "../../../helper/staticImage/getStart/3b.webp";
import ModalFIVE from "../../../helper/staticImage/getStart/5.webp";
import ModalSIX from "../../../helper/staticImage/getStart/6a.webp";
import ModalSIXB from "../../../helper/staticImage/getStart/6b.png";
import ModalSEVEN from "../../../helper/staticImage/getStart/7.webp";
import ModalEIGHT from "../../../helper/staticImage/getStart/8.webp";
import ModalNINE from "../../../helper/staticImage/getStart/9.webp";
import ModalTEN from "../../../helper/staticImage/getStart/10.webp";
import ModalELEVEN from "../../../helper/staticImage/getStart/icon2.webp";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const GetStartConnect = (props) => {
  const pmsData = [
    "Beds24",
    "BookingSync",
    "Guesty",
    "Hospitable",
    "Hostaway",
    "Hostfully",
    "Hostify",
    "Lodgify",
    "OwnerRez",
    "Smoobu",
  ];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-white main-modal"
    >
      <Modal.Body>
        <div>
          <h4>Connect your PMS</h4>
          <p>
            On the left sidebar, click “Properties”, then click “PMS
            Integration”.
          </p>
          <img src={ModalTWO} alt="" />
          <Link
            to="/properties"
            className="d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto"
          >
            Get Connected
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="my-4">
          <p>
            An Integrate Platform window will appear. Select your PMS Name and
            click “Continue“. Click “Click Here“ in the next window. You will be
            redirected to the authorization page.
          </p>
          <img src={ModalTHREE} alt="" />
          <img src={ModalFOUR} alt="" />
          <p>
            Select your PMS below and follow the authorization instructions
            specific to your PMS. Once finished, return to this page to continue
            setup!
          </p>
          {pmsData?.map((items) => {
            return <p>{items}</p>;
          })}
        </div>
        <div className="my-4">
          <h4>Import your Properties</h4>
          <p>
            You will see “Connected to (PMS Name)” at the top of your Properties
            page. You may now begin importing your listings from your PMS by
            clicking “Import Properties“, then choose which listings you’d like
            to import into HostBuddy. Property details and live guest data will
            be automatically imported from your PMS.
          </p>
          <img src={ModalFIVE} alt="" />
          <Link
            to="/properties"
            className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto"
          >
            Add your properties
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="my-4">
          <p>
            Select the pen icon next to your first property to access the
            property profile. Scroll down to find the HostBuddy Knowledge Base,
            which will list all the data HostBuddy is using to respond to your
            guests for that particular property. Here, you can upload any
            property documents, and manage the data HostBuddy will use.
          </p>
          <img src={ModalSIX} alt="" />
          <p>
            Once you’re ready, you can auto-fill your property details by
            selecting the auto-fill button. HostBuddy will now complete your
            property profile using the data you’ve selected. From here, you can
            choose to add more data, or skip to the next step to continue adding
            additional information to the property profile.
          </p>
          <img src={ModalSIXB} alt="" />
          <Link
            to="/properties"
            className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto"
          >
            Let's Go
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="my-4">
          <h4>Test</h4>
          <p>
            Put HostBuddy to the test by navigating back to the properties page
            and selecting “Test property” next to the property of your choosing.
            Ask HostBuddy your most common guest questions and watch it handle
            them with ease.
          </p>
          <img src={ModalSEVEN} alt="" />
          <p>
            HostBuddy will always respond based on real data you’ve provided,
            and you can see more information about each response by clicking
            “Where did this come from?”. If you feel that HostBuddy is missing
            data, navigate back to the property profile and add what’s needed!
          </p>
          <Link
            to="/properties"
            className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto"
          >
            Try it Out
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="my-4">
          <h4>Go Live</h4>
          <p>
            Start your subscription by navigating to the properties page and
            clicking “Subscribe”. This will take you through the checkout
            process where you will select your plan and number of properties.
          </p>
          <img src={ModalEIGHT} alt="" />
          <p>
            Once your subscription has been completed, you may unlock your
            properties on the properties page. Click “Unlock All Properties” to
            unlock them (or click “Unlock it” next to a specific property you’d
            like to unlock).
          </p>
          <img src={ModalNINE} alt="" />
          <p>
            Now it’s time to schedule HostBuddy. Click the calendar icon
            underneath the property name. You may now schedule HostBuddy to
            cover guest communications at whatever hours you choose. You also
            have the option of scheduling HostBuddy for specific days of the
            year.
          </p>
          <img src={ModalTEN} alt="" />
          <Link
            to="/properties"
            className=" d-flex justify-content-end align-items-center gap-1 properties_link border-primary border-bottom mt-auto"
          >
            Schedule HostBuddy
            <FaArrowRightLong />
          </Link>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="close">
          <i class="bi bi-x"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetStartConnect;
