
// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');

const Cat = models.Cat;

// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

//Client->Nodecode->DB
//making something that can be added to a database but not adding it yet
let lastAdded = new Cat(defaultData);

const hostIndex = (req, res) => {
  //give the data to the handlebars page
  res.render('index', {
    currentName: lastAdded.name,
    title: 'Home',
    pageName: 'Home Page'
  });
};

const hostPage1 = async (req, res) => {
  try{
    //try to get a bunch of cats back from db, find takes in querys, officially fire request with exec 
    const docs = await Cat.find({}).exec();

    //render the right handlebar and give it what it is looking for
    return res.render('page1',{cats:docs});
  }
  catch(err){
    //in case database kicks the pooper
    console.log(err);
    return res.status(500).json({error:'Failure to retrieve cat data'});
  }
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const getName = (req, res) => {
  return res.json({name:lastAdded.name});
};

const setName = async (req, res) => {
  //make sure they sent in all the information
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
  }

  //make a cat object
  const catData={
    name:`${req.body.firstname} ${req.body.lastname}`,
    bedsOwned: req.body.beds,
  };

  //put it into the correct format for the database
  const newCat= new Cat(catData);

  //interacting with database put it in a try catch
  try{
    //already in the right format for the database so it has the save function, and itll send it to the db
    //it will add it if not added already, and update if not based on an _ID value
    await newCat.save();
  }catch(err){

  }
  
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }
};

const updateLast = (req, res) => {
	
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  getName,
  setName,
  updateLast,
  searchName,
  notFound,
};
