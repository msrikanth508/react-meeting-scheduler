import React from "react";
import EventCmp from "./Event";
import { datehelper } from '../utils/';
/**
 * This stateless component renders all time slots as a group/column
 */
const TimeSlotGroup = ({
  date,
  isTimeSlotContent,
  onTimeSlotSelected,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  events,
  onEventClicked
}) => {
  const d = date.clone();
  const nextDay = d.clone().add(1, "d");
  const timeSlots = [];

  while (d < nextDay) {
    const nextSlot = d.clone().add(30, "m");
    let commonProps = {};
    const slots = [
      {
        start: d,
        end: nextSlot
      },
      {
        start: nextSlot,
        end: nextSlot.clone().add(30, "m")
      }
    ];

    timeSlots.push(
      <div className="cell" key={d.toString()}>
        {slots.map((slot, i) => {
          if (!isTimeSlotContent) {
            commonProps.onClick = onTimeSlotSelected;
            commonProps.onDragOver = onDragOver;
            commonProps.onDragStart = onDragStart;
            commonProps.onDragLeave = onDragLeave;
            commonProps.onDrop = e => {
              onDrop(e, e);
            };
          }
          return (
            <div
              key={i}
              className="time-slot"
              data-start={slot.start.toString()}
              data-end={slot.end.toString()}
              {...commonProps}
            >
              {isTimeSlotContent && i === 0 ? slot.start.format("HH:mm A") : ""}
            </div>
          );
        })}
      </div>
    );
    d.add(1, "h");
  }

  const cx = ["column"];
  if (datehelper.isToday(date)) {
    cx.push("today");
  }
  if (isTimeSlotContent) {
    cx.push("slot-content");
  }
  return (
    <div className={cx.join(" ")}>
      {timeSlots}
      {!isTimeSlotContent ? (
        <EventCmp
          events={events}
          date={date}
          onDragStart={onDragStart}
          onEventClicked={onEventClicked}
        />
      ) : null}
    </div>
  );
};

export default TimeSlotGroup;
