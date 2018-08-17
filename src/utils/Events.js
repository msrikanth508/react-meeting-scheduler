class Events {
  static data = [
    {
      id: 1,
      title: "Toastmasters Club",
      start: new Date(2018, 7, 9, 8, 0, 0),
      end: new Date(2018, 7, 9, 9, 30, 0),
      message: "Weekly PSN Toastmasters club meeting."
    },
    {
      id: 2,
      title: "Shyftplan Test",
      start: new Date(2018, 7, 11, 8, 0, 0),
      end: new Date(2018, 7, 11, 16, 0, 0),
      message: "Work on Shyftplan assignment."
    },
    {
      id: 3,
      title: "Bike Maintaince",
      start: new Date(2018, 7, 12, 10, 0, 0),
      end: new Date(2018, 7, 12, 11, 30, 0),
      message:
        "Bike is really in bad condition, need to visit nearby service center."
    },
    {
      id: 4,
      title: "Family Lunch!",
      start: new Date(2018, 7, 12, 12, 0, 0),
      end: new Date(2018, 7, 12, 13, 30, 0),
      message: "Lunch at Paradise."
    },
    {
      id: 5,
      title: "Project Review Meeting",
      start: new Date(2018, 7, 13, 9, 0, 0),
      end: new Date(2018, 7, 13, 10, 30, 0),
      message: "Will review projec status and discuss on road map."
    },
    {
      id: 51,
      title: "one-to-one Meeting",
      start: new Date(2018, 7, 13, 10, 0, 0),
      end: new Date(2018, 7, 13, 10, 30, 0),
      message: "one-to-one Meeting."
    },
    {
      id: 6,
      title: "Yoga classes",
      start: new Date(2018, 7, 14, 4, 0, 0),
      end: new Date(2018, 7, 14, 5, 0, 0),
      message: "Attend yoga class"
    },
    {
      id: 7,
      title: "Gym",
      start: new Date(2018, 7, 15, 6, 0, 0),
      end: new Date(2018, 7, 15, 6, 30, 0),
      message: "Workout!"
    }, {
      id: 8,
      title: "Hooray, team outing",
      start: new Date(2018, 7, 19, 6, 0, 0),
      end: new Date(2018, 7, 19, 19, 0, 0),
      message: "Let's have some fun!"
    }, {
      id: 9,
      title: "Family Outing",
      start: new Date(2018, 7, 19, 6, 0, 0),
      end: new Date(2018, 7, 19, 19, 0, 0),
      message: "Family Outing"
    }, {
      id: 10,
      title: "Cousin marriage",
      start: new Date(2018, 7, 19, 6, 0, 0),
      end: new Date(2018, 7, 19, 19, 0, 0),
      message: "Cousin marriage"
    },
    {
      id: 11,
      title: "Project Review Meeting",
      start: new Date(2018, 7, 20, 9, 0, 0),
      end: new Date(2018, 7, 20, 10, 30, 0),
      message: "Will review projec status and discuss on road map."
    },
    {
      id: 12,
      title: "Company Annocuments!",
      start: new Date(2018, 7, 22, 9, 0, 0),
      end: new Date(2018, 7, 22, 11, 0, 0),
      message: "Company Annocuments!"
    },
    {
      id: 12,
      title: "Design Discussion",
      start: new Date(2018, 7, 23, 10, 0, 0),
      end: new Date(2018, 7, 23, 13, 0, 0),
      message: "Design Discussion on marketplace"
    },
  ];
  static save(events) {
    window.localStorage.setItem("events", JSON.stringify(events));
  }
  static init() {
    const e = window.localStorage.getItem("events");
    if (e) {
      Events.data = JSON.parse(e);
    }
    return Events.data;
  }
}

Events.init();
export default Events;
