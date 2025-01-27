import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

function Modal(props) {
  const myArray = [
    { text: props.date, icon: <FaCalendar /> },
    { text: props.time, icon: <FaClock /> },
    { text: props.room, icon: <FaMapMarkerAlt /> },
  ];

  const [data, setData] = useState({
    activity: {
      name: "",
      categories: [""],
      description: "",
      meetingDays: [""],
      meetingStartEndTimes: "",
      location: "",
      link: "",
      displayedPublically: false,
    },
  });

  const handleClick = () => {
    props.onClose(undefined);
  };

  useEffect(() => {
    const clubId = props.selectedClub;

    fetch("https://hersey-club-finder.herokuapp.com/activities/" + clubId)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [props.selectedClub]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur">
        <div className="relative z-10 bg-white rounded-lg p-8 shadow-lg max-w-screen-sm overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{data.activity.name}</h2>

            <button className="text-gray-700 text-lg" onClick={handleClick}>
              &times;
            </button>
          </div>

          <div className="bg-black-100 pb-4 inline-block">
            {data.activity.categories.map((category, index) => (
              <span className="mr-2 bg-slate-100 rounded-lg p-2" key={index}>
                {category}
              </span>
            ))}
          </div>

          <p className="pb-4 text-gray-400">{data.activity.description}</p>

          <div className="flex justify-between">
            <table className="table-auto text-gray-400 border-collapse">
              <tbody>
                <tr>
                  <td className="flex items-center gap-2">
                    {<FaCalendar />}{" "}
                    {data.activity.meetingDays.length >= 2
                      ? data.activity.meetingDays.filter(Boolean).join(", ")
                      : data.activity.meetingDays}
                  </td>
                  <td className="flex items-center gap-2">
                    {<FaClock />} {data.activity.meetingStartEndTimes}
                  </td>
                  <td className="flex items-center gap-2">
                    {<FaMapMarkerAlt />} {data.activity.location}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto text-gray-400 border-collapse">
              <tbody>
                <tr>
                  <td className="flex items-center gap-2">
                    {<FaEnvelope />} bob.brown@d214.org
                  </td>
                  <td className="flex items-center gap-2">
                    {<FaExternalLinkAlt />}{" "}
                    {data.activity.link ? (
                      <a href={data.activity.link}>{data.activity.link}</a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-0"
          onClick={handleClick}
        ></div>
      </div>
    </>
  );
}

export default Modal;
