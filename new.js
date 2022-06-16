
fetchdata();


  async function fetchdata(){
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data =await response.json();
    //console.log(data);
    const Details=data["products"];
    /*for(let i=1;i<10;i++){
      let elem= document.createElement('img');
      elem.src=Details[i]["thumbnail"];
      //document.getElementById('element').appendChild(elem);
    }*/
    let category=[];//To get unique category
    let brand=[];//To get uniqe brand

    function createproduct(Products){
      for(let i=0;i<Products.length;i++){
        let card = document.createElement('div');


        let  img= document.createElement('img');
        img.src=Products[i]["thumbnail"];

        card.appendChild(img);
        let title=document.createElement('h3');
        title.innerText=Products[i]["title"];
        card.appendChild(title);

        let price = document.createElement('h3');
        price.innerText="$ "+Products[i]["price"];
        price.classList.add('prodPrice');
        price.style.color="red";
        card.appendChild(price);

        let stock = document.createElement('h4');
        if(Products[i]["stock"]<50){
          stock.innerText=`"hurry! only a few items left".`;
          stock.style.color="red";
        }
        else{
          stock.innerText=`Available`;
          stock.style.color="green";
        }
        card.appendChild(stock);

        //rating Working
        let rating = document.createElement('h3');
        rating.classList.add('prodRating');
        rating.innerText=`${Products[i]["rating"]}`;
        rating.style.color="Gold";
        card.appendChild(rating);

        //discountPercentage
        let discount = document.createElement('h3');
        discount.classList.add('prodDiscount');
        discount.innerText=`${Products[i]["discountPercentage"]} % OFF`;
        discount.style.color="Green";
        card.appendChild(discount);

        //Add to cart button element create
        let button = document.createElement('button');
        button.value ="Add to Cart";
        button.classList.add('addToCart');
        button.innerText="Add To Cart";
        button.setAttribute('style',"border: 2px solid #6759ff;border-radius: 5px;background-color: transparent;color:Blue;cursor: pointer;");

        card.appendChild(button);

        //category
        let category = document.createElement('h3');
        category.classList.add('prodCategory');
        category.innerText=`${Products[i]["category"]}`;
        category.style.display="none";
        card.appendChild(category);
        //brand
        let brand = document.createElement('h3');
        brand.classList.add('prodBrand');
        brand.innerText=`${Products[i]["brand"]}`;
        brand.style.display="none";
        card.appendChild(brand);



        document.getElementById('products').appendChild(card);
      }


    }


    function addlist(Products){

      Products.forEach((item)=>{
        if(!category.includes(item.category)){
          category.push(item.category);
        }
      });
      Products.forEach((item)=>{
        if(!brand.includes(item.brand)){
          brand.push(item.brand);
        }
      })
    }


    function createFilters(){
      //first
      let ratings = document.querySelector('#ratings');
      ratings.style.border="1px solid black";
      let discount = document.querySelector('#discount');
      discount.style.border="1px solid black";
      let price = document.querySelector('#price');
      price.style.border="1px solid black";
      let count=0;
      //sorting product with ratings
      ratings.addEventListener('change',(event)=>{
        let AllProduct=document.querySelectorAll('.prodRating');
        for(let prod of AllProduct){
          if(prod.innerText>=event.target.value){
            prod.parentNode.style.display="block";

          }
          else{
            prod.parentNode.style.display="none";
          }
        }
      });

      //sorting Products with discount
      discount.addEventListener('change',(event)=>{
        let disProduct=document.querySelectorAll('.prodDiscount');
        for(let prod of disProduct){
          let newVal=prod.innerText.split('.');
          let val=newVal[0];
          val = Number(val);
          if(val>event.target.value && val <((event.target.value)+10)){
            prod.parentNode.style.display="block";
          }
          else{
            prod.parentNode.style.display="none";
          }
        }

      });
      //sorting Products with price
      price.addEventListener('change',(event)=>{
        let priceProduct=document.querySelectorAll('.prodPrice');
        for(let prod of priceProduct){
          let newVal=prod.innerText.split(' ');
          val = newVal[1];
          val = Number(val);
          if(val>event.target.value && val <((event.target.value)+1000)){
            prod.parentNode.style.display="block";
          }
          else{
            prod.parentNode.style.display="none";

          }
      }
    });

    }
      createproduct(Details);
    addlist(Details);
    //adding total brands to the list
    let brandList=document.querySelector('#brand');
    brandList.style.border="1px solid black";
    for(let i=0;i<brand.length;i++){
      let item=document.createElement('option');
      item.value=brand[i];
      item.innerText=`${brand[i]}`;
      brandList.appendChild(item);
    }
    //filter products with brand name

    let brands =document.querySelector('#brand');
    brands.addEventListener('change',(event)=>{
      let brandProduct=document.querySelectorAll('.prodBrand');
        for(let item of brandProduct){
          if(item.innerText==event.target.value){
            item.parentNode.style.display="block";

          }
          else{
            item.parentNode.style.display="none";
          }
        }
    });


    //filter products with category
    let cat = document.querySelector('#category');
    cat.addEventListener('change',(event)=>{
      let catProduct=document.querySelectorAll('.prodCategory');
        for(let item of catProduct){
          if(item.innerText==event.target.value){
            item.parentNode.style.display="block";

          }
          else{
            item.parentNode.style.display="none";
          }
        }
    });

    //addinng total categories to the category list for filter
    let categoryList=document.querySelector('#category');
    categoryList.style.border="1px solid black";
    for(let i=0;i<category.length;i++){
      let item=document.createElement('option');
      item.value=category[i];
      item.innerText=`${category[i]}`;
      categoryList.appendChild(item);
    }
    createFilters(Details);
  }
