import React from "react";
import TimeSlotGroup from "../Components/TimeSlotGroup";
import Header from "../Components/Header";
import Days from "../Components/Days";
import { datehelper, notify, MyEvents } from "../utils/";
// import savedEvents from '../utils/staticEventsData';
import EventModal from "../Components/EventModal";
import { Button } from "react-md";
import constants from "../constants/";
/**
 * Main statefull component
 */
class Calendar extends React.Component {
  state = {
    currentDate: datehelper.currentDate(),
    range: datehelper.getWeekRange(),
    showEventModal: false,
    events: MyEvents.data
  };

  // componentDidMount() {
  //   window.content = this.contentNode;
  //   const offsetFromParent = this.contentNode.offsetTop;
  //   let height = window.innerHeight  - offsetFromParent;
  //   if(this.contentNode.parentElement) {
  //     height -= this.contentNode.parentElement.offsetTop;
  //   }

  //   console.log(height)
  // }
  /**
   *
   * onTimeSlotSelected
   * @param {object} day
   */
  onTimeSlotSelected = day => {
    const start = datehelper.convertToDate(day.target.dataset.start);
    const end = datehelper.convertToDate(day.target.dataset.end);

    this.modalConfig = {
      ...this.getFormFieldsData(start, end),
      type: constants.types.ADD,
      title: null
    };

    this.showHideModal();
  };
  /**
   *
   * nextWeek
   */
  nextWeek = () => {
    const currentDate = datehelper.getNextWeek(this.state.currentDate);
    this.setState({
      currentDate,
      range: datehelper.getWeekRange(currentDate)
    });
  };
  /**
   *
   * prevWeek
   */
  prevWeek = () => {
    const currentDate = datehelper.getPrevWeek(this.state.currentDate);
    this.setState({
      currentDate,
      range: datehelper.getWeekRange(currentDate)
    });
  };
  /**
   *
   * onDragStart
   * @param {any} ev
   * @param {any} id
   */
  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };
  /**
   *
   *
   * @param {any} ev
   */
  onDragOver = ev => {
    ev.preventDefault();
    ev.target.classList.add("droppable");
  };
  /**
   *
   *
   * @param {any} ev
   */
  onDragLeave = ev => {
    ev.preventDefault();
    ev.target.classList.remove("droppable");
  };
  /**
   *
   *
   * @param {any} ev
   * @param {any} e
   */
  onDrop = (ev, e) => {
    let id = ev.dataTransfer.getData("id");
    const { events } = this.state;
    const index = events.findIndex(item => item.id === parseInt(id, 10));
    const slot = e.target.dataset;
    e.target.classList.remove("droppable");
    if (index !== -1) {
      const event = events[index];
      const durationInHours = datehelper.diffInHours(event.end, event.start);
      const d = datehelper.convertToDate(slot.start);
      events[index].start = d;
      events[index].end = d.clone().add(durationInHours, "h");

      this.setState({
        events
      });
      notify.success("Event has been modified successfully.");
    }
  };
  /**
   *
   *
   * @param {any} e
   * @param {any} id
   */
  onEventClicked = (e, id) => {
    e.preventDefault();
    const event = this.state.events.find(item => item.id === id);
    if (event) {
      const start = datehelper.convertToDate(event.start);
      const end = datehelper.convertToDate(event.end);

      this.modalConfig = {
        ...this.getFormFieldsData(start, end),
        type: constants.types.EDIT,
        title: event.title,
        id,
        message: event.message
      };

      this.showHideModal();
    }
  };
  /**
   *
   * getFormFieldsData
   * @param {any} start
   * @param {any} end
   * @returns
   */
  getFormFieldsData = (start, end) => {
    return {
      startDate: start.toDate(),
      startTime: start.format("HH:mm"),
      endDate: end.toDate(),
      endTime: end.format("HH:mm")
    };
  };
  /**
   *
   * onNewEventClicked
   */
  onNewEventClicked = () => {
    this.onColumnClicked(null, datehelper.now().startOf("day"));
  };
  /**
   *
   * onColumnClicked
   * @param {any} e
   * @param {any} date
   */
  onColumnClicked = (e, date) => {
    const start = date.clone();
    // set minutes based on current time
    const curretDate = datehelper.now();
    start.add(curretDate.minutes(), "m");
    start.add(curretDate.hours(), "h");
    let min = start.minutes();

    if (min < 30) {
      min = 30 - min;
    } else {
      min = 60 - min;
    }

    start.add(min, "m");
    const end = start.clone().add(1, "h");
    this.modalConfig = {
      ...this.getFormFieldsData(start, end),
      type: constants.types.ADD,
      title: null,
      id: -1
    };

    this.showHideModal();
  };
  /**
   *
   * onAction
   * @param {any} e
   * @param {any} type
   * @param {any} event
   * @returns
   */
  onAction = (e, type, event) => {
    const { events } = this.state;
    const { id = -1 } = event;
    const { startDate, startTime, endDate, endTime, ...rest } = event;
    const t = {
      ...rest,
      start: datehelper.mergeDateTime(startDate, startTime),
      end: datehelper.mergeDateTime(endDate, endTime)
    };
    // Check corner cases
    if (t.start.isSame(t.end)) {
      notify.error("From and to dates cannot be same.");
      return;
    } else if (t.start.isAfter(t.end)) {
      notify.error("From date cannot be higher than to date.");
      return;
    } else if (!t.start.isSame(t.end, "day")) {
      notify.error("Please schedule a meeting in same day.");
      return;
    } else {
      let msg = "";
      const eventIndex = events.findIndex(item => item.id === id);
      switch (type) {
        case constants.types.ADD: {
          t.id = Date.now();
          events.push(t);
          msg = "Event has been created successfully.";
          break;
        }
        case constants.types.EDIT: {
          events[eventIndex] = t;
          msg = "Event has been modified successfully.";
          break;
        }
        case constants.types.DELETE:
          events.splice(eventIndex, 1);
          msg = "Event has been deleted successfully.";
          break;
        default:
          break;
      }

      this.setState({
        events
      });
      this.showHideModal(false);
      // Show notification
      notify.success(msg);
      // save to loca storage as a storage mechanism
      MyEvents.save(events);
    }
  };
  /**
   *
   * showHideModal
   * @param {boolean} [show=true]
   */
  showHideModal = (show = true) => {
    if (show) {
      this.setState({
        showEventModal: true
      });
    } else {
      this.setState({
        showEventModal: false
      });
    }
  };

  modalConfig = {};
  render() {
    const timeslots = datehelper.getTimeSlots();

    return (
      <div className="calendar">
        <Header
          nextWeek={this.nextWeek}
          prevWeek={this.prevWeek}
          date={this.state.currentDate}
        />
        <Days range={this.state.range} onColumnClicked={this.onColumnClicked} />
        <div
          className="content row"
          ref={node => {
            this.contentNode = node;
          }}
        >
          {[this.state.range[0]].concat(this.state.range).map((item, i) => (
            <TimeSlotGroup
              date={item}
              key={i}
              isTimeSlotContent={i === 0}
              onDragStart={this.onDragStart}
              onTimeSlotSelected={this.onTimeSlotSelected}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
              events={this.state.events}
              onEventClicked={this.onEventClicked}
            />
          ))}
        </div>
        {this.state.showEventModal ? (
          <EventModal
            {...this.modalConfig}
            timeslots={timeslots}
            onAction={this.onAction}
            onHide={() => {
              this.showHideModal(false);
            }}
          />
        ) : null}
        <Button
          primary
          floating
          tooltipLabel="Create event"
          tooltipPosition="top"
          className="add-new-event"
          onClick={this.onNewEventClicked}
        >
          add
        </Button>
      </div>
    );
  }
}

export default Calendar;
