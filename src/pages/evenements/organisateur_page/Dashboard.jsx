import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import fetchApi from "../../../helpers/fetchApi";

/**
 * Dashboard pour l'organisateur - PrimeReact uniquement
 *
 * - récupère des données via fetchApi (endpoints fictifs -> à adapter)
 * - affiche : stats, chart, liste des événements récents
 */

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    ticketsSold: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Exemple d'appels — adapte les routes backend réelles
      // const statsRes = await fetchApi('/organizer/stats'); // { totalEvents, ticketsSold, revenue }
      // const chartRes = await fetchApi('/organizer/sales/last30'); // { labels: [], data: [] }
      // const eventsRes = await fetchApi('/organizer/events/recent'); // [{id, name, date, tickets_sold, revenue}, ...]

      // temporary: mock data so UI works out of the box
      const statsRes = {
        totalEvents: 8,
        ticketsSold: 1240,
        revenue: 5423000,
      };

      const chartRes = {
        labels: Array.from({ length: 7 }).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d.toLocaleDateString();
        }),
        data: [120, 180, 95, 210, 250, 200, 185],
      };

      const eventsRes = [
        { id: 1, name: "Concert A", date: "2025-09-01", tickets_sold: 120, revenue: 60000 },
        { id: 2, name: "Match B", date: "2025-08-30", tickets_sold: 400, revenue: 200000 },
        { id: 3, name: "Festival C", date: "2025-08-22", tickets_sold: 300, revenue: 150000 },
      ];

      // set states from responses (or mocks)
      setStats({
        totalEvents: statsRes.totalEvents,
        ticketsSold: statsRes.ticketsSold,
        revenue: statsRes.revenue,
      });

      setChartData({
        labels: chartRes.labels,
        datasets: [
          {
            label: "Tickets vendus",
            backgroundColor: "rgba(99,102,241,0.2)", // violet-ish
            borderColor: "rgba(99,102,241,1)",
            data: chartRes.data,
            fill: true,
            tension: 0.3,
          },
        ],
      });

      setRecentEvents(eventsRes);
    } catch (err) {
      console.error("Erreur dashboard:", err);
      // tu peux setToastAction ici pour afficher l'erreur via toast
    } finally {
      setLoading(false);
    }
  };

  // format euro / local currency as you want
  const formatCurrency = (v) => {
    try {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(v / 100);
    } catch {
      return v;
    }
  };

  // card layout
  const StatCard = ({ title, value, sub, icon }) => (
    <Card className="stat-card">
      <div className="stat-card-inner">
        <div className="stat-left">
          <div className="stat-value">{value}</div>
          <div className="stat-sub">{sub}</div>
        </div>
        <div className="stat-icon">{icon}</div>
      </div>
    </Card>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Tableau de bord</h2>
        <div>
          <Button label="Rafraîchir" icon="pi pi-refresh" onClick={loadData} className="p-button-text" />
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {loading ? (
          <>
            <Skeleton width="100%" height="80px" />
            <Skeleton width="100%" height="80px" />
            <Skeleton width="100%" height="80px" />
          </>
        ) : (
          <>
            <StatCard
              title="Total événements"
              value={stats.totalEvents}
              sub="Événements actifs"
              icon={<i className="pi pi-calendar stat-icon-inner" />}
            />
            <StatCard
              title="Tickets vendus"
              value={stats.ticketsSold}
              sub="Total tickets"
              icon={<i className="pi pi-ticket stat-icon-inner" />}
            />
            <StatCard
              title="Revenus"
              value={formatCurrency(stats.revenue)}
              sub="Total perçu"
              icon={<i className="pi pi-dollar stat-icon-inner" />}
            />
          </>
        )}
      </div>

      {/* Chart + recent events */}
      <div className="grid-two-columns">
        <div className="chart-card">
          <Card title="Ventes - dernière période">
            {loading || !chartData ? (
              <Skeleton width="100%" height="220px" />
            ) : (
              <Chart type="line" data={chartData} options={{ maintainAspectRatio: false }} style={{ minHeight: "240px" }} />
            )}
          </Card>
        </div>

        <div className="card-recent">
          <Card title="Événements récents">
            {loading ? (
              <>
                <Skeleton width="100%" height="20px" className="mb-2" />
                <Skeleton width="100%" height="20px" className="mb-2" />
                <Skeleton width="100%" height="20px" />
              </>
            ) : (
              <DataTable value={recentEvents} paginator={false} responsiveLayout="scroll" className="p-datatable-sm">
                <Column field="name" header="Nom" />
                <Column field="date" header="Date" />
                <Column field="tickets_sold" header="Tickets" />
                <Column body={(row) => formatCurrency(row.revenue)} header="Revenu" />
              </DataTable>
            )}
          </Card>
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Button label="Voir tous les événements" className="p-button-outlined" onClick={() => { /* navigate */ }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
