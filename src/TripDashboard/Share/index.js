import React, { Component } from "react";
import moment from "moment-timezone";
import { apiCall } from "../../util/api";
import Image from "../../util/otherComponents/Image";
import Map from "../Itinerary/Events/Map";
import { Switch, Route, withRouter, NavLink } from "react-router-dom";
import { getIcon } from "../../util/file-icons";

class Share extends Component {
  tripId = this.props.match.params.tripId;
  source = this.props.match.path.includes("preview") ? "preview" : "share";
  tz = moment.tz.guess(true);

  state = {
    trip: {},
    days: [],
    events: [],
    coordinators: [],
    documents: [],
    contacts: [],
    selectedDay: ""
  };
  constructor(props) {
    super(props);
    //get trip info
    this.getTripInfo();
    //get events
    this.getDaysAndEvents();
    this.getDocuments();
    //get coordinators
    //get documents
    //get emergency contacts
  }

  getTripInfo = async () => {
    let trip = await apiCall("get", `/api/trips/${this.tripId}`);

    this.setState({ trip });
  };

  getDaysAndEvents = async () => {
    let events = await apiCall(
      "get",
      `/api/trips/${this.tripId}/itinerary?tz=${this.tz}`
    );
    events.sort(time_sort_asc);
    let days = [];
    events.forEach(event => {
      if (!days.includes(event.dateStart)) days.push(event.dateStart);
    });

    this.setState({ events, days, selectedDay: days[0] });
  };

  getDocuments = async () => {
    let documents = await apiCall("get", `/api/trips/${this.tripId}/documents`);
    this.setState({ documents });
  };

  setSelectedDay = day => {
    this.setState({
      selectedDay: day
    });
  };

  route = route => {
    this.setState({ route });
  };

