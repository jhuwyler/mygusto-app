import {
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { homeOutline, homeSharp, heartOutline, headsetSharp, optionsOutline, optionsSharp} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/page/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Lieblingsrezepte',
    url: '/page/recipeList',
    iosIcon: heartOutline,
    mdIcon: headsetSharp
  },
  {
    title: 'Einstellungen',
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
          <IonListHeader>MyGusto</IonListHeader>
          <IonNote>hack Zurich 2020</IonNote>


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

        </IonList>
        <img className="menu-logo" src="assets/img/migusto-logo.jpg" alt=""/>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
