$(document).ready(() => {               
    
    let count = 0;              //initialize count to 0
    let cardOne, cardTwo;       // declare cardone and cardtwo variable

    const ulist = document.querySelectorAll(".cards");      //creating array of li elements
    function shuffleCard() {                //shufflecard function to shuffle the images    
        cardOne = cardTwo = "";             //initializing cardon and cartwo with ""
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //creating array of numbers
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);   //sorting array through math.random method 
        /*
            Reference: 
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        */
        ulist.forEach((cards, i) => {                                   //for each loop that goes through each ulist elemnt and naming card as instance of an element
            $(cards).removeClass("flip");                               //removing flip method from the element
            $(cards).removeClass("bg_green");                           //removing bg_green methd from the elements
            let imgTag = cards.querySelector(".backview img");          //selecting img elemetn of class backview 
            imgTag.src = `images/img-${arr[i]}.png`;                    //set src of the img tag
            cards.addEventListener("click", flipCard);                  //adding click event listener to each element
        });
    }
    shuffleCard();                                                      //first time so calling the function 
    function flipCard() {                                               //function flipcard that helps in matching and flipping the card
        if (cardOne == "") {                                            //check if the card is clicked for the first time because then it will be ""
            $(this).addClass("flip");                                   //adding flip class to the card
            cardOne = this;                                             //adding the element into cardone variable
        } else if (cardOne != this && cardTwo == "") {                  //check if the card is clicked second time means check if cardtwo is empty and this(instance) is not equal to card one
            $(this).addClass("flip");                                       //adding flip class to this instance
            cardTwo = this;                                                 //assigning this to cardtwo            
            let cardOneImg = cardOne.querySelector(".backview img").src;    //image source of card one
            let cardTwoImg = cardTwo.querySelector(".backview img").src;    //image source of card two

            if (cardOneImg === cardTwoImg) {                    //check if both the source of image is equal
                count++;                                        //increment count
                if(count == 8){                                 //if count is 8 then all card are flipped perfectly 
                    setTimeout(()=>{
                        return shuffleCard();                   //calling shufflecard after 1 seconds=
                    },1000);
                }
                $(cardOne).addClass("bg_green");                //if cards match then adding class bg_green
                $(this).addClass("bg_green");                   //adding class bg_green to this instance
                cardOne = cardTwo = "";                         //set cardone and two variable to ""
            }
            else {                                              //if cards are not matching
                setTimeout(function () {                        //calling function after 0.5 second
                    $(cardOne).removeClass("flip");             //removing class flip from cardone
                    $(cardTwo).removeClass("flip");             //removing class flip from cardtwo
                    cardOne = cardTwo = "";                     //set cardone and two empty
                }, 500);
            }
        }

    }

})

//copyright @ javadnaqvi



