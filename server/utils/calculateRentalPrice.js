const calculateRentalPrice = (
  pricePerDay,
  startAt,
  endAt,
  deposit = 0,
  serviceFeeRate = 0.1
) => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    throw new Error("Invalid rental dates");
  }

  if (end <= start) {
    throw new Error(
      "End date must be after start date"
    );
  }

  if (
    typeof pricePerDay !== "number" ||
    pricePerDay < 0
  ) {
    throw new Error(
      "Invalid daily rental price"
    );
  }

  if (
    typeof deposit !== "number" ||
    deposit < 0
  ) {
    throw new Error(
      "Invalid deposit amount"
    );
  }

  const milliseconds =
    end.getTime() - start.getTime();

  const oneDay =
    24 * 60 * 60 * 1000;

  const rentalDays = Math.ceil(
    milliseconds / oneDay
  );

  const subtotal =
    rentalDays * pricePerDay;

  const serviceFee = Number(
    (subtotal * serviceFeeRate).toFixed(2)
  );

  const total = Number(
    (
      subtotal +
      serviceFee +
      deposit
    ).toFixed(2)
  );

  return {
    rentalDays,
    subtotal,
    serviceFee,
    deposit,
    total,
  };
};

module.exports = calculateRentalPrice;