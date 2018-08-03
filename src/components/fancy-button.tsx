import { css } from 'emotion';

export default () => css({
    margin: 'auto',
    border: '20px',
    lineHeight: '2.5',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#fff',
    width: '100px',
    textShadow: '1px 1px 1px #000',
    borderRadius: '10px',
    backgroundColor: 'rgb(93, 64, 221)',
    backgroundImage: 'linear-gradient(to top left, rgba(0, 0, 0, .2),rgba(0, 0, 0, .2) 30%, rgba(0, 0, 0, 0))',
    boxShadow: 'inset 2px 2px 3px rgba(255, 255, 255, .6), inset -2px -2px 3px rgba(0, 0, 0, .6)',
    },

    {':hover' : {
    backgroundColor: 'rgba(93, 64, 221, 1)',
    }},

    {':active' : {
    boxShadow: 'inset -2px -2px 3px rgba(255, 255, 255, .6), inset 2px 2px 3px rgba(0, 0, 0, .6)',
    }});
