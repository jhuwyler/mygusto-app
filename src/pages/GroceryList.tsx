import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonToast, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React, {  useEffect, useState } from 'react';
import './GroceryList.css';
import axios from 'axios';
import { baseURL } from '../config';

type Item = {
  id: number;
  name: string;
  quantity: string;
};

const GroceryList: React.FC = () => {
  const [list, setList] = React.useState<Item[]>([]);
  const [showToastRemoved, setShowToastRemoved] = useState(false);

async function flushList(){
    const newList : Item[]= [];
    setShowToastRemoved(true);
    setList(newList);
    await axios.delete(baseURL + '/recipe/shopping_list');
}
async function fetchList() {
    const result = await axios.get(baseURL + '/ingredient');
    setList(items => result.data.map((item:any) => ({
        name: item.name,
      quantity: item.quantity
    })));
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yShoppingList</span></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonTitle size="large"><span style={{color: 'darkorange', fontFamily: 'Arial'}}>M</span><span style={{color: 'black', fontFamily: 'Arial'}}>yShoppingList</span></IonTitle>
            <IonButton class='floatRight' size='small' shape="round" color="danger" onClick={flushList}>leeren</IonButton>
          </IonToolbar>
        </IonHeader>
      {list.length > 0 &&
        <IonGrid>
            {list.map((item) => (
                <IonRow key={item.id} class="rowclass">
                  <IonCol className="ion-align-self-start">{item.name}</IonCol>
                  <IonCol className="ion-align-self-end" class='textRight'>{item.quantity}</IonCol>
                </IonRow>
            ))}
         </IonGrid>}
      {list.length === 0 &&
        <IonCard>
          <IonCardContent>
                Nichts einzukaufen. Füge Rezepte zur Einkaufsliste hinzu!
          </IonCardContent>
        </IonCard>
      }
      <IonToast
        isOpen={showToastRemoved}
        onDidDismiss={() => setShowToastRemoved(false)}
        message="Einkaufsliste geleert"
        duration={400}
      />
      </IonContent>
    </IonPage>
  );
};

export default GroceryList;
