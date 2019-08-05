import React from "react";
import SideNavLink from "./SideNavLink";

export default function SideNav({ ctId }) {
  const sideNavComponents = [
    {
      name: "edit",
      text: "Trip Information"
    },
    {
      name: "itinerary",
      text: "Itinerary"
    },
    {
      name: "travelers",
      text: "Travelers"
    },
    {
      name: "preview",
      text: "Share"
    }
  ];
  const sideNavList = sideNavComponents.map(({ name, text }) => (
    <SideNavLink key={name} text={text} name={name} tripId={ctId} />
  ));
  return (
    <ul className="list-group list-group-flush bg-light">{sideNavList}</ul>
  );
}
