import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonToast, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import './GroceryList.css';

type Item = {
  id: number;
  name: string;
  quantity: string;
};
const items: Item[] = [{ id: 1, name:"Milch", quantity: '5l' },{ id: 2, name:"Eier", quantity: '2' },{ id: 3, name:"Banane", quantity: '10kg' }];

const GroceryList: React.FC = () => {
  const [list, setList] = React.useState(items);
  const pageName = 'Einkaufsliste';
  const [showToastRemoved, setShowToastRemoved] = useState(false);

function flushList(){
    const newList : Item[]= [];
    setShowToastRemoved(true);
    setList(newList);
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
             <IonTitle size="large" >{pageName} </IonTitle>
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
