const getRandomId = () => `${Math.random()}-${Math.random()}`;

const getRandomNumber = (min, range) =>
  Math.floor((Math.random() * 100 * range) / 100) + min;

const randomFromList = (list) => list[getRandomNumber(0, list.length)];

const names = [
  "Anita",
  "Anima",
  "Asa",
  "Asha",
  "Azami",
  "Laila",
  "Haris",
  "Talia",
  "Noor",
  "Malik",
  "Basia",
  "Arya",
  "Duska",
  "Idris",
  "Kala",
  "Kamal",
  "Baz",
  "Ken",
  "Evander",
  "Kim",
  "Lina",
  "Lulu",
  "Caris",
  "Nia",
  "Paz",
  "Raisa",
  "Samir",
  "Zahara"
];

// source for names: https://www.mother.ly/life/28-baby-names-that-bridge-cultures-arya-to-zahara

const getNewsItem = () => ({
  id: getRandomId(),
  title: "Title Placeholder",
  message: "Message about item in the news feed (placeholder)",
  imgSrc:
    "https://via.placeholder.com/300x100.png?text=News+Feed+Image+Placeholder"
});

const getFriend = () => ({
  id: getRandomId(),
  name: randomFromList(names),
  isOnline: Math.random() < 0.5
});

export default {
  "/menu": ["Home", "Profile", "Events", "Clubs"],
  "/news-feed": Array.from({ length: 5 }, getNewsItem),
  "/friends": Array.from({ length: 12 }, getFriend)
};