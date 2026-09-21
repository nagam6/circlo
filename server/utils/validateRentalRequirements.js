const validateRentalRequirements = ({
  requirement,
  renter,
  startAt,
  endAt,
}) => {
  const errors = [];

  if (!requirement) {
    return {
      valid: true,
      errors,
    };
  }

  if (
    requirement.requireId &&
    !renter?.isVerified
  ) {
    errors.push(
      "Renter must complete ID verification."
    );
  }

  if (
    requirement.minimumRating > 0 &&
    (renter?.rating ?? 0) <
      requirement.minimumRating
  ) {
    errors.push(
      `Renter rating must be at least ${requirement.minimumRating}.`
    );
  }

  if (
    requirement.minimumAge > 0 &&
    (renter?.age ?? 0) <
      requirement.minimumAge
  ) {
    errors.push(
      `Renter must be at least ${requirement.minimumAge} years old.`
    );
  }

  if (
    requirement.maxRentalDays &&
    startAt &&
    endAt
  ) {
    const start = new Date(startAt);
    const end = new Date(endAt);

    const milliseconds =
      end.getTime() - start.getTime();

    const oneDay =
      24 * 60 * 60 * 1000;

    const rentalDays = Math.ceil(
      milliseconds / oneDay
    );

    if (
      rentalDays >
      requirement.maxRentalDays
    ) {
      errors.push(
        `Rental period cannot exceed ${requirement.maxRentalDays} days.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

module.exports = validateRentalRequirements;