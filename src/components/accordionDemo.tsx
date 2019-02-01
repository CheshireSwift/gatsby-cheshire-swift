import * as React from 'react';
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
      return (
        <AccordionItem
          title={contentItem.title}
          content={contentItem.content}
          isLastItem={index === contentList.length - 1}
          id={index}
          key={index}
        />
      );
    });
    return <div>{formattedContent}</div>;
  }
}
