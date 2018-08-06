import * as React from 'react';
import Link from 'gatsby-link';
import Carousel from '../components/carouselDemo';
import { css } from 'emotion';

const myContent = [
  {
    title: 'Bulbasaur',
    image: 'http://www.pokestadium.com/sprites/black-white/bulbasaur.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)',
  },
  {
    title: 'Charmander',
    image: 'http://www.pokestadium.com/sprites/black-white/charmander.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  },
  {
    title: 'Squirtle',
    image: 'http://www.pokestadium.com/sprites/black-white/squirtle.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Squirtle_(Pok%C3%A9mon)',
  },
  {
    title: 'Chikorita',
    image: 'http://www.pokestadium.com/sprites/black-white/chikorita.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Chikorita_(Pok%C3%A9mon)',
  },
  {
    title: 'Cyndaquil',
    image: 'http://www.pokestadium.com/sprites/black-white/cyndaquil.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Cyndaquil_(Pok%C3%A9mon)',
  },
  {
    title: 'Totodile',
    image: 'http://www.pokestadium.com/sprites/black-white/totodile.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Totodile_(Pok%C3%A9mon)',
  },
  {
    title: 'Treecko',
    image: 'http://www.pokestadium.com/sprites/black-white/treecko.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Treecko_(Pok%C3%A9mon)',
  },
  {
    title: 'Torchic',
    image: 'http://www.pokestadium.com/sprites/black-white/torchic.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Torchic_(Pok%C3%A9mon)',
  },
  {
    title: 'Mudkip',
    image: 'http://www.pokestadium.com/sprites/black-white/mudkip.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Mudkip_(Pok%C3%A9mon)',
  },
  {
    title: 'Turtwig',
    image: 'http://www.pokestadium.com/sprites/black-white/turtwig.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Turtwig_(Pok%C3%A9mon)',
  },
  {
    title: 'Chimchar',
    image: 'http://www.pokestadium.com/sprites/black-white/chimchar.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Chimchar_(Pok%C3%A9mon)',
  },
  {
    title: 'Piplup',
    image: 'http://www.pokestadium.com/sprites/black-white/piplup.png',
    link: 'https://bulbapedia.bulbagarden.net/wiki/Piplup_(Pok%C3%A9mon)',
  },
];

const CarouselPage = () => (
  <div className={css({ fontFamily: 'Arial' })}>
    <h1>Carousel Demo</h1>
    <br />
    <Carousel content={myContent} />
    <br />
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default CarouselPage;
