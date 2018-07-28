const express = require('express');
const path = require('path');
const data = require('./public/data/texts.json');
const { teachers } = require('./public/data/site');
const app = express();

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('view-index', {
    data,
    teachers
  });
});

app.get('/cursos/:course', function (req, res) {
  const courseId = req.params.course;
  res.render('view-course', data.courses.find(course => course.courseId === courseId))
});

app.all('*', (req, res) => {
  res.send(`404 View!`);
 });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;