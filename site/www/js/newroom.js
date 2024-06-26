var adjectives = [
  "small",
  "big",
  "large",
  "smelly",
  "new",
  "happy",
  "shiny",
  "old",
  "clean",
  "nice",
  "bad",
  "cool",
  "hot",
  "cold",
  "warm",
  "hungry",
  "slow",
  "fast",
  "red",
  "white",
  "black",
  "blue",
  "green",
  "basic",
  "strong",
  "cute",
  "poor",
  "nice",
  "huge",
  "rare",
  "lucky",
  "weak",
  "tall",
  "short",
  "tiny",
  "great",
  "long",
  "single",
  "rich",
  "young",
  "dirty",
  "fresh",
  "brown",
  "dark",
  "crazy",
  "sad",
  "loud",
  "brave",
  "calm",
  "silly",
  "smart",
];

var nouns = [
  "dog",
  "bat",
  "wrench",
  "apple",
  "pear",
  "ghost",
  "cat",
  "wolf",
  "squid",
  "goat",
  "snail",
  "hat",
  "sock",
  "plum",
  "bear",
  "snake",
  "turtle",
  "horse",
  "spoon",
  "fork",
  "spider",
  "tree",
  "chair",
  "table",
  "couch",
  "towel",
  "panda",
  "bread",
  "grape",
  "cake",
  "brick",
  "rat",
  "mouse",
  "bird",
  "oven",
  "phone",
  "photo",
  "frog",
  "bear",
  "camel",
  "sheep",
  "shark",
  "tiger",
  "zebra",
  "duck",
  "eagle",
  "fish",
  "kitten",
  "lobster",
  "monkey",
  "owl",
  "puppy",
  "pig",
  "rabbit",
  "fox",
  "whale",
  "beaver",
  "gorilla",
  "lizard",
  "parrot",
  "sloth",
  "swan",
];

function getRandomNumber(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
var noun = nouns[Math.floor(Math.random() * nouns.length)];
var num = getRandomNumber(5);
noun = noun.charAt(0).toUpperCase() + noun.substring(1);
adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);
document.getElementById("roomName").value = num + adjective + noun;
