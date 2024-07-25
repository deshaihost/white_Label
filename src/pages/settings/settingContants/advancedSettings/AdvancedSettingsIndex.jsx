import React from "react";
import { Button, FormCheck, Form } from "react-bootstrap";

const AdvancedSettingsIndex = () => {
  return (
    <div>
      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
        <h5>Advanced Settings</h5>
        <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
          <Button className="rounded-pill px-5 text-nowrap fs-14">
            Save Settings
          </Button>
          <select
            class="form-select rounded-pill border-primary text-white shadow-none fs-14 setting-tab-select mb-3 mb-md-0"
            style={{ backgroundColor: "#000212", backgroundImage: "" }}
            aria-label="Default select example"
          >
            <option selected>Default Setting</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <label className="mb-1 fs-6">Name</label>
          <input
            className="form-control border-white fs-14"
            placeholder="Default setting"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 mb-3">
          <label className="mb-1 fs-6">Properties</label>
          <select
            class="form-control  rounded-pill border-white shadow-none fs-14 setting-tab-select"
            style={{ backgroundColor: "#000212", backgroundImage: "" }}
            aria-label="Default select example"
          >
            <option selected>Default Setting</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-6">Mirror Host Tone</label>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              checked
            />
          </div>
          <p className="fs-12">
            HostBuddy will use past conversations to mirror the tone of the host
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="">
            <label className="fs-6 mb-1">Defer Behavior</label>
            <p className="fs-12">
              How should HostBuddy respond when it's not able to resolve the
              user issue?
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <Form.Check
                type="radio"
                aria-label="radio 1"
                name="group1"
                label="Defer to host"
              />
            </div>
            <div className="col-lg-8">
              <p className="fs-12 text-muted">
                Ex. "...the host will get back to you..."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <Form.Check
                type="radio"
                aria-label="radio 2"
                name="group1"
                label="Defer to team"
              />
            </div>
            <div className="col-lg-8">
              <p className="fs-12 text-muted">
                Ex. "...will check with my team..."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <Form.Check
                type="radio"
                aria-label="radio 3"
                name="group1"
                label="Embody host"
              />
            </div>
            <div className="col-lg-8">
              <p className="fs-12 text-muted">
                Ex. "...I will get back to you..."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <Form.Check
                type="radio"
                aria-label="radio 4"
                name="group1"
                label="Emergency Contact"
              />
            </div>
            <div className="col-lg-8">
              <p className="fs-12 text-muted">Ex. "...please contact</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-4">
              <Form.Check
                type="radio"
                aria-label="radio 4"
                name="group1"
                label="Do not respond"
              />
            </div>
            <div className="col-lg-8">
              {/* <p className="fs-12 text-muted">
              Ex. "...please contact
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-11">
          <div className="">
            <label className="fs-6 mb-1">Emergency Contact (optional)</label>
            <p className="fs-12 mb-2">
              HostBuddy will provide this information to guests in the event of
              an emergency requiring immediate attention
            </p>
            <input
              className="form-control"
              placeholder="ex. John Doe, (888-123-4567)"
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-11">
          <div className="">
            <label className="fs-6 mb-1">Signature</label>
            <p className="fs-12 mb-2">
              HostBuddy will use this signature to sign off each message
            </p>
            <textarea
              className="form-control setting-textarea"
              placeholder=""
              rows={1}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-11">
          <div className="">
            <label className="fs-6 mb-1">Al Transparency</label>
            <p className="fs-12 mb-2">
              Can HostBuddy communicate that it is an Al assistant?
            </p>
            <div className="">
              <Form.Check
                type="radio"
                aria-label="radio1"
                name="group2"
                label="Yes, only if directly asked"
              />
            </div>
            <div className="">
              <Form.Check
                type="radio"
                aria-label="radio1"
                name="group2"
                label="No, never indicate that an Al is responding, no matter what"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12 text-center">
          <Button className="btn-primary fs-16 px-4 rounded-pill">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsIndex;
