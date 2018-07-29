const express = require('express');
const path = require('path');
const data = require('./public/data/texts.json');
const { appData, courses, teachers } = require('./public/data/site');
const app = express();

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('view-index', {
    appData,
    courses,
    teachers,
    data,
  });
});

app.get('/cursos/:id', (req, res) => {
  const id = req.params.id;
  const courseData = courses.find(course => course.id === id);
  if (!courseData) res.redirect('/');
  res.render('view-course', { appData, courseData });
});

app.all('*', (req, res) => {
  res.send(`404 View!`);
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;