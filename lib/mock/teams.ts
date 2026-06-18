import type { Team } from "./types";

/*
  One organization ("Hydra"), four teams: Adia A, Adia B, Meranti, Premix.
  Each team carries an on-brand accent in the violet/indigo family so map
  pins read distinctly without leaving the purple identity.
*/
export const TEAMS: Team[] = [
  {
    id: "adia-a",
    name: "Adia A",
    accent: "#6e56cf",
    focus: "Inspections — Central",
    lead: "Suhana Maarof",
  },
  {
    id: "adia-b",
    name: "Adia B",
    accent: "#5b6ee0",
    focus: "Installations — North",
    lead: "Daniyal Hakim",
  },
  {
    id: "meranti",
    name: "Meranti",
    accent: "#9d5bd2",
    focus: "Maintenance — East",
    lead: "Pavithra Nair",
  },
  {
    id: "premix",
    name: "Premix",
    accent: "#5c7cea",
    focus: "Surveys — South",
    lead: "Marcus Anandan",
  },
];

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t]),
);

export function getTeam(id: string): Team | undefined {
  return TEAM_MAP[id];
}
