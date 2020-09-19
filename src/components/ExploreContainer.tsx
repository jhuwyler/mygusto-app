import { IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import { heart, close } from 'ionicons/icons';
import './ExploreContainer.css';

import TinderCard from './TinderCard';

const ExploreContainer: React.FC = () => {
  return (
    <div>
      <div className="tinder-container">
        <TinderCard/>
        <TinderCard/>
        <TinderCard/>
        <TinderCard/>
      </div>
      <div className="tinder-buttons">
        <IonButton shape="round" size="large" color="success">
          <IonIcon slot="icon-only" icon={heart} />
        </IonButton>
        <IonButton shape="round" size="large" color="danger">
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
      </div>
    </div>
  );
};

export default ExploreContainer;
