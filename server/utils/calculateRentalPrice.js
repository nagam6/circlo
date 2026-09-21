const calculateRentalPrice = (
  pricePerDay,
  startAt,
  endAt
) => {
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Invalid rental dates");
  }

  if (end <= start) {
    throw new Error("End date must be after start date");
  }

  if (
    typeof pricePerDay !== "number" ||
    pricePerDay < 0
  ) {
    throw new Error("Invalid daily rental price");
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

  return {
    rentalDays,
    subtotal,
  };
};

module.exports = calculateRentalPrice;