import { IonIcon, IonImg, IonThumbnail, IonItemOptions, IonItemOption, IonButtons, IonLabel, IonItemSliding, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonCard, IonCardContent, IonToast  } from '@ionic/react';
import { cart, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import './RecipeList.css';

type Item = {
  id: number;
  src: string;
  text: string;
};
const items: Item[] = [{ id: 1, src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{id: 2, src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'},{id: 3,  src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{id: 4, src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'},{id: 5,  src: 'http://placekitten.com/g/200/300', text: 'catsoup' },{id: 6, src: 'assets/img/rote-bohnen-suppe-mit-sauerrahm-0-47-20.jpg', text:'Rote-Bohnen-Suppe mit Sauerrahm'}];

const RecipeList: React.FC = () => {
  const [list, setList] = React.useState(items);
  const name = <IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yRecipes</span></IonTitle>;

  const [showToastRemoved, setShowToastRemoved] = useState(false);
  const [showToastAdded, setShowToastAdded] = useState(false);
  function removeItem(id : number){
    const newList = list.filter((item) => item.id !== id);
    setShowToastRemoved(true);
    setList(newList);
  }

  function addToCart(id : number){
    //TODO
    setShowToastAdded(true);
  }
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
      {list.length > 0 &&
        <IonList>
            {list.map((item) => (
              <IonItemSliding key={item.id}>
                <IonItem >
                  <IonThumbnail slot="start">
                    <IonImg src={item.src} />
                  </IonThumbnail>
                  <IonLabel>{item.text}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="danger" onClick={() => removeItem(item.id)}><IonIcon slot="icon-only" icon={trash} /></IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="start">
                  <IonItemOption color="primary" onClick={() => addToCart(item.id)}><IonIcon slot="icon-only" icon={cart} /></IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
         </IonList>}
      {list.length === 0 &&
        <IonCard>
          <IonCardContent>
                Keine Lieblingsrezepte. Leg gleich los mit swipen!
          </IonCardContent>
        </IonCard>
      }
      <IonToast
        isOpen={showToastRemoved}
        onDidDismiss={() => setShowToastRemoved(false)}
        message="Rezept entfernt"
        duration={400}
      />
      <IonToast
        isOpen={showToastAdded}
        onDidDismiss={() => setShowToastAdded(false)}
        message="Rezept der Einkaufsliste hinzugefügt"
        duration={400}
      />
      </IonContent>
    </IonPage>
  );
};

export default RecipeList;
