import { IonIcon, IonImg, IonThumbnail, IonItemOptions, IonItemOption, IonButtons, IonLabel, IonItemSliding, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem  } from '@ionic/react';
import React from 'react';
import './RecipeList.css';

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [{ src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'},{ src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'},{ src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'}];

const RecipeList: React.FC = () => {

  const name = 'Lieblingsrezepte';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            {items.map((image, i) => (
              <IonItemSliding>
                <IonItem key={i}>
                  <IonThumbnail slot="start">
                    <IonImg src={image.src} />
                  </IonThumbnail>
                  <IonLabel>{image.text}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="danger" expandable onClick={() => {}}><IonIcon name="trash-sharp"></IonIcon></IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
         </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RecipeList;
