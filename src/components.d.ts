/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';

import '@ionic/core';
import 'ionicons';
import '@edgeworkscreative/ewc-slides';


export namespace Components {

  interface EwcGoogleMap {
    'allowStreetView': boolean;
    'fullscreenControl': boolean;
    'gestureHandling': google.maps.GestureHandlingOptions;
    'key': string;
    'mapTypeControl': boolean;
    'placeId': string;
    'scaleControl': boolean;
    'snazzyMap': string | number;
    'zoom': number;
    'zoomControl': boolean;
  }
  interface EwcGoogleMapAttributes extends StencilHTMLAttributes {
    'allowStreetView'?: boolean;
    'fullscreenControl'?: boolean;
    'gestureHandling'?: google.maps.GestureHandlingOptions;
    'key'?: string;
    'mapTypeControl'?: boolean;
    'placeId'?: string;
    'scaleControl'?: boolean;
    'snazzyMap'?: string | number;
    'zoom'?: number;
    'zoomControl'?: boolean;
  }
}

declare global {
  interface StencilElementInterfaces {
    'EwcGoogleMap': Components.EwcGoogleMap;
  }

  interface StencilIntrinsicElements {
    'ewc-google-map': Components.EwcGoogleMapAttributes;
  }


  interface HTMLEwcGoogleMapElement extends Components.EwcGoogleMap, HTMLStencilElement {}
  var HTMLEwcGoogleMapElement: {
    prototype: HTMLEwcGoogleMapElement;
    new (): HTMLEwcGoogleMapElement;
  };

  interface HTMLElementTagNameMap {
    'ewc-google-map': HTMLEwcGoogleMapElement
  }

  interface ElementTagNameMap {
    'ewc-google-map': HTMLEwcGoogleMapElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
