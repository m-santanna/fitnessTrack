const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, {ssl: 'require'});


export async function getSet(set_id) {
    const [set] = await sql`SELECT * FROM sets WHERE id = ${set_id}`;
    console.log(set.user_id);
    return set;
}

export async function getUserSets(user_id) {
    const sets = await sql`SELECT * FROM sets WHERE user_id = ${user_id}`;
    console.log(sets);
    return sets;
}

export async function createSets(user_id, exercise_id, current_set, reps, current_weight) {
    const insertion = await sql`INSERT INTO sets (user_id, exercise_id, current_set, reps, current_weight)
     VALUES (${user_id}, ${exercise_id}, ${current_set}, ${reps}, ${current_weight})`;
}