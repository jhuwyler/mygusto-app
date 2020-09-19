import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/TinderContainer';
import './TinderPage.css';

const TinderPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yTaste</span></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yTaste</span></IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer/>
      </IonContent>
    </IonPage>
  );
};

export default TinderPage;
