import {Component, Element, Prop, State} from '@stencil/core';
import '@ionic/core';
import 'ionicons';
import '@edgeworkscreative/ewc-slides';

@Component({
  tag:      'ewc-google-map',
  styleUrl: 'ewc-google-map.css',
  shadow:   true
})
export class EwcGoogleMap {
  private mapEl: HTMLElement;
  private infoWindow: HTMLElement;
  @Element() el!: HTMLElement;
  @State() map: google.maps.Map;
  @State() styles: google.maps.MapTypeStyle[];
  @Prop() placeId: string;
  @Prop() snazzyMap: string | number;
  @Prop() key: string;
  @Prop() zoom: number               = 8;
  @Prop() allowStreetView: boolean   = true;
  @Prop() mapTypeControl: boolean    = true;
  @Prop() scaleControl: boolean      = true;
  @Prop() zoomControl: boolean       = true;
  @Prop() fullscreenControl: boolean = true;
  @Prop() gestureHandling: google.maps.GestureHandlingOptions;
  @State() geoRequest: google.maps.GeocoderResult[];
  @State() place: google.maps.places.PlaceResult;
  
  fixStyles() {
    // TODO figure out the proper way to style the info window
    setTimeout(() => {
      const containerWindow1 = (this.mapEl.querySelector('div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(4)') as HTMLDivElement);
      const containerWindow2 = (this.mapEl.querySelector('div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(4) > div') as HTMLDivElement);
      const containerWindow3 = (this.mapEl.querySelector('div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(4) > div > div:nth-child(1) > div:nth-child(2)') as HTMLDivElement);
      const arrowDiv         = (this.mapEl.querySelector('div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(4) > div > div.gm-style-iw') as HTMLDivElement);
      (containerWindow1) ? containerWindow1.style.width = '250px' : null;
      (containerWindow1) ? containerWindow1.style.backgroundColor = 'transparent' : null;
      (containerWindow2) ? containerWindow2.style.width = '277px' : null;
      (containerWindow2) ? containerWindow2.style.backgroundColor = 'transparent' : null;
      (containerWindow3) ? containerWindow3.style.width = '250px' : null;
      (containerWindow3) ? containerWindow3.style.backgroundColor = 'transparent' : null;
      (arrowDiv) ? arrowDiv.style.top = '20px' : null;
    }, 75);
  }
  
  openInfoWindow(infowindow, marker) {
    infowindow.open(this.map, marker);
    this.fixStyles();
  }
  
  async componentDidLoad() {
    if (this.snazzyMap) {
      let snazzyMapUrl = ((typeof this.snazzyMap === 'string' && this.snazzyMap.match(/^-{0,1}\d+$/) || typeof this.snazzyMap === 'number')) ? `https://snazzymaps.com/style/${this.snazzyMap}` : this.snazzyMap;
      const snazzy     = await fetch(`https://cors-anywhere.herokuapp.com/${snazzyMapUrl}`);
      const snazzyDom  = new DOMParser().parseFromString((await snazzy.text()), "text/html");
      this.styles      = JSON.parse(snazzyDom.getElementById('style-json').innerHTML);
    }
    window['initMap'] = () => {
      this.map    = new google.maps.Map(this.mapEl, {
        zoom:              this.zoom,
        styles:            this.styles,
        streetViewControl: this.allowStreetView,
        mapTypeControl:    this.mapTypeControl,
        scaleControl:      this.scaleControl,
        zoomControl:       this.zoomControl,
        fullscreenControl: this.fullscreenControl,
        gestureHandling:   this.gestureHandling
      });
      let service = new google.maps.places.PlacesService(this.map);
      service.getDetails({
        placeId: this.placeId
      }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.place = place;
          this.map.setCenter(place.geometry.location);
          let marker     = new google.maps.Marker({
            map:      this.map,
            position: place.geometry.location
          });
          let infowindow = new google.maps.InfoWindow({
            content:  this.infoWindow,
            maxWidth: 250
          });
          marker.addListener('click', () => {
            this.openInfoWindow(infowindow, marker);
          });
          this.openInfoWindow(infowindow, marker);
        }
      });
    };
    let script        = document.createElement('script');
    script.src        = `https://maps.googleapis.com/maps/api/js?key=${this.key}&libraries=places&callback=initMap`;
    this.el.insertAdjacentElement('beforeend', script);
  }
  
  render() {
    return [
      <div id="map" ref={el => this.mapEl = el as HTMLElement}>
        <div class='loader'>
          <div class="loader--dot"/>
          <div class="loader--dot"/>
          <div class="loader--dot"/>
          <div class="loader--dot"/>
          <div class="loader--dot"/>
          <div class="loader--dot"/>
          <div class="loader--text"/>
        </div>
      </div>,
      <div class="info-window" ref={el => this.infoWindow = el as HTMLElement}>
        {(this.place) ? <div>
          {(this.place.photos) ? <ewc-slides>{this.place.photos.map((photo) =>
            <ewc-slide
              style={{'background': `url(${photo.getUrl({maxWidth: 200, maxHeight: 200})}) 0% 0% / cover no-repeat`}}/>
          )}</ewc-slides> : ''}
          <ion-list lines="full">
            <ion-item>
              <ion-icon name="business" size="small" slot="start"/>
              <b>{this.place.name}</b>
            </ion-item>
            <ion-item>
              <ion-icon name="pin" size="small" slot="start"/>
              {this.place.formatted_address}
            </ion-item>
            <ion-item>
              <ion-icon name="call" size="small" slot="start"/>
              <a href={`tel:${this.place.international_phone_number}`}>{this.place.formatted_phone_number}</a>
            </ion-item>
            {(this.place.website) ? <ion-item>
              <ion-icon name="open" size="small" slot="start"/>
              <a href={this.place.website}
                 target="_blank">{(new URL(this.place.website)).hostname.replace('www.', '')}</a>
            </ion-item> : ''}
          </ion-list>
        </div> : ''}
      </div>
    ];
  }
}
