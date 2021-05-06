export const questions = [
  {
    id: 1,
    text: 'Oletko ruisleipä?',
    Category: {
      id: 1,
      name: 'Jauhot',
      description:
        'Jauho on yleisnimi hienojakoisille, jauhomaisille aineille ja puhekielessä eritoten viljalajien jyvistä jauhamalla saatava ravinnoksi käytettävä tuote. Sanoja jauho ja jauhe käytetään toisinaan synonyymeinä. Jauho on hienoin jyvistä jauhettu jauhatustuote, jonka karkeusaste vaihtelee. (Lähde: Wikipedia)',
    },
    Question_answers: [
      {
        id: 101,
        text: 'Strongly agree',
      },
      {
        id: 102,
        text: 'Agree',
      },
      {
        id: 103,
        text: 'Neutral',
      },
      {
        id: 104,
        text: 'Disagree',
      },
      {
        id: 105,
        text: 'Strongly disagree',
      },
    ],
  },
  {
    id: 2,
    text: 'Maistuisiko laskiaispulla?',
    Category: {
      id: 2,
      name: 'Pullat',
      description: 'Pulla on herkkuu! naminaminam',
    },
    Question_answers: [
      {
        id: 201,
        text: 'MMM siis todellaki',
      },
      {
        id: 202,
        text: 'En tiiä ehkä huomenna',
      },
      {
        id: 203,
        text: 'hyi ei',
      },
    ],
  },
  {
    id: 3,
    text: 'Olisiko jo perjantaipizzan aika?',
    Category: {
      id: 3,
      name: 'Perjantaifiilikset',
      description:
        'Perjantai on ihmisten mielestä kiva päivä jollon rentoillaan ja saatetaan vaikka haukata vähän pizzaa.',
    },
    Question_answers: [
      {
        id: 301,
        text: 'Olishan se herkkua...',
      },
      {
        id: 302,
        text: 'Joo jep!',
      },
      {
        id: 303,
        text: 'Ehkä',
      },
      {
        id: 304,
        text: 'Todellakin',
      },
      {
        id: 305,
        text: 'Ei tod!!! :(',
      },
      {
        id: 306,
        text: 'JOOOOOOOOOOOO',
      },
    ],
  },
  {
    id: 4,
    text: 'Tykkäätkö korvapuustista?',
    Category: {
      id: 2,
      name: 'Pullat',
      description: 'Pulla on herkkuu! naminaminam',
    },
    Question_answers: [
      {
        id: 401,
        text: 'Jooooo',
      },
      {
        id: 402,
        text: 'Meh',
      },
      {
        id: 403,
        text: 'Sattuu',
      },
    ],
  },
  {
    id: 5,
    text: 'Pidätkö höttöleivistä?',
    Category: {
      id: 4,
      name: 'Höttö',
      description: 'Höttöö',
    },
    Question_answers: [
      {
        id: 501,
        text: 'Yes',
      },
      {
        id: 502,
        text: 'No',
      },
    ],
  },
]

export const detailedResults = {
  surveyResult: {
    maxPoints: 100,
    userPoints: 80,
    text: 'You did semi ok!',
  },
  categoryResults: [
    {
      name: 'COolNess',
      userPoints: 12,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 20,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kiva',
      userPoints: 22,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 25,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kova',
      userPoints: 8,
      maxPoints: 10,
      groupAverage: 5,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'JEOUaujee',
      userPoints: 12,
      maxPoints: 40,
      groupAverage: 38,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Ihan siistiä!',
      userPoints: 15,
      maxPoints: 15,
      groupAverage: 15,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
}


export const industries = [
  {
    "name": "Operating systems"
  },
  {
    "name": "Integrated systems"
  },
  {
    "name": "Applications"
  },
  {
    "name": "Mobile applications"
  },
  {
    "name": "Games"
  },
  {
    "name": "Information security"
  },
  {
    "name": "Platforms"
  }
]
