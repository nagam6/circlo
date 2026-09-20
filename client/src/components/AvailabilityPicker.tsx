import { useEffect, useMemo, useState } from "react";

type AvailabilityPeriod = {
  _id: string;
  itemId: string;
  startAt: string;
  endAt: string;
  availabilityType: "available" | "blocked";
  note?: string;
};

type AvailabilityPickerProps = {
  itemId: string;
  onDatesChange?: (
    startAt: string,
    endAt: string
  ) => void;
};

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const AvailabilityPicker = ({
  itemId,
  onDatesChange,
}: AvailabilityPickerProps) => {
  const [periods, setPeriods] = useState<
    AvailabilityPeriod[]
  >([]);

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/items/${itemId}/availability`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load availability"
          );
        }

        const data = await response.json();

        setPeriods(data.availability || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load availability"
        );
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchAvailability();
    }
  }, [itemId]);

  const blockedPeriods = useMemo(
    () =>
      periods.filter(
        (period) =>
          period.availabilityType === "blocked"
      ),
    [periods]
  );

  const hasConflict = useMemo(() => {
    if (!startAt || !endAt) {
      return false;
    }

    const selectedStart = new Date(startAt);
    const selectedEnd = new Date(endAt);

    return blockedPeriods.some((period) => {
      const blockedStart = new Date(
        period.startAt
      );

      const blockedEnd = new Date(
        period.endAt
      );

      return (
        selectedStart < blockedEnd &&
        selectedEnd > blockedStart
      );
    });
  }, [startAt, endAt, blockedPeriods]);

  const invalidRange =
    startAt &&
    endAt &&
    new Date(endAt) <= new Date(startAt);

  const handleStartChange = (
    value: string
  ) => {
    setStartAt(value);

    onDatesChange?.(
      value,
      endAt
    );
  };

  const handleEndChange = (
    value: string
  ) => {
    setEndAt(value);

    onDatesChange?.(
      startAt,
      value
    );
  };

  if (loading) {
    return (
      <div className="availability-picker">
        <p>Loading availability...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="availability-picker">
        <p className="availability-error">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="availability-picker">
      <div className="availability-heading">
        <div>
          <p className="availability-label">
            Rental period
          </p>

          <h3>Choose your dates</h3>
        </div>

        <span className="availability-badge">
          Check availability
        </span>
      </div>

      <div className="availability-inputs">
        <label>
          Start
          <input
            type="datetime-local"
            value={startAt}
            onChange={(e) =>
              handleStartChange(
                e.target.value
              )
            }
          />
        </label>

        <label>
          End
          <input
            type="datetime-local"
            value={endAt}
            onChange={(e) =>
              handleEndChange(
                e.target.value
              )
            }
          />
        </label>
      </div>

      {invalidRange && (
        <p className="availability-error">
          End time must be after start time.
        </p>
      )}

      {!invalidRange &&
        hasConflict && (
          <p className="availability-error">
            This item is unavailable during
            part of the selected period.
          </p>
        )}

      {!invalidRange &&
        !hasConflict &&
        startAt &&
        endAt && (
          <p className="availability-success">
            ✓ This rental period is
            currently available.
          </p>
        )}

      {blockedPeriods.length > 0 && (
        <div className="blocked-periods">
          <h4>Unavailable periods</h4>

          {blockedPeriods.map(
            (period) => (
              <div
                className="blocked-period"
                key={period._id}
              >
                <span>
                  {new Date(
                    period.startAt
                  ).toLocaleString()}
                </span>

                <span>→</span>

                <span>
                  {new Date(
                    period.endAt
                  ).toLocaleString()}
                </span>
              </div>
            )
          )}
        </div>
      )}

      {blockedPeriods.length === 0 && (
        <p className="no-blocked-periods">
          No blocked rental periods yet.
        </p>
      )}
    </div>
  );
};

export default AvailabilityPicker;