import * as React from 'react';
import * as _ from 'lodash';
import { css } from 'emotion';
import AccordionItem from './accordionItem';

interface AccordionProps {
  content: Array<{ title: string; content: string }>;
}

export default class Accordion extends React.Component<AccordionProps> {
  constructor(props: AccordionProps) {
    super(props);
  }

  render() {
    const contentList = this.props.content;
    const formattedContent = contentList.map((contentItem, index) => {
      function findPosition(num: number) {
        if (num === 0) {
          return 'first';
        } else if (num === contentList.length - 1) {
          return 'last';
        } else {
          return '';
        }
      }
      const position = findPosition(index);

      return (
        <AccordionItem
          title={contentItem.title}
          content={contentItem.content}
          firstOrLast={position}
          key={contentItem.title}
        />
      );
    });
    return <div>{formattedContent}</div>;
  }
}
