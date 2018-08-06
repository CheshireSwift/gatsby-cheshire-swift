import * as React from 'react';
import { css } from 'emotion';

interface CarouselItemProps {
  title: string;
  image: string;
  link: string;
  isActiveIndex: boolean;
}

export default class CarouselItem extends React.Component<CarouselItemProps> {
  constructor(props: CarouselItemProps) {
    super(props);
  }

  render() {
    return (
      <li
        className={css({
          display: this.props.isActiveIndex ? 'inline-block' : 'none',
          float: 'left',
          width: '32%',
          textAlign: 'center',
        })}
        key={this.props.title}
      >
        <a href={this.props.link} target="blank">
          <img
            src={this.props.image}
            className={css({
              //   border: '1px solid black',
              padding: 0,
            })}
          />
          <div>{this.props.title}</div>
        </a>
      </li>
    );
  }
}
