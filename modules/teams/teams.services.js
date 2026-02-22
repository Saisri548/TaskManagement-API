import pool from "../../src/config/db.js";

// ---------- CREATE TEAM ----------
export const createTeam = async ({ name, organization_id }) => {
  // Check if organization exists
  const orgCheck = await pool.query(
    `SELECT id FROM organisations WHERE id=$1`,
    [organization_id]
  );
  if (orgCheck.rows.length === 0) {
    throw new Error("Organization doesn't exist");
  }

  // Insert team
  const result = await pool.query(
    `INSERT INTO teams(name, organization_id) VALUES($1, $2) 
     RETURNING id, name, organization_id, created_at`,
    [name, organization_id]
  );
  return result.rows[0];
};

// ---------- GET TEAMS BY ORGANIZATION ----------
export const getTeamsOrg = async (organization_id) => {
  const result = await pool.query(
    `SELECT * FROM teams WHERE organization_id=$1`,
    [organization_id]
  );
  return result.rows;
};

// ---------- UPDATE TEAM ----------
export const updateTeam = async (team_id, name) => {
  const result = await pool.query(
    `UPDATE teams SET name=$1 WHERE id=$2 RETURNING id, name, organization_id`,
    [name, team_id]
  );

  if (result.rows.length === 0) throw new Error("Team not found");

  return result.rows[0];
};

// ---------- DELETE TEAM ----------
export const deleteTeam = async (team_id) => {
  const result = await pool.query(
    `DELETE FROM teams WHERE id=$1 RETURNING id`,
    [team_id]
  );

  if (result.rows.length === 0) throw new Error("Team not found");

  return { success: true, message: "Team deleted successfully" };
};

// ---------- ADD TEAM MEMBER ----------
export const addTeamMember = async ({ team_id, user_id, team_role }) => {
  const teamCheck = await pool.query(`SELECT id FROM teams WHERE id=$1`, [
    team_id,
  ]);
  const userCheck = await pool.query(`SELECT id FROM users WHERE id=$1`, [
    user_id,
  ]);

  if (teamCheck.rows.length === 0 || userCheck.rows.length === 0) {
    throw new Error("Team or User does not exist");
  }

  const result = await pool.query(
    `INSERT INTO team_members(team_id, user_id, team_role) 
     VALUES($1, $2, $3) 
     RETURNING team_id, user_id, team_role, joined_at`,
    [team_id, user_id, team_role]
  );

  return result.rows[0];
};

// ---------- REMOVE TEAM MEMBER ----------
export const deleteTeamMember = async ({ team_id, user_id }) => {
  const result = await pool.query(
    `DELETE FROM team_members 
     WHERE team_id=$1 AND user_id=$2 
     RETURNING team_id, user_id`,
    [team_id, user_id]
  );

  if (result.rows.length === 0)
    throw new Error("Team member not found in team");

  return { success: true, message: "Member removed from team" };
};

// ---------- GET TEAM MEMBERS ----------
export const getTeamMembers = async (team_id) => {
  const result = await pool.query(
    `SELECT tm.team_id, u.id AS user_id, u.name, u.email, tm.team_role, tm.joined_at
     FROM team_members tm
     JOIN users u ON tm.user_id = u.id
     WHERE tm.team_id=$1`,
    [team_id]
  );

  return result.rows;
};
