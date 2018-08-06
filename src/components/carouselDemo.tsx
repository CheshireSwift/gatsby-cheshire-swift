import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import CarouselItem from './carouselItem';

interface CarouselProps {
  content: Array<{ title: string; image: string; link: string }>;
}

interface CarouselState {
  activeIndex: number;
}

export default class Carousel extends React.Component<
  CarouselProps,
  CarouselState
> {
  constructor(props: CarouselProps) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  jumpToSlide(index: number) {
    this.setState({ activeIndex: index * 3 });
  }

  goToAdjacentSlide(i: React.MouseEvent<HTMLAnchorElement>, direction: string) {
    i.preventDefault();

    const index = this.state.activeIndex;
    const content = this.props.content;
    const contentLength = content.length;

    let newIndex;
    switch (direction) {
      case '-':
        newIndex = index === 0 ? contentLength - 3 : index - 3;
        break;
      case '+':
        newIndex = (index + 3) % contentLength;
        break;
    }
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const contentList = this.props.content;

    const formattedContent = contentList.map((contentItem, index) => {
      const isActiveIndex = [
        this.state.activeIndex,
        (this.state.activeIndex + 1) % contentList.length,
        (this.state.activeIndex + 2) % contentList.length,
      ].includes(index);

      return (
        <li key={index}>
          <CarouselItem
            title={contentItem.title}
            image={contentItem.image}
            link={contentItem.link}
            isActiveIndex={isActiveIndex}
          />
        </li>
      );
    });

    const navDots = _.range(Math.ceil(contentList.length / 3)).map(num => {
      return (
        <li
          className={css({
            display: 'inline-block',
            float: 'left',
            textAlign: 'center',
          })}
          key={num}
        >
          <button
            className={css({
              backgroundColor: 'white',
              outline: 'none',
              border: 'none',
              height: '15px',
            })}
            onClick={() => {
              this.jumpToSlide(num);
            }}
          >
            {this.state.activeIndex / 3 === num ? '●' : '○'}
          </button>
        </li>
      );
    });

    return (
      <div className={css({ display: 'block' })}>
        <div
          className={css({
            border: '1px solid black',
            width: '960px',
            overflow: 'hidden',
          })}
        >
          <a href="#" onClick={i => this.goToAdjacentSlide(i, '-')}>
            <span
              className={css({
                display: 'block',
                float: 'left',
                color: 'black',
                cursor: 'pointer',
              })}
            >
              ◀
            </span>
          </a>
          <ul
            className={css({
              padding: 0,
              margin: 0,
              listStyleType: 'none',
            })}
          >
            {formattedContent}
          </ul>
          <a href="#" onClick={i => this.goToAdjacentSlide(i, '+')}>
            <span
              className={css({
                top: 0,
                position: 'relative',
                right: 0,
                display: 'block',
                color: 'black',
                cursor: 'pointer',
                float: 'right',
              })}
            >
              ▶
            </span>
          </a>
        </div>
        <div>
          <ul className={css({ listStyleType: 'none', fontSize: '24px' })}>
            {navDots}
          </ul>
        </div>
      </div>
    );
  }
}
