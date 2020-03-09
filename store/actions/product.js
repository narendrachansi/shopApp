import Product from "../../models/product";

export const DELETE_ITEM='DELETE_ITEM';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const GET_PRODUCT='GET_PRODUCT';

export const deleteItem = (prodId) => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.104/shopApp/index.php',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                prodId,
                action: 'delete'
            })
        });
        const responseData=await response.json();
        dispatch(
            {
                type:DELETE_ITEM,productId:prodId
            }
        );
    };
};

export const getProduct= () => {
    return async dispatch => {
        try{
            const response = await fetch(
                'http://192.168.1.104/shopApp/index.php'
                );
            if(!response.ok){
                throw new Error('Something went wrong. Check provided url link');
            }
                const responseData = await response.json();
                let loadedProducts=[];
           if(responseData.msg!='No data'){
               for(const key in responseData){
                   loadedProducts.push(
                       new Product(
                           key,'u1',responseData[key].title,responseData[key].imageUrl,responseData[key].description,responseData[key].price
                       )
                   );
               }
           }
            dispatch(
                {type:GET_PRODUCT,data:loadedProducts} 
            );
        }catch(err){
            throw err;
        }       
     };
};

export const createProduct = (title,imageUrl,description,price) => {
    return async dispatch => {
        try{
            const response = await fetch(
                'http://192.168.1.104/shopApp/index.php',
                {
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        imageUrl,
                        description,
                        price,
                        action:'add'
                    })
                }
                );
                if(!response.ok){
                    throw new Error('Something went wrong! Check your API link');
                }
                const responseData = await response.json();
            dispatch(
                {type:CREATE_PRODUCT,id:responseData.id,productTitle:title,productImageUrl:imageUrl,productDescription:description,productPrice:price} 
            );
        }catch(err){
            throw err;
        }
    };
    //return {type:CREATE_PRODUCT,productTitle:title,productImageUrl:imageUrl,productDescription:description,productPrice:price};
};

export const updateProduct = (prodId,title,imageUrl,description) => {
    return async dispatch => {
        try{
            const response = await fetch('http://192.168.1.104/shopApp/index.php',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    prodId,
                    title,
                    imageUrl,
                    description,
                    action: 'update'
                })
            });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData=await response.json();
            //console.log(responseData);
            dispatch(
                {
                    type:UPDATE_PRODUCT,productId:prodId, productTitle:title,productImageUrl:imageUrl,productDescription:description
                }
            );
        }catch(err){
            throw err;
        }
    };
};