  render() {
    const { days, events, selectedDay, documents, trip } = this.state;
    const dayList = days.map(day => {
      let activeClass = day === selectedDay ? "text-primary" : "";
      return (
        <div
          className={`mx-4 d-flex flex-column align-items-center hover ${activeClass}`}
          onClick={() => this.setSelectedDay(day)}
        >
          <span>{moment(day).format("dd")}</span>
          <span className="h6">{moment(day).format("DD")}</span>
        </div>
      );
    });

    const eventList = events.map(event => {
      if (event.dateStart === selectedDay) {
        return <ShareEvent event={event} />;
      }
    });

    const documentList = documents.map(doc => {
      return <ShareDocument doc={doc} />;
    });

    const contactsList = trip.contacts
      ? trip.contacts.map(contact => {
          return <ShareContact contact={contact} />;
        })
      : null;

    return (
      <div
        style={{
          position: "relative",
          height: this.source === "preview" ? "70vh" : "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div id="header" style={{ height: "15vh" }}>
          <ShareCover trip={trip} />
        </div>
        <Switch>
          <Route
            exact
            path={`/trips/:tripId/${this.source}/documents`}
            render={props => (
              <div
                className="container"
                id="content"
                style={{ marginTop: "10vh", height: "70vh" }}
              >
                <div className="row d-flex justify-content-around">
                  {documentList}
                </div>
              </div>
            )}
          />
          <Route
            exact
            path={`/trips/:tripId/${this.source}/contacts`}
            render={props => (
              <div
                className="container"
                id="content"
                style={{ marginTop: "10vh", height: "70vh" }}
              >
                <div className="row d-flex justify-content-around">
                  {contactsList}
                </div>
              </div>
            )}
          />
          <Route
            path={`/trips/:tripId/${this.source}/`}
            render={props => (
              <>
                <div
                  className="row px-0 "
                  style={{
                    marginTop: "10vh",
                    height: "10vh",
                    marginBottom: "5vh"
                  }}
                >
                  <div className="col" />
                  <div className="col-10 d-flex flex-wrap justify-content-start">
                    {dayList}
                  </div>
                  <div className="col" />
                </div>
                <div
                  className="container "
                  id="content"
                  style={{ height: "60vh" }}
                >
                  <div className="row">
                    <div className="col-12 d-flex flex-column align-items-center">
                      {eventList}
                    </div>
                  </div>
                </div>
              </>
            )}
          />
        </Switch>
        <div id="footer" style={{ height: "10vh" }}>
          <Footer tripId={this.tripId} source={this.source} />
        </div>
      </div>
    );
  }
}

export default withRouter(Share);

const time_sort_asc = function(event1, event2) {
  if (
    moment(event1.dtStart, ["h:mm A"]).format("HH:mm") >
    moment(event2.dtStart, ["h:mm A"]).format("HH:mm")
  )
    return 1;
  if (
    moment(event1.dtStart, ["h:mm A"]).format("HH:mm") <
    moment(event2.dtStart, ["h:mm A"]).format("HH:mm")
  )
    return -1;
  return 0;
};

class ShareEvent extends Component {
  render() {
    let { event } = this.props;
    let iconString,
      color = "";
    switch (event.type.toLowerCase()) {
      case "lodging":
        iconString = "fa-bed";
        color = "#FEA600";
        break;
      case "transportation":
        iconString = "fa-car";
        color = "#BF9DD9";
        break;
      case "event":
        iconString = "fa-calendar-check";
        color = "#83C9F4";
        break;
      case "flight":
        iconString = "fa-plane";
        color = "#CCAA55";
        break;
      default:
        break;
    }

    if (event.tripDate) {
      iconString = "fa-calendar";
      color = "#FF0000";
    }
    const date =
      event.dtStart && event.dtEnd ? `${event.dtStart} - ${event.dtEnd}` : null;

    const map = event.coordinates ? (
      event.coordinates.lat && event.coordinates.long ? (
        <div className="row">
          <div className="col-12">
            <Map coordinates={event.coordinates} />
          </div>
        </div>
      ) : null
    ) : null;

    const name = event.tripDate ? `Trip Date: ${event.name}` : event.name;

    const address = event.address ? (
      <p className="card-text">{"Address: " + event.address}</p>
    ) : null;

    return (
      <div
        className="card mb-3 border-0 shadow px-3 rounded-lg animated fadeIn"
        style={{ width: "100%" }}
      >
        <div className="row">
          <div className="card-body">
            <h5 className="card-title">
              <strong> {name}</strong>
              <i
                className={`fa ${iconString} float-right`}
                style={{ color: color }}
              />
            </h5>
            <div className="row">
              <div className="col-md-6 d-flex flex-column">
                <h6 className="card-subtitle mb-2" style={{ color: color }}>
                  {date}
                </h6>
                <p className="card-text">{event.description}</p>
                <a
                  href={event.link}
                  className="card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.linkDescription}
                </a>
              </div>
              <div className="col-md-6">
                {map}
                {address}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ShareDocument = ({ doc }) => {
  const linkImg = getIcon(doc.link);
  return (
    <div className="card mb-3 border-0 shadow px-1 rounded-lg animated fadeIn col-5 mx-2">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center justify-content-between">
          <a
            className="hove d-flex alighn-self-center py-1"
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkImg} alt="" style={{ objectFit: "cover" }} />
          </a>
          <strong className="text-center"> {doc.name}</strong>
        </div>
      </div>
    </div>
  );
};

const ShareContact = ({ contact }) => {
  return (
    <div className="card mb-3 border-0 shadow px-1 rounded-lg animated fadeIn col-5 mx-2">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center justify-content-between">
          <Image src={contact.image} diameter="65px" />
          <strong className="h6 mt-3"> {contact.name}</strong>
          <p className="card-text" style={{ fontSize: ".6em" }}>
            {contact.number}
          </p>
          <p className="card-text" style={{ fontSize: ".6em" }}>
            {contact.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const ShareCover = ({ trip }) => {
  return (
    <div
      className="row mb-4 d-flex flex-column justify-content-between p-4"
      style={{
        backgroundImage: `url(${trip.image})`,
        minHeight: "150px",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <h2 className="text-primary">{trip.name} Trip</h2>
      <h4 className="text-light">
        {moment(trip.dateEnd).format("MMMM DD")} to{" "}
        {moment(trip.dateStart).format("MMMM DD")}
      </h4>
    </div>
  );
};

const Footer = ({ tripId, source }) => (
  <div className="row">
    <div className="col-12">
      <footer
        className="footer d-flex align-items-center"
        style={{ height: "10vh" }}
      >
        <div className="container">
          <div className="row d-flex justify-content-around align-items-center">
            <NavLink
              activeClassName="active"
              to={`/trips/${tripId}/${source}/itinerary`}
              name={`/trips/${tripId}/${source}/itinerary`}
            >
              <i class="far fa-calendar fa-2x text-secondary" />
            </NavLink>
            <NavLink
              activeClassName="active"
              to={`/trips/${tripId}/${source}/documents`}
              name={`/trips/${tripId}/${source}/documents`}
            >
              <i class="far fa-folder fa-2x text-secondary" />
            </NavLink>
            <NavLink
              activeClassName="active"
              to={`/trips/${tripId}/${source}/contacts`}
              name={`/trips/${tripId}/${source}/contacts`}
            >
              <i class="far fa-user fa-2x text-secondary" />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
