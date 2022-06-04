const url = "http://127.0.0.1:3000"

describe('Nutrecipe API', () => {

    context('Recipes', () => {

        it('should the number of recipes in the database', () => {
            cy.request({
                method: 'GET',
                url: `${url}/recipes/size`
            })
                .should((response) => {
                    const res = response.body
                                        
                    expect(response.status).to.eq(200)
                    expect(res.nbElem).to.be.greaterThan(0)
                });
        });

        it('should return all recipes', () => {
            cy.request({
                method: 'GET',
                url: `${url}/recipes`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                    expect(res.length).to.be.greaterThan(0)
                });
        });

        it('should return recipes for pagination (20 recipes)', () => {
            cy.request({
                method: 'POST',
                url: `${url}/recipes/pagination`,
                body:
                {
                    "pageIndex":0,
                    "pageSize":20
                }
            })
                .should((response) => {
                    const res = response.body
                                
                    expect(response.status).to.eq(200)
                    expect(res.length).to.be.equal(20)
                });
        });

        it('should create a recipe and return the created recipe', () => {
            cy.request({
                method: 'POST',
                url: `${url}/recipes`,
                body:
                {
                    "title":"title",
                    "prep_time":"prep_time",
                    "cooking_time":"cooking_time",
                    "rest_time":"rest_time",
                    "categories":"categories",
                    "ingredients_list":"ingredients_list",
                    "serving_size":"serving_size",
                    "instructions":"instructions",
                    "image":"image"
                }
            })
                .should((response) => {
                    const res = response.body
    
                    expect(response.status).to.eq(201)
                    expect(res).to.have.property('recipeId')
                    expect(res).to.have.property('title')
                    expect(res).to.have.property('cooking_time')
                    expect(res).to.have.property('prep_time')
                    expect(res).to.have.property('rest_time')
                    expect(res).to.have.property('ingredients_list')
                    expect(res).to.have.property('instructions')
                    expect(res).to.have.property('serving_size')
                    expect(res).to.have.property('categories')
                    expect(res).to.have.property('image')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });

        it('should update a recipe', () => {
            cy.request({
                method: 'PUT',
                url: `${url}/recipes/2209`,
                body:
                {
                    "title":"another title",
                    "prep_time":"another prep_time",
                    "cooking_time":"another cooking_time",
                    "rest_time":"another rest_time",
                    "categories":"another categories",
                    "ingredients_list":"another ingredients_list",
                    "serving_size":"another serving_size",
                    "instructions":"another instructions",
                    "image":"another image"
                }
            })
                .should((response) => {
                    expect(response.status).to.eq(202)
                });
        });

        it('should return a single recipe', () => {
            cy.request({
                method: 'GET',
                url: `${url}/recipes/1`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                    expect(res).to.have.property('recipeId')
                    expect(res).to.have.property('title')
                    expect(res).to.have.property('cooking_time')
                    expect(res).to.have.property('prep_time')
                    expect(res).to.have.property('rest_time')
                    expect(res).to.have.property('ingredients_list')
                    expect(res).to.have.property('instructions')
                    expect(res).to.have.property('serving_size')
                    expect(res).to.have.property('categories')
                    expect(res).to.have.property('image')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });

        it('should delete a recipe', () => {
            cy.request({
                method: 'DELETE',
                url: `${url}/recipes/2209`
            })
                .should((response) => {
                    const res = response.body
                            
                    expect(response.status).to.eq(204)
                    expect(res.length).to.be.equal(0)
                });
        });
    });



    context('Ingredients', () => {

        it('should the number of ingredients in the database', () => {
            cy.request({
                method: 'GET',
                url: `${url}/ingredients/size`
            })
                .should((response) => {
                    const res = response.body
                                        
                    expect(response.status).to.eq(200)
                    expect(res.nbElem).to.be.greaterThan(0)
                });
        });


        it('should return ingredients for pagination (20 ingredients)', () => {
            cy.request({
                method: 'POST',
                url: `${url}/ingredients/pagination`,
                body:
                {
                    "pageIndex":0,
                    "pageSize":20
                }
            })
                .should((response) => {
                    const res = response.body
                                
                    expect(response.status).to.eq(200)
                    expect(res.length).to.be.equal(20)
                });
        });

        it('should create a recipe and return the created ingredient', () => {
            cy.request({
                method: 'POST',
                url: `${url}/ingredients`,
                body:
                {
                    "product_name":"product_name",
                    "ingredient_text":"ingredient_text",
                    "carbohydrates":1.1,
                    "proteins":2.2,
                    "fats":3.3,
                    "salt":4.4,
                    "calories":5.5,
                    "nova_group":2,
                    "categories":"categories",
                    "serving_size":"serving_size",
                    "image":"image"
                }
            })
                .should((response) => {
                    const res = response.body
    
                    expect(response.status).to.eq(201)
                    expect(res).to.have.property('ingredientId')
                    expect(res).to.have.property('product_name')
                    expect(res).to.have.property('ingredient_text')
                    expect(res).to.have.property('carbohydrates')
                    expect(res).to.have.property('proteins')
                    expect(res).to.have.property('fats')
                    expect(res).to.have.property('salt')
                    expect(res).to.have.property('calories')
                    expect(res).to.have.property('nova_group')
                    expect(res).to.have.property('categories')
                    expect(res).to.have.property('serving_size')
                    expect(res).to.have.property('image')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });


        it('should update a ingredient', () => {
            cy.request({
                method: 'PUT',
                url: `${url}/ingredients/15718`,
                body:
                {
                    "product_name":"another product_name",
                    "ingredient_text":"another ingredient_text",
                    "carbohydrates":1.0,
                    "proteins":1.0,
                    "fats":1.0,
                    "salt":1.0,
                    "calories":1.0,
                    "nova_group":4,
                    "categories":"another categories",
                    "serving_size":"another serving_size",
                    "image":"another image"
                }
            })
                .should((response) => {
                    expect(response.status).to.eq(202)
                });
        });

        it('should return a single ingredient', () => {
            cy.request({
                method: 'GET',
                url: `${url}/ingredients/1`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                    expect(res).to.have.property('ingredientId')
                    expect(res).to.have.property('product_name')
                    expect(res).to.have.property('ingredient_text')
                    expect(res).to.have.property('carbohydrates')
                    expect(res).to.have.property('proteins')
                    expect(res).to.have.property('fats')
                    expect(res).to.have.property('salt')
                    expect(res).to.have.property('calories')
                    expect(res).to.have.property('nova_group')
                    expect(res).to.have.property('categories')
                    expect(res).to.have.property('serving_size')
                    expect(res).to.have.property('image')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });

        it('should delete a ingredient', () => {
            cy.request({
                method: 'DELETE',
                url: `${url}/ingredients/15718`
            })
                .should((response) => {
                    const res = response.body
                            
                    expect(response.status).to.eq(204)
                    expect(res.length).to.be.equal(0)
                });
        });
    });




    context('Users', () => {
        
        it('should create a user and return the created user', () => {
            cy.request({
                method: 'POST',
                url: `${url}/users`,
                body:
                {
                    "last_name":"last_name",
                    "first_name":"first_name",
                    "phone_number":"phone_number2",
                    "email":"email@test2.com",
                    "password":"password",
                    "role":"user",
                    "receiveEmail":1,
                    "receiveNotification":1,
                }
            })
                .should((response) => {
                    const res = response.body
    
                    expect(response.status).to.eq(201)
                    expect(res).to.have.property('userId')
                    expect(res).to.have.property('last_name')
                    expect(res).to.have.property('first_name')
                    expect(res).to.have.property('phone_number')
                    expect(res).to.have.property('email')
                    expect(res).to.have.property('password')
                    expect(res).to.have.property('role')
                    expect(res).to.have.property('receiveEmail')
                    expect(res).to.have.property('receiveNotification')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });

        it('should the number of users in the database', () => {
            cy.request({
                method: 'GET',
                url: `${url}/users/size`
            })
                .should((response) => {
                    const res = response.body
                                        
                    expect(response.status).to.eq(200)
                    expect(res.nbElem).to.be.greaterThan(0)
                });
        });

        it('should return all users', () => {
            cy.request({
                method: 'GET',
                url: `${url}/users`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                    expect(res.length).to.be.greaterThan(0)
                });
        });


        it('should return users for pagination (20 users)', () => {
            cy.request({
                method: 'POST',
                url: `${url}/users/pagination`,
                body:
                {
                    "pageIndex":0,
                    "pageSize":20
                }
            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                });
        });


        it('should update a user', () => {
            cy.request({
                method: 'PUT',
                url: `${url}/users/2`,
                body:
                {
                    "last_name":"last_name",
                    "first_name":"first_name",
                    "phone_number":"phone_number",
                    "email":"email@test.com",
                    "password":"password",
                    "role":"admin",
                    "receiveEmail":0,
                    "receiveNotification":0,
                }
            })
                .should((response) => {
                    expect(response.status).to.eq(202)
                });
        });

        it('should return a single user', () => {
            cy.request({
                method: 'GET',
                url: `${url}/users/1`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                    expect(res).to.have.property('userId')
                    expect(res).to.have.property('last_name')
                    expect(res).to.have.property('first_name')
                    expect(res).to.have.property('phone_number')
                    expect(res).to.have.property('email')
                    expect(res).to.have.property('password')
                    expect(res).to.have.property('role')
                    expect(res).to.have.property('receiveEmail')
                    expect(res).to.have.property('receiveNotification')
                    expect(res).to.have.property('createdAt')
                    expect(res).to.have.property('updatedAt')
                });
        });

        it('should delete a user', () => {
            cy.request({
                method: 'DELETE',
                url: `${url}/users/2`
            })
                .should((response) => {
                    const res = response.body
                            
                    expect(response.status).to.eq(204)
                    expect(res.length).to.be.equal(0)
                });
        });
    });

    context('User Bookmarks', () => {

        it('should return all ingredient bookmarks', () => {
            cy.request({
                method: 'GET',
                url: `${url}/userBookmarks/ingredient`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                });
        });

        it('should return all recipe bookmarks', () => {
            cy.request({
                method: 'GET',
                url: `${url}/userBookmarks/recipe`
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200)
                });
        });

        it('should return a specific ingredient bookmark', () => {
            cy.request({
                method: 'PUT',
                url: `${url}/userBookmarks/ingredient/1`,
                body:
                {
                    "ingredientId":1,
                    "userId":1,
                    "saved":1,
                }
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200|202)
                });
        });

        it('should return a specific recipe bookmark', () => {
            cy.request({
                method: 'PUT',
                url: `${url}/userBookmarks/recipe/1`,
                body:
                {
                    "recipeId":1,
                    "userId":1,
                    "saved":1,
                }
            })
                .should((response) => {
                    const res = response.body
                    
                    expect(response.status).to.eq(200|202)
                });
        });
    });


    context('Authentification', () => {

        it('should insert a new user in the database', () => {
            cy.request({
                method: 'POST',
                url: `${url}/register`,
                body:
                {
                    "last_name":"sekpon",
                    "first_name":"ulysse",
                    "phone_number":"03030303032",
                    "email":"test@test2.com",
                    "password":"wxcvbn",
                    "role":"user",
                    "receiveEmail":1,
                    "receiveNotification":1
                }
            })
                .should((response) => {
                    const res = response.body
                    console.log(response)
                    
                    expect(response.status).to.eq(201)
                });
        });

        it('should return connected user info and access_token', () => {
            cy.request({
                method: 'POST',
                url: `${url}/login`,
                body:
                {
                    "email":"test@test2.com",
                    "password":"wxcvbn",
                }
            })
                .should((response) => {
                    const res = response.body
                    console.log(response)
                    
                    expect(response.status).to.eq(201)
                });
        });
        
        it('should create a user and return the created user', () => {
            cy.request({
                method: 'POST',
                url: `${url}/users`,
                body:
                {
                    "last_name":"lastName",
                    "first_name":"firstName",
                    "phone_number":"phoneNumber",
                    "email":"u.sekpon@gmail.com",
                    "password":"password_password",
                    "role":"user",
                    "receiveEmail":1,
                    "receiveNotification":1,
                }
            })
                .should((response) => {
                    const res = response.body
    
                    expect(response.status).to.eq(201)
                });
        });

        it('should return a new password to the user', () => {
            cy.request({
                method: 'POST',
                url: `${url}/forgotPassword`,
                body:
                {
                    "email":"u.sekpon@gmail.com"
                }
            })
                .should((response) => {
                    const res = response.body
                    console.log(response)
                    
                    expect(response.status).to.eq(200)
                });
        });

    });



});
