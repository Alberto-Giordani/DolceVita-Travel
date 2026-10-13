import romeImage from '../../images/rome.jpg'
import veniceImage from '../../images/venice.jpg'
import florenceImage from '../../images/florence.jpg'
import amalfiImage from '../../images/amalfi.jpg'
import cinqueTerreImage from '../../images/cinque-terre.jpg'
import sicilyImage from '../../images/sicily.jpg'

export const tours = [
    {
        id: 'venice',
        title: 'Venice, beyond the canals',
        description: 'Wander through hidden courtyards, colourful islands, and waterside streets.',
        category: 'Cities',
        days: 3,
        nights: 2,
        price: 490,
        image: veniceImage,
        alt: 'Boats and historic buildings lining the Grand Canal in Venice',
    },
    {
        id: 'cinque-terre',
        title: 'The colours of Cinque Terre',
        description: 'Explore coastal paths, bright fishing villages, and the blue Ligurian Sea.',
        category: 'Coast',
        days: 4,
        nights: 3,
        price: 650,
        image: cinqueTerreImage,
        alt: 'Colourful buildings of Manarola perched on the rocky Cinque Terre coastline',
    },
    {
        id: 'florence',
        title: 'Florence & Tuscany',
        description: 'Renaissance masterpieces, hilltop towns, and slow days in the countryside.',
        category: 'Cities',
        days: 5,
        nights: 4,
        price: 790,
        image: florenceImage,
        alt: "Florence's historic buildings beside the Arno River and Ponte Vecchio",
    },
    {
        id: 'rome',
        title: 'Rome, the Eternal City',
        description: 'Ancient wonders, lively piazzas, and a generous taste of Roman life.',
        category: 'Cities',
        days: 4,
        nights: 3,
        price: 590,
        image: romeImage,
        alt: "The ancient stone arches and arena inside Rome's Colosseum",
    },
    {
        id: 'amalfi',
        title: 'The Amalfi Coast',
        description: 'Seaside villages, lemon-scented streets, and views worth slowing down for.',
        category: 'Coast',
        days: 6,
        nights: 5,
        price: 990,
        image: amalfiImage,
        alt: "Positano's pastel houses rising above the beach on the Amalfi Coast",
    },
    {
        id: 'sicily',
        title: 'Sicily, a world of its own',
        description: 'Historic streets, Mediterranean flavours, and sunlit shores to remember.',
        category: 'Coast',
        days: 8,
        nights: 7,
        price: 1190,
        image: sicilyImage,
        alt: 'Isola Bella and the blue Mediterranean Sea near Taormina in Sicily',
    },
]