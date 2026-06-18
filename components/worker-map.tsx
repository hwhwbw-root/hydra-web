"use client";

import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Worker } from "@/lib/mock/types";
import { TEAM_MAP } from "@/lib/mock/teams";
import { initials } from "@/lib/utils";

const STATUS_COLOR: Record<Worker["status"], string> = {
  online: "#16a37a",
  idle: "#d99318",
  offline: "#a09bac",
};

function pinIcon(worker: Worker): L.DivIcon {
  const accent = TEAM_MAP[worker.teamId]?.accent ?? "#6e56cf";
  const status = STATUS_COLOR[worker.status];
  const html = `
    <div style="position:relative;width:38px;height:38px;">
      <div style="
        width:38px;height:38px;border-radius:50% 50% 50% 8px;
        transform:rotate(-45deg);
        background:linear-gradient(135deg, ${accent}, ${accent}cc);
        box-shadow:0 6px 14px -4px ${accent}cc, inset 0 1px 0 rgba(255,255,255,.35);
        display:grid;place-items:center;">
        <span style="transform:rotate(45deg);color:#fff;font:600 12px/1 var(--font-sans),sans-serif;letter-spacing:.02em;">
          ${initials(worker.name)}
        </span>
      </div>
      <span style="
        position:absolute;top:-2px;right:-2px;width:11px;height:11px;border-radius:50%;
        background:${status};border:2px solid #fff;box-shadow:0 1px 2px rgba(0,0,0,.25);"></span>
    </div>`;
  return L.divIcon({
    html,
    className: "hydra-pin",
    iconSize: [38, 38],
    iconAnchor: [19, 34],
    popupAnchor: [0, -32],
  });
}

function FitBounds({ workers }: { workers: Worker[] }) {
  const map = useMap();
  useEffect(() => {
    if (workers.length === 0) return;
    if (workers.length === 1) {
      const w = workers[0];
      map.setView([w.location.lat, w.location.lng], 15, { animate: false });
      return;
    }
    const bounds = L.latLngBounds(
      workers.map((w) => [w.location.lat, w.location.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 14, animate: false });
  }, [map, workers]);
  return null;
}

export function WorkerMap({
  workers,
  showTrails = false,
  className,
}: {
  workers: Worker[];
  showTrails?: boolean;
  className?: string;
}) {
  return (
    <MapContainer
      center={[3.139, 101.687]}
      zoom={12}
      scrollWheelZoom
      zoomControl={false}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds workers={workers} />

      {showTrails &&
        workers.map((w) => {
          const accent = TEAM_MAP[w.teamId]?.accent ?? "#6e56cf";
          return (
            <Polyline
              key={`trail-${w.id}`}
              positions={w.trail.map((p) => [p.lat, p.lng] as [number, number])}
              pathOptions={{
                color: accent,
                weight: 3,
                opacity: 0.65,
                dashArray: "1 8",
                lineCap: "round",
              }}
            />
          );
        })}

      {workers.map((w) => {
        const team = TEAM_MAP[w.teamId];
        return (
          <Marker
            key={w.id}
            position={[w.location.lat, w.location.lng]}
            icon={pinIcon(w)}
          >
            <Popup>
              <div style={{ minWidth: 168 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
                  {w.name}
                </p>
                <p style={{ margin: "2px 0 8px", fontSize: 12, color: "#76727f" }}>
                  {team?.name} team · {w.role}
                </p>
                <Link
                  href={`/dashboard/workers/${w.id}`}
                  style={{
                    color: "#6e56cf",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  View detail →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
