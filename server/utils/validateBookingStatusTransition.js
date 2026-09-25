const allowedTransitions = {
  pending: ["accepted", "rejected", "cancelled"],
  accepted: ["ready_for_pickup", "cancelled"],
  ready_for_pickup: ["active", "cancelled"],
  active: ["returned"],
  returned: ["inspection"],
  inspection: ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
};

const canTransitionBookingStatus = (
  currentStatus,
  nextStatus
) => {
  const allowed =
    allowedTransitions[currentStatus] || [];

  return allowed.includes(nextStatus);
};

module.exports = {
  allowedTransitions,
  canTransitionBookingStatus,
};