import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnpImageCarouselWebPartStrings';
import PnpImageCarousel from './components/PnpImageCarousel';
import { IPnpImageCarouselProps } from './components/IPnpImageCarouselProps';

export interface IPnpImageCarouselWebPartProps {
  listName: string;
}

export default class PnpImageCarouselWebPart extends BaseClientSideWebPart<IPnpImageCarouselWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnpImageCarouselProps> = React.createElement(
      PnpImageCarousel,
      {
        context: this.context,
        listName: this.properties.listName       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
