const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = 8080;

const { getSet, getUsers, getUserSets, getLastSetFromUser, createSets, getUserByUsername, deleteSets,
    getAllExerciseGroupsFromUser, createExerciseGroup, deleteExerciseGroup, addExerciseToExerciseGroup,
    removeExerciseFromExerciseGroup } = require('./database/database.js');

app.use(helmet());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`app running at ${PORT}`);
});


app.route('/')
    .get(async (req, res) => {
        res.status(200).send('recieved')
    })


app.get('/users', async (req, res) => {
    users = await getUsers();
    res.status(200).send(users);
})


app.route('/:username/sets')
    .get(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        if (user === 0) {
            res.status(404).send({});
        }
        else {
            const sets = await getUserSets(user.id);
            res.send(sets)
        }
    })
    .post(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        const { exercise_id, current_set, reps, current_weight, timestamp } = req.body;
        const set = await createSets(user.id, exercise_id, current_set, reps, current_weight, timestamp);
        res.send(set).status(201);
    })
    .delete(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        const set_id = req.body.set_id; const user_id = user.id;
        const set = await deleteSets(set_id, user_id);
        if (set === 0) {
            res.status(404).send({});
        }
        else {
            res.status(201).send({});
        }
    })


app.route('/:username/egroups')
    .get(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        if (user === 0) {
            res.status(404).send({});
        }
        else {
            const eg = await getAllExerciseGroupsFromUser(user.id);
            res.send(eg);
        }
    })
    .post(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        const { group_name, exercises_id, is_public } = req.body;
        const eg = await createExerciseGroup(group_name, user.id, exercises_id, is_public);
        res.status(201).send(eg);
    })
    .delete(async (req, res) => {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        const eg_id = req.body.eg_id;
        const eg = await deleteExerciseGroup(eg_id, user.id);
        if (eg === 0) {
            res.status(404).send({});
        }
        else {
            res.status(201).send({});
        }
    })

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});