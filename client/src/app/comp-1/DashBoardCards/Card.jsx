"use client"
import React from "react";

export default function DashboardCard({ title, value, icon }) {
    return (
        <div className="card">
            <div className="card-header">
                <h3>{title}</h3>
                {icon && <div className="icon">{icon}</div>}
            </div>
            <div className="card-value">{value}</div>

            <style jsx>{`
        .card {
          background-color: #ffffff;
            width:250px;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-2px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        h3 {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #111827;
        }

        .icon {
          font-size: 24px;
          color: #3b82f6;
        }

        .card-value {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 24px;
          color: #111827;
        }
      `}</style>
        </div>
    );
}