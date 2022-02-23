import fetch from  'node-fetch';
import express from 'express';
const app = express();

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', 'views');

app.listen(port, console.log(`Listening on ${port}`));

app.get(['/search', 'home/search'], async (req, response) => {
    if(req.query.hasOwnProperty('q')){
        let results = await fetch('https://dummyjson.com/products/search?q='+req.query.q)
                            .then(res => res.json())
                            .then(res => response.render('index', { products: res.products, categories: null }));
    }
        
});
app.get(['/:prod_id?', 'home/:prod_id?'], async (req, response) => {
    let categories = await fetch('https://dummyjson.com/products/categories').then(res => res.json()).then(res => res.slice(0, 7));
    if(req.params.prod_id) {
        fetch('https://dummyjson.com/products/'+req.params.prod_id)
        .then(res => res.json())
        .then(res => response.render('product-details', { product: res, categories: categories }));
    }
    else{
        fetch('https://dummyjson.com/products/')
        .then(res => res.json())
        .then(res => response.render('index', { products: res.products, categories: categories }));
    }
});


