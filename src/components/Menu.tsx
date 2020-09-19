import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote, IonTitle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, heartOutline, heartSharp, optionsOutline, optionsSharp, cartOutline, cartSharp} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Swipe',
    url: '/page/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'MyRecipes',
    url: '/page/recipeList',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Einkaufsliste',
    url: '/page/GroceryList',
    iosIcon: cartOutline,
    mdIcon: cartSharp
  },
  {

    title: 'Settings',
    url: '/page/settings',
    iosIcon: optionsOutline,
    mdIcon: optionsSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">

          <IonListHeader style={{paddingTop: 40, paddingBottom: 20}}><IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yGusto</span></IonTitle></IonListHeader>



          {/*<img className="tinder-card-image" src=http://placekitten.com/g/200/300' alt=""/>*/}
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

        <IonNote>built at HackZurich 2020 with data from Migusto</IonNote>
        </IonList>
        <img className="menu-logo" src="assets/img/migusto-logo.jpg" alt=""/>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
