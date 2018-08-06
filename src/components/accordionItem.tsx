import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

interface AccordionItemProps {
  title: string;
  content: string;
  firstOrLast: string;
}

interface AccordionItemState {
  isOpen: boolean;
}

export default class AccordionItem extends React.Component<
  AccordionItemProps,
  AccordionItemState
> {
  constructor(props: AccordionItemProps) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div key={this.props.title}>
        <div>
          <button
            className={css({
              ':focus': {
                outline: 'none',
              },
              backgroundColor: this.state.isOpen
                ? 'hsl(270,50%,65%)'
                : 'hsl(270,50%,70%)',
              border: '1px solid hsl(270,50%,60%)',
              borderBottomLeftRadius:
                this.props.firstOrLast === 'last' && !this.state.isOpen ? 5 : 0,
              borderBottomRightRadius:
                this.props.firstOrLast === 'last' && !this.state.isOpen ? 5 : 0,
              borderTopLeftRadius: this.props.firstOrLast === 'first' ? 5 : 0,
              borderTopRightRadius: this.props.firstOrLast === 'first' ? 5 : 0,
              color: 'white',
              width: 200,
              padding: '5px 10px',
            })}
            onClick={() => {
              this.handleClick();
            }}
          >
            {this.props.title}
          </button>
        </div>
        <div
          className={css({
            backgroundColor: 'hsl(270,50%,95%)',
            border: this.state.isOpen ? '1px solid grey' : '',
            borderBottomLeftRadius: this.props.firstOrLast === 'last' ? 5 : 0,
            borderBottomRightRadius: this.props.firstOrLast === 'last' ? 5 : 0,
            height: this.state.isOpen ? '50px' : '0px', // query the height
            transition: '0.5s',
            overflow: 'hidden',
            width: 200,
          })}
        >
          <div
            className={css({
              padding: '5px 10px',
            })}
          >
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}
