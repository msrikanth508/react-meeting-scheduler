import React from "react";
import {
  Button,
  DialogContainer,
  TextField,
  Toolbar,
  DatePicker,
  SelectField
} from "react-md";
import PropTypes from "react-proptypes";
import constants from "../constants/";

/**
 * This statefull component renders modal to create/edit/delete events
 */
class EventModal extends React.PureComponent {
  state = {
    title: this.props.title || "",
    startDate: this.props.startDate,
    startTime: this.props.startTime,
    endDate: this.props.endDate,
    endTime: this.props.endTime,
    message: this.props.message,
    id: this.props.id,
    titleErrorMessage: ""
  };
  /**
   *
   * onValueChanged
   * @param {string} field
   * @param {string} value
   */
  onValueChanged = (field, value) => {
    if (field && value) {
      this.setState({
        [field]: value
      });
    }
  };
  /**
   *
   * onButtonClicked
   * @param {object} e
   * @param {string} type
   */
  onButtonClicked = (e, type = this.props.type) => {
    if (!this.state.title.length) {
      this.setState({
        titleErrorMessage: "Please fill title."
      });
    } else {
      this.setState({
        titleErrorMessage: ""
      });
      this.props.onAction(e, type, this.state);
    }
  };

  render() {
    const { timeslots, type, onHide } = this.props;
    const actions = [
      <Button raised onClick={onHide}>
        Cancel
      </Button>,
      <Button raised primary onClick={this.onButtonClicked}>
        {constants[type].buttonText || "save"}
      </Button>
    ];
    if (type === "EDIT") {
      actions.splice(
        1,
        0,
        <Button
          tooltipLabel="Remove from calendar"
          tooltipPosition="top"
          className="event-delete"
          raised
          primary
          iconEl={
            <i icon className="md-icon material-icons">
              delete
            </i>
          }
          onClick={e => this.onButtonClicked(e, "DELETE")}
        >
          Delete
        </Button>
      );
    }
    return (
      <DialogContainer
        id="simple-list-page-dialog"
        visible={true}
        fullPage={false}
        onHide={onHide}
        width={"40%"}
        aria-labelledby="simple-full-page-dialog-title"
        actions={actions}
      >
        <Toolbar
          fixed
          colored
          title={constants[type].dialogTitle || "Title"}
          titleId="simple-full-page-dialog-title"
          actions={
            <span title="Close" className="icon cancel" onClick={onHide}>
              cancel
            </span>
          }
        />
        <section className="md-toolbar-relative">
          <TextField
            id="floating-center-title"
            label="Title"
            lineDirection="center"
            placeholder="Enter Title"
            defaultValue={this.state.title}
            error={this.state.titleErrorMessage.length ? true : false}
            errorText={this.state.titleErrorMessage}
            onChange={e => {
              this.onValueChanged("title", e);
            }}
          />

          <div className="md-grid events-field-grid">
            <DatePicker
              id="show-all-days"
              label="From"
              defaultValue={this.state.startDate}
              displayMode="portrait"
              firstDayOfWeek={1}
              autoOk
              onChange={(e, obj) => {
                this.onValueChanged("startDate", obj);
              }}
            />
            <SelectField
              id="floating-start-time"
              label=" "
              menuItems={timeslots}
              defaultValue={this.state.startTime}
              onChange={e => {
                this.onValueChanged("startTime", e);
              }}
            />
          </div>
          <div className="md-grid events-field-grid">
            <DatePicker
              id="show-all-days"
              label="To"
              defaultValue={this.state.endDate}
              displayMode="portrait"
              firstDayOfWeek={1}
              autoOk
              onChange={(e, obj) => {
                this.onValueChanged("endDate", obj);
              }}
            />

            <SelectField
              id="floating-start-time"
              label=" "
              menuItems={timeslots}
              defaultValue={this.state.endTime}
              onChange={e => {
                this.onValueChanged("endTime", e);
              }}
            />
          </div>
          <TextField
            id="email-body"
            label="Message"
            placeholder="Enter..."
            rows={4}
            paddedBlock
            maxLength={160}
            defaultValue={this.state.message}
            errorText="Max 160 characters."
            onChange={e => {
              this.onValueChanged("message", e);
            }}
          />
        </section>
      </DialogContainer>
    );
  }
}

EventModal.propTypes = {
  title: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.number,
  type: PropTypes.string,
  onHide: PropTypes.func,
  onAction: PropTypes.func
};

export default EventModal;
