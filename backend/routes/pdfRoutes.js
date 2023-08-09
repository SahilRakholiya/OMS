const express=require('express');
const routes=express.Router();
// const fetchAdmin = require('../middle/fetchdata');
const {pdf_download}=require('../controllers/pdfController');

routes.get('/invoice_download/:orderid',pdf_download);

module.exports =routes;