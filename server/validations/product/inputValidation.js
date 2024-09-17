const CATEGORIES = []
export default class InputValidation {
    
    validate(productData) {
        const { name, picture, category, status, qulity,
            description, price } = productData;
            
        this.pictureValidation(picture);
        this.nameValidation(name);
        this.categoryValidation(category);
        this.priceValidation(price);
    }

    userNameValidation(name) {
        if (!name) {
            throw "Input validation error - name is not provided";
        }
    }

    nameValidation(name) {
        if (!name) {
            throw "Input validation error - name is not provided";
        }
    }
    priceValidation(price){
        if(!Number(price)){
            throw "Input validation error - price must be a number"
        }
    }
    categoryValidation(category){
        if(category in CATEGORIES){
            throw "Input validation error - There is no Category like that"
        }
    }

}
