////////////////////////
// FoodItem
////////////////////////
// Constructor Function
var FoodItem = function(name, calories, vegan, glutenFree, citrusFree) {
    this.name = name;
    this.calories = calories;
    this.vegan = vegan;
    this.glutenFree = glutenFree;
    this.citrusFree = citrusFree;
}
// FoodItem Prototype Method
FoodItem.prototype.getDescription = function() {
    var description =  this.name + ' has ' + this.calories + ' calories! \nVegan friendly? ' + this.vegan + '\nGluten Free? ' + this.glutenFree + '\nCitrus Free? ' + this.citrusFree;
    return description;
}


// FoodItem Instances
var orange = new FoodItem('Orange', 100, true, true, false);
var bread = new FoodItem('Bread', 180, true, false, true);
var gummyBear = new FoodItem('Gummy Bear', 5000, true, true, true);

// Print Three FoodItems and their description
//console.log(orange);
//console.log(bread);
//console.log(gummyBear);



////////////////////////
// Ingredients
////////////////////////
var tequila = new FoodItem('Tequila', 100, true, true, true);
var margMix = new FoodItem('Margarita Mix', 800, true, true, true);
var tortilla = new FoodItem('Tortilla', 150, true, false, true);
var beans = new FoodItem('Beans', 250, true, true, true);
var avacado = new FoodItem('Avacado', 500, true, true, true);
var jalepeno = new FoodItem('Jalepeno', 50, true, true, true);
var chips = new FoodItem('Corn Chips', 200, true, true, true);
var beef = new FoodItem('Ground Beef', 400, false, true, true);


////////////////////////
// Drink
////////////////////////
var Drink = function(name, description, price, ingredients) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.ingredients = ingredients;
}
Drink.prototype.getDescription = function(){
    var ingredients = _.pluck(this.ingredients, 'name').join(', ');
    return this.name + ': ' + this.description + '. Ingredients: ' + ingredients + '. Price: $' + this.price + '.00';
}
// It's more readable to repeat ourselves for these three functions instead of abstracting
Drink.prototype.isVegan = function(){
    var pluck = _.pluck(this.ingredients, 'vegan');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}
Drink.prototype.isGlutenFree = function(){
    var pluck = _.pluck(this.ingredients, 'glutenFree');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}
Drink.prototype.isCitrusFree = function() {
    var pluck = _.pluck(this.ingredients, 'citrusFree');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}


// Drink Instances
var margarita = new Drink('Margarita', 'Delicious Mexican Beverage', 14.00, [tequila, margMix]);
var tequilaSunrise = new Drink('Tequila Sunrise', 'Fabulous Mixed Citrus Drink', 9.00, [tequila, orange]);



////////////////////////
// Plates
////////////////////////
var Plate = function(name, description, price, ingredients) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.ingredients = ingredients;
}

Plate.prototype.getDescription = function(){
    var ingredients = _.pluck(this.ingredients, 'name').join(', ');
    return this.name + ': ' + this.description + '. Ingredients: ' + ingredients + '. Price: $' + this.price + '.00';
}
// It's more readable to repeat ourselves for these three functions instead of abstracting
Plate.prototype.isVegan = function(){
    var pluck = _.pluck(this.ingredients, 'vegan');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}
Plate.prototype.isGlutenFree = function(){
    var pluck = _.pluck(this.ingredients, 'glutenFree');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}
Plate.prototype.isCitrusFree = function() {
    var pluck = _.pluck(this.ingredients, 'citrusFree');
    var uniqPluck = _.uniq(pluck);
    return uniqPluck.length === 1 && uniqPluck[0] === true ? true : false;
}


// Plate Instances
var burrito = new Plate('Burrito Plate', 'Plain Bean Burrito', 3.00, [tortilla, beans, beef]);
var guacamole = new Plate('Guacamole Plate', 'Refreshing, Homemade Guacamole and Chips', 8.00, [avacado, jalepeno, chips]);



////////////////////////
// Order
////////////////////////
var Order = function(items) {
    this.items = items
}
Order.prototype.getDescription = function(){
    var items = this.items;
    var menuString = '';

    for (var i = 0; i < items.length; i++) {
        menuString = menuString + '\n' + items[i].name + ': ' + ' Price: $' + items[i].price + '.00';
    }
    
    return menuString; 
}


// Order Instances
var sethOrder = new Order([burrito, margarita]);



////////////////////////
// Menu
////////////////////////
var Menu = function(items) {
    this.items = items;
}
Menu.prototype.getMenu = function(){
    var items = this.items;
    var menuString = '';

    for (var i = 0; i < items.length; i++) {
        var ingredients = _.pluck(items[i].ingredients, 'name').join(', ');
        menuString = menuString + '\n' + items[i].name + ': ' + items[i].description + '. Ingredients: ' + ingredients + '. Price: $' + items[i].price + '.00';
    }
    
    return menuString;
}

