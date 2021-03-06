import { IonIcon, IonImg, IonThumbnail, IonItemOptions, IonItemOption, IonButtons, IonLabel, IonItemSliding, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonCard, IonCardContent, IonToast  } from '@ionic/react';
import { cart, trash } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './RecipeList.css';
import axios from 'axios';
import { baseURL } from '../config';

type Item = {
  id: number;
  src: string;
  text: string;
};

const RecipeList: React.FC = () => {
  const [list, setList] = React.useState<Item[]>([]);

  const [showToastRemoved, setShowToastRemoved] = useState(false);
  const [showToastAdded, setShowToastAdded] = useState(false);
  async function fetchList() {
    const result = await axios.get(baseURL + '/recipe/liked');
    setList(items => result.data.map((item:any) => ({
      id: item.id,
      text: item.title,
      src: item.images['1:1']
    })));
  };
  useEffect(() => {
    fetchList();
  }, []);
  function removeItem(id : number){
    const newList = list.filter((item) => item.id !== id);
    setShowToastRemoved(true);
    setList(newList);
  }

  async function addToCart(id : number){
    await axios.post(baseURL + '/recipe/shopping_list', {
      'recipe_id': id
    });
    setShowToastAdded(true);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yRecipes</span></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yRecipes</span></IonTitle>
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
