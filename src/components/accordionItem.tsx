import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';

interface AccordionItemProps {
  id: number;
  title: string;
  content: string;
  isLastItem: boolean;
}

interface AccordionItemState {
  isOpen: boolean;
  height: number;
}

export default class AccordionItem extends React.Component<
  AccordionItemProps,
  AccordionItemState
> {
  constructor(props: AccordionItemProps) {
    super(props);
    this.state = { isOpen: false, height: 0 };
  }

  componentDidMount() {
    const height = document.getElementById(this.props.title).clientHeight;
    this.setState({ height });
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const icon = this.state.isOpen ? '-' : '+';
    return (
      <div key={this.props.title}>
        <div>
          <button
            className={css({
              ':focus': {
                outline: 'none',
              },
              backgroundColor: this.state.isOpen
                ? 'hsl(270,50%,70%)'
                : 'hsl(270,50%,75%)',
              border: '1px solid hsl(270,50%,65%)',
              borderBottomLeftRadius:
                this.props.isLastItem && !this.state.isOpen ? 5 : 0,
              borderBottomRightRadius:
                this.props.isLastItem && !this.state.isOpen ? 5 : 0,
              borderTopLeftRadius: this.props.id === 0 ? 5 : 0,
              borderTopRightRadius: this.props.id === 0 ? 5 : 0,
              color: 'white',
              cursor: 'pointer',
              padding: 18,
              textAlign: 'left',
              width: '100%',
            })}
            onClick={() => {
              this.handleClick();
            }}
          >
            {this.props.title}
            <div
              className={css({
                float: 'right',
                fontWeight: 'bold',
              })}
            >
              {icon}
            </div>
          </button>
        </div>
        <div
          className={css({
            backgroundColor: 'hsl(270,50%,95%)',
            border: this.state.isOpen ? '1px solid grey' : '',
            borderBottomLeftRadius: this.props.isLastItem ? 5 : 0,
            borderBottomRightRadius: this.props.isLastItem ? 5 : 0,
            height: this.state.isOpen ? this.state.height : '0px', // query the height
            transition: '0.5s',
            overflow: 'hidden',
            width: '100%',
          })}
        >
          <div
            className={css({
              padding: 18,
            })}
            id={this.props.title}
          >
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}
