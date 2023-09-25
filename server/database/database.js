const postgres = require('postgres');
const dotenv = require('dotenv');
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: 'require' });


async function getSet(set_id) {
    const [set] = await sql`SELECT * FROM sets WHERE id = ${set_id}`;
    if (set === undefined) {
        return 0;
    }
    return set;
}

async function getUsers() {
    const users = await sql`SELECT * FROM users`;
    return users;
}

async function getUserSets(user_id) {
    const sets = await sql`SELECT * FROM sets WHERE user_id = ${user_id}`;
    if (sets === undefined) {
        return 0;
    }
    return sets;
}

async function getLastSetFromUser(user_id) {
    const sets = await getUserSets(user_id);
    const length = Object.keys(sets).length;
    const set = sets[length - 1];
    if (set === undefined) {
        return 0;
    }
    return set;
}

async function createSets(user_id, exercise_id, current_set, reps, current_weight, timestamp) {
    const insertion = await sql`INSERT INTO sets (user_id, exercise_id, current_set, reps, current_weight, timestamp)
    VALUES (${user_id}, ${exercise_id}, ${current_set}, ${reps}, ${current_weight}, ${timestamp})`;
    return getLastSetFromUser(user_id);
}

async function deleteSets(set_id, user_id) {
    const set = await getSet(set_id);
    if (set === 0) {
        return 0;
    }
    const del = await sql`DELETE FROM sets WHERE id = ${set_id} AND user_id = ${user_id}`;
    return 1;
}


async function getUserByUsername(username) {
    const [user] = await sql`SELECT * FROM users WHERE username = ${username}`;
    if (user === undefined) {
        return 0;
    }
    return user;
}

async function getAllExerciseGroupsFromUser(user_id) {
    const all_eg = await sql`SELECT * FROM egroups WHERE user_id = ${user_id}`;
    if (all_eg === undefined) {
        return 0;
    }
    return all_eg;
}

async function getLastExerciseGroupFromUser(user_id) {
    const exercise_groups = await getAllExerciseGroupsFromUser(user_id);
    const length = Object.keys(exercise_groups).length;
    const eg = exercise_groups[length - 1];
    if (eg === undefined) {
        return 0;
    }
    return eg;
}

async function createExerciseGroup(group_name, user_id, exercises_id, is_public) {
    const group = await sql`INSERT INTO egroups (group_name, user_id, exercises_id, is_public)
    VALUES (${group_name}, ${user_id}, ${exercises_id}, ${is_public})`;
    return getLastExerciseGroupFromUser(user_id);
}

async function deleteExerciseGroup(eg_id, user_id) {
    const group = await sql`SELECT * FROM egroups WHERE id = ${eg_id} AND user_id = ${user_id}`;
    if (group === undefined) {
        return 0;
    }
    const del = await sql`DELETE FROM egroups WHERE id = ${eg_id} AND user_id = ${user_id}`;
    return 1;
}

async function addExerciseToExerciseGroup(user_id, group_name, exercise_id) {
    const update = await sql`UPDATE egroups SET exercises_id = ARRAY_APPEND(exercises_id, ${exercise_id})
    WHERE (group_name = ${group_name} AND user_id = ${user_id});`;
}
    
async function removeExerciseFromExerciseGroup(user_id, group_name, exercise_id) {
    const update = await sql`UPDATE egroups SET exercises_id = ARRAY_REMOVE(exercises_id, ${exercise_id})
    WHERE (group_name = ${group_name} AND user_id = ${user_id});`;
}

module.exports = { getSet, getUsers, getUserSets, getLastSetFromUser, createSets, getUserByUsername, deleteSets,
    getAllExerciseGroupsFromUser, getLastExerciseGroupFromUser, createExerciseGroup, deleteExerciseGroup,
    addExerciseToExerciseGroup, removeExerciseFromExerciseGroup };