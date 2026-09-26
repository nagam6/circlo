const OwnerDashboardPage = () => {
  return (
    <main className="owner-dashboard-page">
      <div className="owner-dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            Owner dashboard
          </p>

          <h1>Manage your rentals</h1>

          <p>
            Track listings, requests, and active rentals
            from one place.
          </p>
        </div>
      </div>

      <section className="dashboard-stats">
        <article className="dashboard-stat-card">
          <span>Listings</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-stat-card">
          <span>Pending requests</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-stat-card">
          <span>Active rentals</span>
          <strong>0</strong>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>Recent activity</h2>
        </div>

        <div className="dashboard-empty-state">
          <p>No recent activity yet.</p>
        </div>
      </section>
    </main>
  );
};

export default OwnerDashboardPage;