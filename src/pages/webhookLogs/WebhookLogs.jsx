import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ToastHandle from "../../helper/ToastMessage";
import { BoxLoader } from "../../helper/Loader";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";
import "./WebhookLogs.css";

const WebhookLogs = () => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  const [webhookLogs, setWebhookLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const callGetWebhookLogsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const response = await axios.get(
        `${baseUrl}/get_notification_logs?limit=200`,
        config
      );

      if (response.status === 200) {
        setWebhookLogs(response.data.notification_logs);
      } else {
        ToastHandle(response?.data?.error || "Failed to load webhook logs", "danger");
      }
    } catch (error) {
      ToastHandle("Error - unable to get webhook logs", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callGetWebhookLogsApi();
  }, []);

  const getStatusColor = (status) => {
    if (status === "timeout") return "#ef4444"; // red
    if (typeof status === "number" && status >= 200 && status < 300)
      return "#10b981"; // green
    return "#ef4444"; // red for errors
  };

  const getStatusText = (status) => {
    if (status === "timeout") return "Timeout";
    return status?.toString() || "Unknown";
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return timestamp;
    }
  };

  const handleRowClick = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLog(null);
  };

  if (loading) {
    return (
      <Container className="webhook-logs-container">
        <BoxLoader />
      </Container>
    );
  }

  return (
    <>
      <Container className="webhook-logs-container">
        <div className="webhook-logs-header">
          <h1
            className="webhook-logs-title"
            style={{
              color:
                !cssLoading && cssConfig?.css_data?.text?.primary
                  ? cssConfig.css_data.text.primary
                  : "white",
            }}
          >
            Webhook Logs
          </h1>
          <p
            className="webhook-logs-subtitle"
            style={{
              color:
                !cssLoading && cssConfig?.css_data?.text?.secondary
                  ? cssConfig.css_data.text.secondary
                  : "#a6a9b2",
            }}
          >
            View all webhooks sent to your account
          </p>
        </div>

        {webhookLogs.length === 0 ? (
          <div
            className="webhook-logs-empty"
            style={{
              color:
                !cssLoading && cssConfig?.css_data?.text?.quaternary
                  ? cssConfig.css_data.text.quaternary
                  : "#a6a9b2",
            }}
          >
            No webhook logs found
          </div>
        ) : (
          <div className="webhook-logs-table-wrapper">
            <table className="webhook-logs-table">
              <thead>
                <tr>
                  <th
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.primary
                          ? cssConfig.css_data.text.primary
                          : "white",
                    }}
                  >
                    Timestamp
                  </th>
                  <th
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.primary
                          ? cssConfig.css_data.text.primary
                          : "white",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.primary
                          ? cssConfig.css_data.text.primary
                          : "white",
                    }}
                  >
                    Guest
                  </th>
                  <th
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.primary
                          ? cssConfig.css_data.text.primary
                          : "white",
                    }}
                  >
                    Property
                  </th>
                  <th
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.primary
                          ? cssConfig.css_data.text.primary
                          : "white",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {webhookLogs.map((log, index) => (
                  <tr
                    key={log.id || index}
                    onClick={() => handleRowClick(log)}
                    className="webhook-log-row"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <td
                      style={{
                        color:
                          !cssLoading && cssConfig?.css_data?.text?.secondary
                            ? cssConfig.css_data.text.secondary
                            : "#d1d5db",
                      }}
                    >
                      {formatTimestamp(log.time_utc)}
                    </td>
                    <td
                      style={{
                        color:
                          !cssLoading && cssConfig?.css_data?.text?.secondary
                            ? cssConfig.css_data.text.secondary
                            : "#d1d5db",
                      }}
                    >
                      {log.hook_type || "N/A"}
                    </td>
                    <td
                      style={{
                        color:
                          !cssLoading && cssConfig?.css_data?.text?.secondary
                            ? cssConfig.css_data.text.secondary
                            : "#d1d5db",
                      }}
                    >
                      {log.guest_name || "N/A"}
                    </td>
                    <td
                      style={{
                        color:
                          !cssLoading && cssConfig?.css_data?.text?.secondary
                            ? cssConfig.css_data.text.secondary
                            : "#d1d5db",
                      }}
                    >
                      {log.property_name || "N/A"}
                    </td>
                    <td>
                      <div className="webhook-status-cell">
                        <span
                          className="webhook-status-dot"
                          style={{
                            backgroundColor: getStatusColor(log.response_status),
                          }}
                        ></span>
                        <span
                          style={{
                            color:
                              !cssLoading && cssConfig?.css_data?.text?.secondary
                                ? cssConfig.css_data.text.secondary
                                : "#d1d5db",
                          }}
                        >
                          {getStatusText(log.response_status)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>

      {/* Modal for detailed log view */}
      {showModal && selectedLog && (
        <div className="webhook-modal-backdrop" onClick={closeModal}>
          <div
            className="webhook-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor:
                !cssLoading && cssConfig?.css_data?.background?.secondary
                  ? cssConfig.css_data.background.secondary
                  : "#1a1f36",
              borderColor:
                !cssLoading && cssConfig?.css_data?.border?.primary
                  ? cssConfig.css_data.border.primary
                  : "#2d3548",
            }}
          >
            <div className="webhook-modal-header">
              <h2
                style={{
                  color:
                    !cssLoading && cssConfig?.css_data?.text?.primary
                      ? cssConfig.css_data.text.primary
                      : "white",
                }}
              >
                Webhook Log Details
              </h2>
              <button
                className="webhook-modal-close"
                onClick={closeModal}
                style={{
                  color:
                    !cssLoading && cssConfig?.css_data?.text?.secondary
                      ? cssConfig.css_data.text.secondary
                      : "#a6a9b2",
                }}
              >
                ×
              </button>
            </div>
            <div className="webhook-modal-body">
              {Object.entries(selectedLog).map(([key, value]) => (
                <div key={key} className="webhook-detail-row">
                  <div
                    className="webhook-detail-label"
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.tertiary
                          ? cssConfig.css_data.text.tertiary
                          : "#9ca3af",
                    }}
                  >
                    {key}:
                  </div>
                  <div
                    className="webhook-detail-value"
                    style={{
                      color:
                        !cssLoading && cssConfig?.css_data?.text?.secondary
                          ? cssConfig.css_data.text.secondary
                          : "#d1d5db",
                    }}
                  >
                    {key === "response_status" ? (
                      <div className="webhook-status-cell">
                        <span
                          className="webhook-status-dot"
                          style={{
                            backgroundColor: getStatusColor(value),
                          }}
                        ></span>
                        <span>{getStatusText(value)}</span>
                      </div>
                    ) : typeof value === "object" && value !== null ? (
                      <pre className="webhook-json-display">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : (
                      String(value || "N/A")
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebhookLogs;