Menu.prototype.createMenu = function(){
    var menuArray = this.items;
    
    for (var i = 0; i < menuArray.length; i++) {
        var title = '<h3 class="menu-item-title">' + menuArray[i].name + '</h3>';
        var description = '<p class="menu-item-description">' + menuArray[i].description + '</p>';
        var price = '<p class="menu-item-price">$' + menuArray[i].price + '.00</p>';
        var menuItem = '<div class="menu-item">' + title + description + price + '</div>';
        
        $('.menu > .content').append(menuItem);
    }
}

// Menu Instances
var panchosMenu = new Menu([burrito, guacamole, margarita, tequilaSunrise]);
var veganMenu;
var glutenFreeMenu;
var citrusFreeMenu;

// Helper Functions to filter
var filterVeganMenu = function() {
    var filteredItems = [];
    var allMenuItems = panchosMenu.items; 
    
    for (var i = 0; i < allMenuItems.length; i++) {
        if (allMenuItems[i].isVegan() === true) {
            filteredItems.push(allMenuItems[i]);
        }
    }
    
    veganMenu = new Menu(filteredItems);
    return veganMenu;
}

var filterGlutenFreeMenu = function() {
    var filteredItems = [];
    var allMenuItems = panchosMenu.items; 
    
    for (var i = 0; i < allMenuItems.length; i++) {
        if (allMenuItems[i].isGlutenFree() === true) {
            filteredItems.push(allMenuItems[i]);
        }
    }
    
    glutenFreeMenu = new Menu(filteredItems);
    return glutenFreeMenu;
}

var filterCitrusFreeMenu = function() {
    var filteredItems = [];
    var allMenuItems = panchosMenu.items; 
    
    for (var i = 0; i < allMenuItems.length; i++) {
        if (allMenuItems[i].isCitrusFree() === true) {
            filteredItems.push(allMenuItems[i]);
        }
    }
    
    citrusFreeMenu = new Menu(filteredItems);
    return citrusFreeMenu;
}



////////////////////////
// Restaurant
////////////////////////

var Restaurant = function(name, description, menu){
    this.name = name;
    this.description = description;
    this.menu = menu;    
}
Restaurant.prototype.getDescription = function(){
    return this.name + ': ' + this.description + '\n' + this.menu.getMenu();
}


// Restaurant Instances
var panchosTaqueria = new Restaurant('Panchos Taqueria', 'Best Tacos in Town!', panchosMenu)



////////////////////////
// Customer
////////////////////////
    
var Customer = function(dietaryPreference){
    this.dietaryPreference = dietaryPreference;
}
Customer.prototype.getDescription = function(){
    return 'Dietary Preference is ' + this.dietaryPreference;
}


// Customer Instances
var seth = new Customer('vegan')



////////////////////////////////////////////////
// Load Menu and Initialize Event Handlers
///////////////////////////////////////////////
$(document).ready(function() {
    
    // Load our menu on page load
    panchosMenu.createMenu();
    
    // Filter our alternative menus
    filterVeganMenu();
    filterGlutenFreeMenu();
    filterCitrusFreeMenu();
    
    // Remove Menu helper
    var removeMenu = function() {
        $('.menu > .content .menu-item').remove();
    }
    
    // Checkbox - On Click
    // ForEach Menu Item (Drink or Plate) run .isVegan() then
    // create new menu based on filtering
    // then call createMenu() on that filtered menu
    
    $('.is-vegan').on('click', function(){
        if ($(this).is(':checked') === true) {
            removeMenu();
            veganMenu.createMenu();
        } else if ($(this).is(':checked') === false) {
            removeMenu();
            panchosMenu.createMenu();
        }
    });
    
    $('.is-gluten-free').on('click', function(){
        if ($(this).is(':checked') === true) {
            removeMenu();
            glutenFreeMenu.createMenu();
        } else if ($(this).is(':checked') === false) {
            removeMenu();
            panchosMenu.createMenu();
        }
    });
    
    $('.is-citrus-free').on('click', function(){
        if ($(this).is(':checked') === true) {
            removeMenu();
            citrusFreeMenu.createMenu();
        } else if ($(this).is(':checked') === false) {
            removeMenu();
            panchosMenu.createMenu();
        }
    });
    
    // Add item to order on click
    $('.menu-item').on('click', function(){
        var title = '<p class="order-item-name">' + $(this).find('.menu-item-title').text() + '</p>';
        var price = '<p class="order-item-price">' + $(this).find('.menu-item-price').text() + '</p>';
        
        var orderItem = '<div class="order-item">' + title + price + '</div>';
        $('.order > .content').append(orderItem);
        var priceInt = parseInt($(this).find('.menu-item-price').text().slice(1));
        var currentPrice = $('.order-total').text();
        $('.order-total').text(currentPrice + priceInt);
        
    });
    
    // Update Total

});// End Ready