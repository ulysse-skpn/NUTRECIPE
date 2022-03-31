import { fakeAsync, TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IngredientOut } from 'src/app/interfaces/ingredients/ingredient-out';
import { RecipeOut } from 'src/app/interfaces/recipes/recipe-out';
import { IngredientIn } from 'src/app/interfaces/ingredients/ingredient-in';
import { RecipeIn } from 'src/app/interfaces/recipes/recipe-in';
import { addMatchers, initTestScheduler } from 'jasmine-marbles';


describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;
  let ingredientIn: IngredientIn;
  let ingredientOut: IngredientOut;
  let recipeIn: RecipeIn;
  let recipeOut: RecipeOut;
  let ingredientsList: IngredientOut[];
  let recipesList: RecipeOut[];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule , HttpClientTestingModule ]
    });
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
    initTestScheduler();
    addMatchers();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('[getAllIngredients] should call http GET method for the given route', () => {
    ingredientsList = 
    [
      {
        "idingredients": 1,
        "product_name": "Blanc de Poulet doré au Four (Qualité Supérieure) 4 Tranches",
        "ingredient_text": "Filet de poulet (93 %),eau,conservateurs : lactate de sodium,nitrite de sodium ;  sel,arômes,sucres : sirop de glucose,dextrose ; gélifiants : carraghénanes,farine de graines de caroube,gomme xanthane ; antioxydant : ascorbate de sodium,colorant de surface : caramel.",
        "generic_name": "Blanc de poulet qualité supérieure, doré au four, traité en salaison",
        "carbohydrates": 1.3,
        "proteins": 20.6,
        "fats": 1.9,
        "salt": 2.6,
        "calories": 443,
        "nova_group": 4,
        "category_fr": "Volailles",
        "categories": "Viandes, Charcuteries, Frais, Volailles, Poulets, Charcuteries cuites, Blancs de poulet",
        "serving_size": "une tranche (40 g)",
        "quantity": "160 g",
        "status": 0,
        "ingredient_image": null
    },
    {
        "idingredients": 2,
        "product_name": "Haché tradition Pur Boeuf",
        "ingredient_text": "100 % viande pur bœuf hâchée.",
        "generic_name": "Viande de boeuf hâchée",
        "carbohydrates": 999,
        "proteins": 999,
        "fats": 999,
        "salt": 999,
        "calories": 999,
        "nova_group": 1,
        "category_fr": "Viandes",
        "categories": "Viandes, Frais, Bœuf, Viandes fraîches, Viandes de boeuf hachées",
        "serving_size": null,
        "quantity": "350 g",
        "status": 0,
        "ingredient_image": null
    },
    {
        "idingredients": 3,
        "product_name": "Jambon Serrano",
        "ingredient_text": "Jambon de porc,sel,dextrose,conservateurs (E-252,E-250) et antioxydant (E-301).",
        "generic_name": null,
        "carbohydrates": 1.4,
        "proteins": 26.8,
        "fats": 13.1,
        "salt": 3.5,
        "calories": 965,
        "nova_group": 4,
        "category_fr": "Jambons secs",
        "categories": "Viandes, Charcuteries, Jambons, Jambons crus, Jambons secs, Jambons Serrano",
        "serving_size": null,
        "quantity": "100 g",
        "status": 0,
        "ingredient_image": null
    },
    {
        "idingredients": 4,
        "product_name": "Jambon Serrano",
        "ingredient_text": "Jambon de porc,sel,dextrose,conservateurs (E252,E250) et antioxydant (E300).",
        "generic_name": null,
        "carbohydrates": 999,
        "proteins": 29.8,
        "fats": 999,
        "salt": 5.5,
        "calories": 962,
        "nova_group": 4,
        "category_fr": "Jambons secs",
        "categories": "Viandes, Charcuteries, Jambons, Jambons crus, Jambons secs, Jambons Serrano",
        "serving_size": null,
        "quantity": "100 g",
        "status": 0,
        "ingredient_image": null
    }
    ] as IngredientOut[];

    service.getAllIngredients().subscribe( res => {
      expect(res).toEqual(ingredientsList);
    })
    const req = httpMock.expectOne('http://127.0.0.1:3000/ingredients/all');
    expect(req.request.method).toEqual('GET');
    req.flush(ingredientsList);
    httpMock.verify();
  });


  it('[getAllRecipes] should call http GET method for the given route', () => {
    recipesList = [
        {
          "idrecipes": 1,
          "title": "Rhum arrangé aux vanilles du monde par Guillaume",
          "prep": "5 min ",
          "cookingTime": "n/a",
          "rest": "41 j -968 h 59040 min ",
          "categories": "Rhum,Vanille,Rhums arrangés,Cuisine des îles",
          "ingredients": " 1 litre de rhum agricole, 2 gousses de vanille de Madagascar, 2 gousses de vanille de Tahiti, 50 grammes de sucre de canne",
          "serving_size": "1",
          "instructions": " Intégrez les gousses de vanille dans la bouteille de rhum agricole., Intégrez 50 grammes de sucre de canne., Laissez macérer le mélange pendant un mois.",
          "recipe_image": 1,
          "image_path": "https://www.cuisine-libre.org/local/cache-gd2/67/1bb46ec900a6d0c5206d5b2886c0ad.jpg?1619963696",
          "category": "recipe"
      },
      {
          "idrecipes": 2,
          "title": "Vin de marrube blanc par Hildegarde von Bingen",
          "prep": "2 min ",
          "cookingTime": "3 min ",
          "rest": "10 min ",
          "categories": "Vin rouge,Aneth,Grogs et vins chauds",
          "ingredients": " 10 g de marrube blanc, 30 g d’aneth, 30 g de fenouil, 1 l de bon vin rouge",
          "serving_size": "n/a",
          "instructions": " Mélangez les herbes dans un litre de bon vin rouge., Faites bouillir 3 à 4 minutes, puis laissez infuser 10 minutes avant de filtrer., Prenez un petit verre de ce vin, chaud, plusieurs fois par jour, jusqu’à ce que la toux disparaisse.",
          "recipe_image": 2,
          "image_path": "https://www.cuisine-libre.org/local/cache-gd2/fd/bf977912937206312304c9286a97bb.jpg?1610908327",
          "category": "recipe"
      },
      {
          "idrecipes": 3,
          "title": "Citronnade mélisse menthe par torute",
          "prep": "10 min ",
          "cookingTime": "n/a",
          "rest": "1 h ",
          "categories": "Eau,Citron jaune,Mélisse,Limonades,Menthe",
          "ingredients": " 1 petit bouquet de menthe fraiche, 1 petit bouquet de mélisse fraiche, 2 cm de gingembre frais (facultatif), 1 citron non traité, 2 c à soupe de sucre ou du miel, 1 l. d’eau",
          "serving_size": "1 litre",
          "instructions": "Laver sous l’eau fraiche la menthe, la mélisse et le citron.,Faire chauffer la moitié de l’eau dans une casserole, juste avant l’ébullition, couper la source de chaleur et y plonger la menthe et la mélisse. Couvrir. Laisser infuser au moins 10 minutes. Plus les plantes infusent plus la tisane aura de goût.,Pendant ce temps, prélever le zeste et le jus du citron et râper le gingembre.,Lorsque les plantes ont bien infusé, filtrer à l’aide d’une passoire fine. Mettre dans un pichet ou une bouteille, ajouter le citron, le gingembre, le sucre et le reste de l’eau. Mélanger.,Mettre au frais pendant au moins une heure.",
          "recipe_image": 3,
          "image_path": "https://www.cuisine-libre.org/local/cache-gd2/1d/79e53062fe8c71de62701216b96526.jpg?1608872804",
          "category": "recipe"
      },
      {
          "idrecipes": 4,
          "title": "Soupe de fanes de radis par Romy",
          "prep": "10 min ",
          "cookingTime": "25 min ",
          "rest": "n/a",
          "categories": "Fanes,Potages",
          "ingredients": " les fanes de 2 bottes de radis bio, 1 cuil. à soupe d’huile d’olive, 1 oignon, 1 gousse d’ail, 1 grosse pomme de terre, 1 litre d’eau, 1 c.café de gros sel",
          "serving_size": "4 personnes",
          "instructions": "Coupez le feuillage des radis, sans le jeter et gardez les radis pour une autre recette. Éliminez les feuilles jaunies ou trop abîmées et lavez les autres à l’eau froide. Laissez-les égoutter.,Lavez et épluchez la pomme de terre, l’oignon et la gousse d’ail. Émincez l’ail et l’oignon. Coupez la pomme de terre en petits morceaux.,Dans une grande casserole, mettez l’huile à chauffer. Faites revenir les oignons et l’ail émincés quelques minutes. Ajoutez les fanes et laissez-les suer : faites-leur rendre leur eau à feu vif, tout en remuant, pendant 5 minutes. Ajoutez les dès de pomme de terre, remuez et recouvrez d’eau. Salez sans hésiter, car les fanes sont fades.Laissez cuire à couvert, environ 20 minutes, jusqu’à cuisson complète des pommes de terre. Ce potage doit cuire en peu de temps pour garder toute sa saveur printanière et ses vitamines.,Mixez. Goûtez. Ajustez l’assaisonnement. Servez.",
          "recipe_image": 4,
          "image_path": "https://www.cuisine-libre.org/local/cache-gd2/e4/16e6522da2ae6f22d9121c89987dbd.jpg?1608774262",
          "category": "recipe"
      }
    ] as RecipeOut[];

    service.getAllRecipes().subscribe( res => {
      expect(res).toEqual(recipesList);
    })
    const req = httpMock.expectOne('http://127.0.0.1:3000/recipes/all');
    expect(req.request.method).toEqual('GET');
    req.flush(recipesList);
    httpMock.verify();
  });


  it('[getRecipe] should call http GET method for the given route', () => {
    const id = 2;
    ingredientOut = {
      "idingredients":id,
      "product_name":"product_name",
      "ingredient_text":"ingredient_text",
      "generic_name":"generic_name",
      "carbohydrates":1,
      "proteins":10,
      "fats":10,
      "salt":10,
      "calories":10,
      "nova_group":3,
      "category_fr":"category_fr",
      "categories":"categories",
      "serving_size":"serving_size",
      "quantity":"12",
      "status":0,
      "ingredient_image":"test"
    };

    service.getIngredient(id).subscribe( res => {
      expect(res).toEqual( ingredientOut );
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/ingredients/ingredient/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush( ingredientOut );
    httpMock.verify();
  });


  it('[getRecipe] should call http GET method for the given route', () => {
    const id = 6;
    recipeOut = 
    {
      "idrecipes": id,
      "title": "Café d’épeautre par Hildegarde von Bingen",
      "prep": "20 min ",
      "cookingTime": "n/a",
      "rest": "n/a",
      "categories": "Grand épeautre,Infusions et thés",
      "ingredients": " 1/2 litre d’eau, 3 cuillerées à soupe de grains torréfiés de grand épeautre non hybridé",
      "serving_size": "n/a",
      "instructions": "Versez un demi-litre d’eau et 3 cuillerées à soupe de grains d’épeautre torréfiés dans une casserole. Portez à ébullition et laissez bouillir 20 minutes. Filtrez, sans jeter les grains. Dégustez.,Conservez les grains au réfrigérateur. Vous pourrez les réutiliser quatre ou cinq fois, selon votre goût. Pour cela, il suffit de les infuser dans de l’eau chaude pendant 4 à 5 minutes.",
      "recipe_image": id,
      "image_path": "https://www.cuisine-libre.org/local/cache-gd2/9a/5ae773c233f70fb7dd26c0ce3b2b1d.jpg?1608805809",
      "category":"recette"
    };

    service.getRecipe(id).subscribe( res => {
      expect(res).toEqual( recipeOut );
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/recipes/recipe/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush( recipeOut );
    httpMock.verify();
  });


  it('[addIngredient] should call http POST method for the given route', () => {
    ingredientIn = 
    {
      "product_name": "Jambon de Paris, Découenné Dégraissé (4 Tranches)",
      "ingredient_text": "Jambon frais de porc 87 %,eau,sirop de glucose,sel,arômes,antioxydant : érythorbate de sodium,conservateur : nitrite de sodium.",
      "generic_name": "Jambon cuit de Paris qualité choix découenné, dégraissé",
      "carbohydrates": 0.5,
      "proteins": 20.9,
      "fats": 2.4,
      "salt": 1.4,
      "calories": 458,
      "nova_group": 4,
      "category_fr": "Jambons",
      "categories": "Viandes, Charcuteries, Frais, Jambons, Porc, Charcuteries cuites, Jambons blancs",
      "serving_size": "45 g",
      "quantity": "180 g",
      "status": 0,
      "ingredient_image": null
    }

    service.addIngredient(ingredientIn).subscribe( res => {
      expect(res).toEqual( ingredientIn );
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/ingredients/addIngredient`);
    expect(req.request.method).toEqual('POST');
    req.flush( ingredientIn );
    httpMock.verify();
  })


  it('[addRecipe] should call http POST method for the given route', () => {
    recipeIn = 
    {
      "title": "Vin de noix par paddy",
      "prep": "1 h ",
      "cookingTime": "n/a",
      "rest": "n/a",
      "categories": "Vin rouge,Sucre blanc,Noix de Grenoble,Vins et cocktails",
      "ingredients": " 24 noix vertes, 8 litres de vin rouge de pays, 750 g de sucre semoule, 1 orange bio, 1 litre d’alcool de fruit",
      "serving_size": "n/a",
      "instructions": "Prendre des noix vertes, Les couper en 4, Les mettre dans une bonbonne. Couper l’orange en quartiers, l’ajouter. Ajouter le sucre. Verser le vin et l’alcool, fermer et remuer.,Remuer régulièrement pendant une semaine pour bien mélanger le sucre.,Laisser reposer à la cave. Au bout de 12 semaines au moins, filtrer et mettre en bouteille.",
      "recipe_image": "https://www.cuisine-libre.org/local/cache-gd2/d4/7b2c449396921442268863faac442d.jpg?1608882398",
  }

    service.addRecipe(recipeIn).subscribe( res => {
      expect(res).toEqual( recipeIn );
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/recipes/addRecipe`);
    expect(req.request.method).toEqual('POST');
    req.flush( recipeIn );
    httpMock.verify();
  })


  it('[deleteIngredient] should call http DELETE method for the given route', () => {
    const id = 4;
    service.deleteIngredient(id).subscribe( res => {
      expect(res).toEqual(id);
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/ingredients/deleteIngredient/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(id);
    httpMock.verify();
  })


  it('[deleteRecipe] should call http DELETE method for the given route', () => {
    const id = 14;
    service.deleteRecipe(id).subscribe( res => {
      expect(res).toEqual(id);
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/recipes/deleteRecipe/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(id);
    httpMock.verify();
  })


  it('[updateIngredient] should call http PATCH method for the given route', () => {
    const id = 16;
    ingredientOut = {
      "idingredients":id,
      "product_name":"product_name",
      "ingredient_text":"ingredient_text",
      "generic_name":"generic_name",
      "carbohydrates":1,
      "proteins":10,
      "fats":10,
      "salt":10,
      "calories":10,
      "nova_group":3,
      "category_fr":"category_fr",
      "categories":"categories",
      "serving_size":"serving_size",
      "quantity":"12",
      "status":0,
      "ingredient_image":"test"
    };

    service.updateIngredient(ingredientOut).subscribe( res => {
      expect(res).toEqual(ingredientOut[0].idingredients);
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/ingredients/updateIngredient/${id}`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(id);
    httpMock.verify();
  })


  it('[updateRecipe] should call http PATCH method for the given route', () => {
    const id = 34;
    recipeOut = 
    {
      "idrecipes": id,
      "title": "Café d’épeautre par Hildegarde von Bingen",
      "prep": "20 min ",
      "cookingTime": "n/a",
      "rest": "n/a",
      "categories": "Grand épeautre,Infusions et thés",
      "ingredients": " 1/2 litre d’eau, 3 cuillerées à soupe de grains torréfiés de grand épeautre non hybridé",
      "serving_size": "n/a",
      "instructions": "Versez un demi-litre d’eau et 3 cuillerées à soupe de grains d’épeautre torréfiés dans une casserole. Portez à ébullition et laissez bouillir 20 minutes. Filtrez, sans jeter les grains. Dégustez.,Conservez les grains au réfrigérateur. Vous pourrez les réutiliser quatre ou cinq fois, selon votre goût. Pour cela, il suffit de les infuser dans de l’eau chaude pendant 4 à 5 minutes.",
      "recipe_image": id,
      "image_path": "https://www.cuisine-libre.org/local/cache-gd2/9a/5ae773c233f70fb7dd26c0ce3b2b1d.jpg?1608805809",
      "category":"recette"
    };

    service.updateRecipe(recipeOut).subscribe( res => {
      expect(res).toEqual(recipeOut[0].idrecipes);
    })
    const req = httpMock.expectOne(`http://127.0.0.1:3000/recipes/updateRecipe/${id}`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(id);
    httpMock.verify();
  })


});

