type RentalRequestConfirmationProps = {
  title: string;
  pricePerDay: number;
  deposit: number;
  startAt: string;
  endAt: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

const RentalRequestConfirmation = ({
  title,
  pricePerDay,
  deposit,
  startAt,
  endAt,
  onConfirm,
  onCancel,
  loading = false,
}: RentalRequestConfirmationProps) => {

  const start = new Date(startAt);
  const end = new Date(endAt);

  const oneDay = 24 * 60 * 60 * 1000;

  const rentalDays = Math.ceil(
    (end.getTime() - start.getTime()) / oneDay
  );

  const subtotal = rentalDays * pricePerDay;

  const serviceFee = Number(
    (subtotal * 0.1).toFixed(2)
  );

  const total = Number(
    (subtotal + serviceFee + deposit).toFixed(2)
  );

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <div className="confirmation-header">
          <div>
            <p className="confirmation-label">
              Rental Request
            </p>

            <h2>Confirm your request</h2>
          </div>

          <button
            type="button"
            className="confirmation-close"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <h3>{title}</h3>

        <div className="confirmation-dates">
          <div>
            <span>Start</span>
            <strong>{start.toLocaleString()}</strong>
          </div>

          <div>
            <span>End</span>
            <strong>{end.toLocaleString()}</strong>
          </div>
        </div>

        <div className="price-summary">
          <div>
            <span>
              ₪{pricePerDay} × {rentalDays} day
              {rentalDays !== 1 ? "s" : ""}
            </span>
            <strong>₪{subtotal}</strong>
          </div>

          <div>
            <span>Service fee</span>
            <strong>₪{serviceFee}</strong>
          </div>

          <div>
            <span>Refundable deposit</span>
            <strong>₪{deposit}</strong>
          </div>

          <div className="price-total">
            <span>Amount due now</span>
            <strong>₪{total}</strong>
          </div>
        </div>

        <p className="deposit-note">
          The deposit is refundable after the item
          is returned and passes inspection.
        </p>

        <div className="confirmation-actions">
          <button
            type="button"
            className="secondary-confirmation-button"
            onClick={onCancel}
          >
            Go Back
          </button>

    <button
  type="button"
  className="primary-confirmation-button"
  onClick={onConfirm}
  disabled={loading}
>
  {loading
    ? "Sending Request..."
    : "Confirm Rental Request"}
</button>
        </div>
      </div>
    </div>
  );
};

export default RentalRequestConfirmation;